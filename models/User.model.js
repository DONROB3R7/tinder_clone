const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  imgLarge: {
    type: String,
  },
  password:{ 
    type: String,
    required: true
  },
  gender: {
    type: String,
  },
  firstName: {
    type: String,
  },
  age:{
    type:Number,
  }
},
  {
    timestamps: true
  }
);
const User = model("tinder-users", userSchema);
module.exports = User;