
const mongoose=require("mongoose");
const Schema=mongoose.Schema;

const appealtSchema=new Schema({
   //дані особи яка звернулась
   userName:{type:String,required:true,default:"Person"},
   userIdTelegram:{type:String,required:true},
   userTelegram_nik:{ type:String,default:""} ,
   //текст звернення
   textAppeal:{type:String,default:""},
   
   //координати 
   latitude:{type:String,default:""},
	longitude:{type:String,default:""},

   //url фото завантаженого на сервер
   urlPhoto:{type:String,default:""},
   //стан звернення
   status:{type:String,enum:["active","done"],default:"active"},
   type:{type:String,enum:["on_forest","on_landfills","on_pit","on_barriers","on_other"],default:"on_other"},

   //дата звернення
   date:{type:String,default:""}





  
})
module.exports=mongoose.model("Appeal",appealtSchema)
 