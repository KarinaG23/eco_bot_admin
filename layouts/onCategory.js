const removeMessage = require('../tools/removeMessage');
const nav_keyboard = require('../keyboard/nav_keyboard');
module.exports = async (id, bot, query, store) => {
  store.last_mode=store.mode;
  const getType=require("../tools/swift")
   let keyboard;
   if(store.mode=="active_appeal"){
    keyboard=store.activelistAppeal.map(el=>{
        return [{
         text: `${getType[el.type]}`,
         callback_data: el.type
        }]
    })
   }else {
    keyboard=store.donelistAppeal.map(el=>{
        return [{
         text: `${getType[el.type]}`,
         callback_data: el.type
        }]
    })
   }
bot.sendMessage(
			id,
			`${store.mode=="active_appeal"?"Активні звернення користувачів:":"Опрацьовані звернення"}`,
			{
				reply_markup: JSON.stringify({
					inline_keyboard: [
						...keyboard,
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
