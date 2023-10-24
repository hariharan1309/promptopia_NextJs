import { Schema,model,models } from "mongoose";
// How the user should be on DB
const useSchema=new Schema({
    email:{
        type:String,
        unique:[true,"Mail exists"],
        required:[true,"Email Required"]
    },
    username:{
        type:String,
        required:[true,"Name is Required"],
        match: [/^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/, "Username invalid, it should contain 8-20 alphanumeric letters and be unique!"]
    },
    image:{
        type:String
    }
})
// The "models" object here is provided by mongoose library and stores all the models created in the application.
// If the model is already created, it will not be created again. It will assing the existing model to the variable.
// It prevents redefining the model and use existing model.

// If not available/ existed the model function will create the model as assign it .


const User=models.User || model("User",useSchema);// this will be called for every time db is connected/used.
export default User;