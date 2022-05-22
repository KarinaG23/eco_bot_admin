
const Notification=require("../models/Notification")
module.exports = async function (req) {
    const Notifications=new Notification({...req})
    try{
        await Notifications.save()
        return true
        }
        catch(er){
        
            console.log(er)
            return false
        }

}
