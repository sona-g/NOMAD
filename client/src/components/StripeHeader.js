import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Card, Avatar, Badge } from 'antd';
import moment from 'moment';
import { accBalance, payoutSetting } from '../actions/stripe';
import { SettingOutlined } from '@ant-design/icons';
import { toast } from 'react-toastify';


const { Meta } = Card;
const { Ribbon } = Badge;

const StripeHeader = () => {
    const [balance, setBalance] = useState(0);
    const [loading, setLoading] = useState(false);
    const { auth } = useSelector((state) => ({ ...state }))
    const { userInfo } = auth;

    useEffect(() => {
        accBalance(auth.token).then(bal => {
            console.log(bal)
            setBalance(bal.data)
        })
    }, [auth.token])

    const handlePayoutSetting = async () => {
        setLoading(true)
        try {
            setLoading(false)
            const payout = await payoutSetting(auth.token);
            console.log("payout setting link", payout);
           window.location.href = payout.data.url;
        } catch (error) {
            console.log(error)
            setLoading(false)
            toast.info('Unable to access settings')
        }
    }

    return (
        <div className='d-flex justify-content-around'>
            <Card>
                <Meta
                    avatar={<Avatar>{userInfo.name[0]}</Avatar>}
                    title={userInfo.name}
                    description={`Joined ${moment(userInfo.createdAt).fromNow()}`} />
            </Card>
            {auth && auth.userInfo &&
                auth.userInfo.stripe_seller &&
                auth.userInfo.stripe_seller.charges_enabled && (
                    <div className='d-flex justify-content-around'>
                        <Ribbon text='Avaiable' color='yellow'>
                    <Card className='bg-light pt-1 m-2'>
                        {balance && balance.pending &&
                        balance.pending.map((amount) => {
                            return (
                                <span key={amount.currency} className='lead'>
                                    {amount.amount / 100} {amount.currency}
                                </span>
                            )
                        })}
                    </Card>
                    </Ribbon>
                        <Ribbon text='Payouts' color='red'>
                            <Card 
                            onClick={handlePayoutSetting} className='bg-light pointer m-2'>
                                <SettingOutlined className='h5 pt-2'/>
                            </Card>
                        </Ribbon>
                    </div>)}

        </div>
    );
};

export default StripeHeader;