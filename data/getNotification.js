const Notification=require("../models/Notification")
module.exports = async function () {
   try{
        const Notifications= await Notification.find({});
        if(Notifications.length!=0){
            return Notifications
        }else return []
    }
    catch(e){
        return [];
        console.log(e);
    }


}
