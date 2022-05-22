const removeMessage = require('../tools/removeMessage');
const nav_keyboard = require('../keyboard/nav_keyboard');
const getAppeals = require('../data/getAppeals');
module.exports = async (id, bot, query, store) => {
  store.last_mode=store.mode;
  const appeals= await getAppeals();
  if(appeals.length>0){
	store.donelistAppeal=appeals?.filter(el=>el.status=="done");
   


store.activelistAppeal=appeals?.filter(el=>el.status=="active");}
  const getType=require("../tools/swift")
   let keyboard;
   console.log(store.activelistAppeal);
   if(store.mode=="active_appeal"){
	   if(store.activelistAppeal.length==0){
		   
		bot.sendMessage(
			id,
			`Немає активних звернень користувачів`,
			{
				reply_markup: JSON.stringify({
					inline_keyboard: [
						
						[
							{
								text: `⬅️  Назад`,
								callback_data: 'return_home'
							}
						]
					],
					hide_keyboard: true
				})
			}
		)
		.then(async (e) => {
			await removeMessage(query.message.chat.id, bot, query.message.message_id);
		});
		return
	   }
    keyboard=store.activelistAppeal.map(el=>{
        return [{
         text: `${getType[el.type]}`,
         callback_data: el.type
        }]
    })
   }else {
	if(store.donelistAppeal.length==0){
		bot.sendMessage(
			id,
			`Немає опрацьованих звернень користувачів`,
			{
				reply_markup: JSON.stringify({
					inline_keyboard: [
						
						[
							{
								text: `⬅️  Назад`,
								callback_data: 'return_home'
							}
						]
					],
					hide_keyboard: true
				})
			}
		)
		.then(async (e) => {
			await removeMessage(query.message.chat.id, bot, query.message.message_id);
		});
		return
	   }
    keyboard=store.donelistAppeal.map(el=>{
        return [{
         text: `${getType[el.type]}`,
         callback_data: el.type
        }]
    })
   }
   let set=new Set(...keyboard)
  let keyboardUn=[];
  for(let item of set){
	keyboardUn.push([item])
  }
  console.log(keyboardUn);
	
  

bot.sendMessage(
			id,
			`${store.mode=="active_appeal"?"Активні звернення користувачів:":"Опрацьовані звернення"}`,
			{
				reply_markup: JSON.stringify({
					inline_keyboard: [
						...keyboardUn,
						[
							{
								text: `⬅️  Назад`,
								callback_data: 'return_home'
							}
						]
					],
					hide_keyboard: true
				})
			}
		)
		.then(async (e) => {
			await removeMessage(query.message.chat.id, bot, query.message.message_id);
		});
};
