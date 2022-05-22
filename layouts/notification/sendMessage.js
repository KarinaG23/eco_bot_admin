const sendMessage = require("../../data/sendMessage");
const removeMessage = require("../../tools/removeMessage");
const getDate=require("../../tools/getDate")
module.exports = async (id, bot, query,store) => {
    store.step1=false;
    store.step2=false;
    store.step3=false;
    store.notArray.date=getDate();
    await sendMessage(store.notArray)
    store.notArray.title=""
    store.notArray.text="";
    store.notArray.latitude="";
    store.notArray.longitude="";
    
    
   

bot.sendMessage(
			id,
			`Ваше повідомлення відправлено`,
			{
				reply_markup: JSON.stringify({
					inline_keyboard: [
						
					
                        [
							{
								text: `❇️  Головна`, callback_data: "return_home"
							}
						]
					],
					hide_keyboard: true
				})
			}
		)
		.then(async (e) => {
			await removeMessage(id, bot, query);
		});
};
