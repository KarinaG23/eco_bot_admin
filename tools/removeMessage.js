
module.exports = async (chat_id, bot, msg) => {  
       
        for(let i=msg;i>msg-70;i--){
        await bot.deleteMessage(chat_id, i).catch(e=>{
              
        })
}
      

}  