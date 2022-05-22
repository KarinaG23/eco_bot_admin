const Notification=require("../models/Notification")
module.exports = async function (req) {
await Notification.deleteOne({_id:req.id})
}