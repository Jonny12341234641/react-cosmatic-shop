import mongoose from "mongoose"; //importing mongoose

const studentSchema = new mongoose.Schema( 
    {
        name:String, //defining the schema
        age:Number, //defining the schema
        city:String, //defining the schema
        
    }
)

const Student = mongoose.model("Student", studentSchema) //creating a model

export default Student; //exporting the model
