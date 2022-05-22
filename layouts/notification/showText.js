const removeMessage = require("../../tools/removeMessage");

module.exports = async (id, bot, query,store) => {
    store.step1=false;
    store.step2=false;
    store.step3=true;
   
    if(store.notArray.latitude!=""){
        bot.sendMessage(
			id,
			`🟢 Заголовок повідомлення : ${store.notArray.title}\n🟢Текст повідомлення: ${store.notArray.text}\n\nНадішліть координати:`,
			{
				reply_markup: JSON.stringify({
					inline_keyboard: [
						
						[
							{
								text: `⬅️  Назад`,
								callback_data: 'next_step'
							},
                            {
								text: `Вперед ➡️`,
								callback_data: 'next_step_cord'
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
    }else bot.sendMessage(
			id,
			`🟢 Заголовок повідомлення : ${store.notArray.title}\n🟢Текст повідомлення: ${store.notArray.text}\n\nНадішліть координати:`,
			{
				reply_markup: JSON.stringify({
					inline_keyboard: [
						
						[
							{
								text: `⬅️  Назад`,
								callback_data: 'next_step'
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
