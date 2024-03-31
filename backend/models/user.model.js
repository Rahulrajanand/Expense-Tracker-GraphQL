//How to create a model?
//First we create a schema
//Depending on the schema we create the model

import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
    },
    profilePicture: {
        type: String,
        default: "",
    },
    gender: {
        type: String,
        enum: ["male", "female"],
    },
  },  { timestamps: true});

  const User = mongoose.model("User", userSchema);     //creating model

  export default User;