const removeMessage = require("../tools/removeMessage");
const getAppeals=require("../data/getAppeals");
const getNotification = require("../data/getNotification");
module.exports=async(id,bot,home_keyboard,messageId,store)=>{
    store.notArray.title=""
    store.notArray.text="";
    store.notArray.latitude="";
    store.notArraylongitude="";
    const appeals= await getAppeals();
    store.listNot=await getNotification();
    console.log(store.listAppeal);
    // activelistAppeal 
    // donelistAppeal 
    console.log(appeals);
    if(appeals.length>0){
         store.donelistAppeal=appeals?.filter(el=>el.status=="done");
        
    

    store.activelistAppeal=appeals?.filter(el=>el.status=="active");}
    
     
bot.sendPhoto(id,"https://imgur.com/zwZnq1i",{
    reply_markup: JSON.stringify({ inline_keyboard: home_keyboard({active: store.activelistAppeal.length,done:store.donelistAppeal.length}),hide_keyboard: true })
}).then(async (e) => { 
            await removeMessage(id, bot,messageId);
        })
}      