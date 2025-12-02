import User from "../models/user.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"


export function createUser(req, res){ //creating a user

    const hashedPassword = bcrypt.hashSync(req.body.password, 10) //hashing the password

    const user = new User( //creating a new user
        {
            email : req.body.email,
            firstName : req.body.firstName,
            lastName : req.body.lastName,
            password : hashedPassword
        }
    )

    user.save().then( //saving the user
        ()=>{
            res.json(
                {
                    message:"User saved successfully"
                }
            )
        }
    ).catch( //catching the error
        ()=>{
            res.json(
                {
                    message :"Failed to create user"
                }
            )
        }
    )
}

export function loginUser(req, res){
    
    User.findOne(
        {
            email : req.body.email
        }
    ).then(
        (user)=>{
            if(user == null){
                resstatus(404).json(
                    {
                        message : "User not found"
                    }
                )
            }else{
                const inPasswordMatching = bcrypt.compareSync(req.body.password, user.password)
                if(inPasswordMatching){

                    const token = jwt.sign(
                        {
                            email : user.email,
                            firstName : user.firstName,
                            lastName : user.lastName,
                            role : user.role,
                            isEmailVerified : user.isEmailVerified
                        },
                        "jwt-secret"
                    )

                    res.json(
                        {
                            message : "Login successful",
                            token: token
                        }
                    )
                }else{
                    res.status(401).json(
                        {
                            message : "Invalid password"
                        }
                    )
                }
            }
        }
    )
}

export function isAdmin(req){

    if(req.user == null){
        return false
    }else{
        if(req.user.role != "admin"){
            return false
        }else{
            return true
        }
    }
}

export function isCustomer(req){

    if(req.user == null){
        return false
    }else{
        if(req.user.role != "customer"){
            return false
        }else{
            return true
        }
    }
}