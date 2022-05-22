const removeMessage = require("../../tools/removeMessage");


module.exports = async (id, bot, query,store) => {
 store.step1=true;
if( store.notArray.title!=""){
    bot.sendMessage(
        id,
        `Введіть заголовок повідомлення:`,
        {
            reply_markup: JSON.stringify({
                inline_keyboard: [
                    
                    [
                        {
                            text: `⬅️  Назад`,
                            callback_data: 'inf_board'
                        },
                        {
                            text: `Вперед ➡️`,
                            callback_data: 'next_step'
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
}else
bot.sendMessage(
			id,
			`Введіть заголовок повідомлення:`,
			{
				reply_markup: JSON.stringify({
					inline_keyboard: [
						
						[
							{
								text: `⬅️  Назад`,
								callback_data: 'not_activ'
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
