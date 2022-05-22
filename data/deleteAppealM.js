const Appeal=require("../models/Appeal")
module.exports = async function (req) {
await Appeal.deleteOne({_id:req.id})
}