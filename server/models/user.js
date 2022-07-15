import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    email: {
        type: String,
        trim: true,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        min: 6,
        max: 60
    },
    stripe_account_id: '',
    stripe_seller: {},
    stripeSession: {}
},
    { timestamps: true }
)

//bcrypt password set by user
userSchema.pre('save', function(next) {
    let user = this;
    if(user.isModified('password')) {
        return bcrypt.hash(user.password, 12, function(err, hash) {
            //storing hash password in DB
            if (err) {
                console.log("BCRYPT HASH ERR", err);
                return next(err);
            }
            user.password = hash;
            return next();
        });
        } else {
            return next();
        }
    });

    //check password at login = user's password set in DB
userSchema.methods.comparePassword = function (password, next) {
    bcrypt.compare(password, this.password, function(error, match) {
        if(error) {
            console.log("COMPARE PASSWORD ERROR", error)
            return next(error, !match)
        }
        //no error then
        console.log("MATCH PASSWORD", match)
        return next(null, match)

    })
}

export default mongoose.model('User', userSchema)