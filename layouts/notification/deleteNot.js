const removeMessage = require('../../tools/removeMessage');

const deleteNotification = require('../../data/deleteNotification');
module.exports = async (id, bot, query, store) => {
console.log("Delete log");
await deleteNotification({id:store.not._id})

	bot.sendMessage(
			id,
            "Повідомлення видалено "
			,
			{
				reply_markup: JSON.stringify({
					inline_keyboard: [
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
