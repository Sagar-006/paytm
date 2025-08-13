import mongoose from "mongoose";

export const  mongoConnect = () =>{
    mongoose.connect(
      "mongodb+srv://admin:opFnqOlLoQ2hHaS4@cluster0.eydpqwr.mongodb.net/paytm"
    );
}

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        minLength:3,
        unique:true,
        maxLength:50,
        lowercase:true,
        trim:true,
    },
    password:{
        type:String,
        minLength:6,
        required:true,
    
    },
    firstname:{
        type:String,
        required:true,
        trim:true,
        maxLength:50,
    },
    lastname:{
        type:String,
        required:true,
        trim:true,
        maxLength:50
    }
    ,
});

export const User = mongoose.model("users", userSchema);

const userBalance = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true,
    },
    balance:{
        type:Number,
        required:true
    }
})

export const UserBalance =  mongoose.model('balance',userBalance)
