const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true,'name is required'],
    },
    age:{
        type: Number,
        required: [true, 'age is required'],
        min: [1, 'Enter valid age'],
        max: [99, 'Enter valid age'],
    },
    gender:{
           type: String,
           required: [true,'Please select your gender'],
           enum: ['male', 'female', 'other'],
    },
    email:{
          type: String,
          required: [true, 'email is required'],
          unique: true,
          trim: true,
          validate:{
            validator: (value) => {
                const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
                return emailRegex.test(value);
            },
            message: 'Invalid email format',
          },
    },
    password:{
        type: String,
        required: [true, 'password is required'],
        validate: {
            validator: (value) => {
                return value.length >=8;
            },
            message: 'Password must be at least of 8 characters',
        },
    },
    isAdmin:{
        type:Boolean,
        default:false,
    },
    isDoctor:{
        type: Boolean,
        default: false,
    },
    notification:{
        type: Array,
        default:[],
    },
    seennotification:{
        type: Array,
        default:[],
    },
});

const userModel = mongoose.model('users', userSchema)

module.exports = userModel