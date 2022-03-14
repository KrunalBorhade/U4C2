const express = require('express');
const mongoose = require('mongoose');
const app = express();
app.use(express.json());

const connect = ()=>{
    return mongoose.connect("mongodb://127.0.0.1:27017/bank")
}
// USER SCHEMA
//Creating User SCHEMA

const userSchema = new mongoose.Schema(
    {
        firstName:{type:String,required:true},
        middleName:{type:String},
        lastName:{type:String,required:true},
        age:{type:Number,required:true},
        email:{type:String,required:true},
        address:{type:String,required:true},
        gender:{type:String,default:"Female"}, 
        type:{type:String,default:"Customer"}
    },
    {
        versionKey:false,
        timestamps:true,
    }
    )

// Creating the Model 
const User = mongoose.model("user",userSchema)

//BranchDetail Schema

const branchDetailSchema = new mongoose.Schema(
    {
        name:{type:String,required:true},
        address:{type:String,required:true},
        IFSC:{type:String,required:true},
        MICR:{type:String,required:true},
    },
    {
        versionKey:false,
        timestamps:true,
    }
)
//Model

const Branch = mongoose.model("branch",branchDetailSchema)

//Master Account

const masterAccSchema = new mongoose.Schema(
    {
        balance:{type:Number,required:true},
        userId:{type:mongoose.Schema.Types.ObjectId,ref:"user",required:true}
    },
    {
        versionKey:false,
        timestamps:true,
    }
)

const Master = mongoose.model("master",masterAccSchema)

//Saving Account

const savingAccSchema = new mongoose.Schema(
    {
        account_no:{type:Number,required:true,unique:true},
        balance:{type:Number,required:true},
        interestRate:{type:Number,required:true},
        userId:{type:mongoose.Schema.Types.ObjectId,ref:"user",required:true}
    },
    {
        versionKey:false,
        timestamps:true,
    }
)

const Saving = mongoose.model("saving",savingAccSchema)

// Fixed Account 

const fixedAccSchema = new mongoose.Schema(
    {
        account_no:{type:Number,required:true,unique:true},
        balance:{type:Number,required:true},
        interestRate:{type:Number,required:true},
        startDate:{type:Date,required:true},
        maturityDate:{type:Date,required:true},
        userId:{type:mongoose.Schema.Types.ObjectId,ref:"user",required:true}
    },
    {
        versionKey:false,
        timestamps:true,
    }
)

const Fixed = mongoose.model("fixed",fixedAccSchema)




app.listen(5000,async()=>{
    try{
        await connect()
    }
    catch(err){
        console.log(err)
    }
    console.log("Listening to port 5000")
})