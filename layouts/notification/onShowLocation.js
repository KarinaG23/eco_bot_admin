const removeMessage = require("../../tools/removeMessage");

module.exports = async (id, bot, query,store) => {
    store.step1=false;
    store.step2=false;
    store.step3=false;
   

bot.sendMessage(
			id,
			`🟢 Заголовок повідомлення : ${store.notArray.title}\n🟢Текст повідомлення: ${store.notArray.text}\n🟢 Координати:\nlatitude: ${store.notArray.latitude}\nlongitude: ${store.notArray.longitude}`,
			{
				reply_markup: JSON.stringify({
					inline_keyboard: [
						
						[
							{
								text: `⬅️  Назад`,
								callback_data: 'next_step_text'
							}
						],
                        [
							{
								text: `Опублікувати повідомлення ✉️`,
								callback_data: 'send_message'
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
