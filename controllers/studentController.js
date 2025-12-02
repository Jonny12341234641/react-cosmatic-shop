import Student from "../models/student.js" //importing student model

export function getStudents(req, res){

    Student.find().then(
            (result)=>{
                res.json(
                    {
                         message : result
                    }
                )
            }
        ).catch(
            (error)=>{
                res.json(
                    {
                        message : error
                    }
                )
            }
        )
    }

export function createStudents(req, res){

    if(req.user == null){
        res.status(401).json(
            {
                message : "Please login and try again"
            }
        )
        return
    }

    if(req.user.role != "admin"){
        res.status(403).json(
            {
                message : "You are not authorized to create a student"
            }
        )
        return
    }

    const student = new Student( //creating a new student
            {
                name:req.body.name,
                age:req.body.age,
                city:req.body.city
            }
        )

        student.save().then( //saving the student
            ()=>{
                res.json(
                    {
                        message:"Student saved successfully"
                    }
                )
                console.log(student)
            }
        ).catch(
            (error)=>{
                res.json(
                    {
                        message : error
                    }
                )
            }
        )
    }