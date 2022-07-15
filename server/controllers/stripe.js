import User from '../models/user';
import Hotel from '../models/hotel';
import Stripe from 'stripe';
const stripe= Stripe(process.env.STRIPE_SECRET);
import queryString from 'query-string';
import Order from '../models/order';

export const createStripeAccount = async (req, res) => {
    // console.log('request user from middleware', req.user)
    // console.log('stripe connect endpoint')
    const user = await User.findById(req.user._id).exec()
    console.log("USER", user);
    
    if(!user.stripe_account_id) {
        const account = await stripe.accounts.create({
        type: "standard"
    });
    console.log("ACCOUNT", account);
    user.stripe_account_id = account.id;
    user.save();
}

    let accountLink = await stripe.accountLinks.create({
        account: user.stripe_account_id,
        refresh_url: process.env.STRIPE_REDIRECT_URL,
        return_url: process.env.STRIPE_REDIRECT_URL,
        type: 'account_onboarding'
    })

    accountLink = Object.assign(accountLink, {
        "stripe_user[email]": user.email || undefined
    })
    //console.log("ACCOUNT LINK", accountLink);
    let loginLink = `${accountLink.url}?${queryString.stringify(accountLink)}`
    console.log("LOGIN LINK",loginLink)
    res.send(loginLink)
    }

    export const account = async (req,res) => {
        const user = await User.findById(req.user._id).exec();
        const account = await stripe.accounts.retrieve(user.stripe_account_id)
        //console.log("USER ACCOUNT", account);
        const updatedUser = await User.findByIdAndUpdate(
            user._id, {
            stripe_seller: account
        }, { new: true }
        ).select('-password').exec();
        //console.log(updatedUser)
        res.json(updatedUser);
    }

    export const accountBalance = async (req,res) => {
        const user = await User.findById(req.user._id).exec();
        try {
            const balance = await stripe.balance.retrieve({
                stripeAccount: user.stripe_account_id
            })
            //console.log("BALANCE", balance)
            res.json(balance)
        } catch (error) {
            console.log("ACC BALANCE", error)
        }
    }
    
    export const payoutSetting = async (req, res) => {
        try {
            const user = await User.findById(req.user._id).exec();
            const loginLink = await stripe.accounts.update(user.stripe_account_id, {
                metadata: {redirect_url: process.env.STRIPE_SETTING_URL}
            })
            console.log("PAYOUT SETTING LOGIN", loginLink)
            res.json(loginLink)
        } catch (error) {
            console.log("PAYOUT SETTING", error)
        }
    }

    export const stripeSessionId = async (req, res) => {
        //get hotel id from req.body
        const {hotelId} = req.body;
        //console.log("HOTEL ID", hotelId)
        //find the hotel based on hotel id from db
        const item  = await Hotel.findById(hotelId)
        .populate('postedBy').exec();
        //20% charge as application fee
        const fee = (item.price * 20) / 100;
        //console.log("HOTEL MODEL", item);
        //create a session
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card', 'grabpay', 'paynow'],
            //purchasing item details, show to user on checkout
            line_items: [
                {name: item.title,
            amount:  item.price * 100,
        currency: 'sgd',
    quantity: 1},
            ],
            //payemnt intent with application fee and destination charge 80%
            payment_intent_data: {
                application_fee_amount: fee * 100,
                //seller can see balance in frontend
                transfer_data: {
                    destination: item.postedBy.stripe_account_id
                }
            },
            success_url: `${process.env.STRIPE_SUCCESS_URL}/${item._id}`,
            cancel_url: process.env.STRIPE_CANCEL_URL
        })
        //add session to user in db
         await User.findByIdAndUpdate(req.user._id, {stripeSession: session}).exec()
        //send session id to frontend
        res.send({
            sessionId: session.id
        })
        console.log("SESSION", session)
    }

    export const stripeSuccess = async (req, res) => {
        try {
             //hotel id from req.body
        const {hotelId} = req.body;
        //currently logged in user
        const user = await User.findById(req.user._id).exec();
        if(!user.stripeSession) return;
        //retrieve stripe session saved with user
        const session = await stripe.checkout.sessions.retrieve(user.stripeSession.id);
        //if session = paid, create order, check for no duplicate order
        if(session.payment_status === 'paid') {
            const orderExist = await Order.findOne({"session.id": session.id}).exec();
            if(orderExist) {
                res.json({success: true})
            } else {
                let newOrder = await new Order({
                    hotel: hotelId,
                    session: session,
                    orderedBy: user._id
                }).save();
                //remove user's stripe session
                await User.findByIdAndUpdate(user._id, {
                    $set: { stripeSession: {} }
                })
                res.json({success: true})
            }
        }
        } catch (error) {
            console.log("STRIPE SUCCESS FAILED", error)
        }
       
    }