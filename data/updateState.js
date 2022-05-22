const Appeal=require("../models/Appeal")
module.exports = async function (req) {
    Appeal.findOne({_id:req.id},async function (err, doc){
        doc.status="done"
         try{
          await doc.save();
         return true;
          }
          catch(err){
             
             return false;
          }
        });

}