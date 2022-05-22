const removeMessage = require('../tools/removeMessage');
const nav_keyboard = require('../keyboard/nav_keyboard');
module.exports = async (id, bot, query, store) => {
  store.last_mode=store.mode;
  let keyboard=[[{
      text:"Створити нове повідомлення",
      callback_data:"not_first"
  }],[{
    text:"Активні повідомлення",
    callback_data:"not_activ"
}]]
bot.sendMessage(
			id,
			`На цій сторінці ви можете переглянути активні повідомлення про небезпеку або створити нові`,
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
