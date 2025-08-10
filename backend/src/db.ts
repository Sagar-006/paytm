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
        maxLength:20,
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



const User  = mongoose.model("users",userSchema);
export default  User;

