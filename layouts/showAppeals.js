const removeMessage = require('../tools/removeMessage');
const nav_keyboard = require('../keyboard/nav_keyboard');
const mode_app = require('../tools/mode_app');
module.exports = async (id, bot, query, store) => {
store.flag=false;
	console.log(store.mode,"Store");
    let keyboard;
	if(store.last_mode=="active_appeal"){
		keyboard=store.activelistAppeal.map(el=>{
			if(el.type==store.mode)
			{return [{
			 text: `${el.textAppeal}`,
			 callback_data: `${el.type}|${el._id}`
			}]}else{
				return[{
					text: `Пустл`,
					callback_data: `1`
				}]

			}
		})
	   }else {
		keyboard=store.donelistAppeal.map(el=>{
			if(el.type==store.mode)
			{return [{
			 text: `${el.textAppeal}`,
			 callback_data: `${el.type}|${el._id}`
			}]}else return[{
				text: `Пустл`,
				callback_data: `1`
			}]
		})
	   }
	console.log(keyboard.length);
	   keyboard=keyboard.filter(el=>{
		  return el[0].text!="Пустл"
	   })
 
    let text="";
    switch (store.mode) {
        case mode_app.on_forest:
            text=`Повідомлення про вирубку лісу`
            break;
            case mode_app.on_landfills:
                text=`Повідомлення про сміттєзвалища `
                break;
                case mode_app.on_pit:
                    text=`Повідомлення про вирви та ями `
                    break;
                    case mode_app.on_barriers:
                        text=`Повідомлення про зсуви `
                        break;
                        case mode_app.on_other:
                            text=`Повідомлення інше`
                            break;

    
        default:
            break;
    }
console.log(keyboard);
	bot.sendMessage(
			id,
            text
			,
			{
				reply_markup: JSON.stringify({
					inline_keyboard: [
						...keyboard,
						[
							{
								text: `⬅️  Назад`,
								callback_data: store.last_mode
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
