const Appeal=require("../models/Appeal")
module.exports = async function () {
   try{
        const appeals= await Appeal.find({});
        if(appeals.length!=0){
            return appeals
        }else return false
    }
    catch(e){
        return false;
        console.log(e);
    }


}
