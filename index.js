import express, { text } from "express"; //importing express
import mongoose from "mongoose"; //importing mongoose
import Student from "./models/student.js" //importing student model
import studentRouter from "./routes/studentRouter.js"; //importing student router
import userRouter from "./routes/userRouter.js";  //importing user router
import Jwt from "jsonwebtoken" 
import productRouter from "./routes/productRouter.js"

const app = express() //creating an express app

app.use(express.json()) //using express json
app.use(                                                   //using middleware
    (req, res, next)=>{
        console.log("HTTP request has been received to the middleware")

        let token = req.header("Authorization")
        if(token != null){
            console.log("token received") //token received
            token = token.replace("Bearer ", "") //removing the bearer
            console.log(token)  //printing the token
            Jwt.verify(token, "jwt-secret", 
                (error, decoded)=>{
                    if(decoded == null){
                        res.json({
                        message : "Token is invalid"
                        })
                        return
                    }else{
                        console.log("Token is valid")
                        console.log(decoded)
                        req.user = decoded
                    }
                })
        }else{
            console.log("No token received") //no token received
        }
        next()
    }

)

const connectionString = "mongodb+srv://admin:123@cluster0.6mu71si.mongodb.net/?appName=Cluster0" //connection string

mongoose.connect(connectionString).then( //connecting to the database
    ()=>{
        console.log("Database connected successfully") //database connected
    }
).catch(
    ()=>{
        console.log("Database connection failed") //database connection failed
    }
)


app.use("/students", studentRouter) //using the student router
app.use("/users", userRouter) //using the user router
app.use("/products", productRouter) //using the product router

app.get("/", //get request
    (req, res)=>{

        console.log(req.body) //printing the request body

        console.log("Get Request received")
        
    }
)

app.post("/", //post request
    (req, res)=>{

        console.log("Post Request received")
        
    }
)

app.listen(5000,  //listening to the port
    (req, res)=> { //callback
        console.log("Server is started") //server started
    }
)



