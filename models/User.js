
const mongoose=require("mongoose");
const Schema=mongoose.Schema;

const UserSchema=new Schema({
    
   title:{type:String,default:"Title"},
   text:{type:String,default:"Text notification"},
   latitude:{type:String,default:""},
   longitude:{type:String,default:""},
   date:{type:String,default:""}

    



        
})
module.exports=mongoose.model("Notification",UserSchema)
            