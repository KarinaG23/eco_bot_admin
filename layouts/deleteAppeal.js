const removeMessage = require('../tools/removeMessage');
const nav_keyboard = require('../keyboard/nav_keyboard');
const mode_app = require('../tools/mode_app');
const updateState = require('../data/updateState');
const deleteAppealM = require('../data/deleteAppealM');
module.exports = async (id, bot, query, store) => {
await deleteAppealM({id:store.appeal._id})

	bot.sendMessage(
			id,
            "Звернення видалено "
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
