const removeMessage = require("../../tools/removeMessage");

module.exports = async (id, bot, query,store) => {
    store.step1=false;
    store.step2=true;
   
	if(store.notArray.text===""){
		bot.sendMessage(
			id,
			`🟢 Заголовок повідомлення : ${store.notArray.title}\n\nВведіть текст повідомлення: `,
			{
				reply_markup: JSON.stringify({
					inline_keyboard: [
						
						[
							{
								text: `⬅️  Назад`,
								callback_data: 'not_first'
							},
						
						]
					],
					hide_keyboard: true
				})
			}
		)
		.then(async (e) => {
			await removeMessage(id, bot, query);
		});
	} else
bot.sendMessage(
			id,
			`🟢 Заголовок повідомлення : ${store.notArray.title}\n\nВведіть текст повідомлення: `,
			{
				reply_markup: JSON.stringify({
					inline_keyboard: [
						
						[
							{
								text: `⬅️  Назад`,
								callback_data: 'not_first'
							},
							{
								text: `Вперед ➡️`,
								callback_data: 'next_step_text'
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
