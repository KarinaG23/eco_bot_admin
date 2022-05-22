const removeMessage = require('../../tools/removeMessage');

const mode_app = require('../../tools/mode_app');
module.exports = async (id, bot, query, store) => {
store.flag=false;
	console.log(store.mode,"Store");
    let keyboard=store.listNot.map(el=>{
        return [{
            text:`Заголовок: ${el.title}`,
            callback_data:`not_activ|${el._id}`
        }]
    })
  
	bot.sendMessage(
			id,
            "Список повідомлень:"
			,
			{
				reply_markup: JSON.stringify({
					inline_keyboard: [
						...keyboard,
						[
							{
								text: `⬅️  Назад`,
								callback_data: "inf_board"
							}
						],
						[
							{
								text: `❇️  Головна`, callback_data: "return_home"
							}
						],
					],
					hide_keyboard: true
				})
			}
		)
		.then(async (e) => {
			await removeMessage(query.message.chat.id, bot, query.message.message_id);
		});
};
