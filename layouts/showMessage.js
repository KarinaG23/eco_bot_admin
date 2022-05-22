const removeMessage = require('../tools/removeMessage');
const nav_keyboard = require('../keyboard/nav_keyboard');
const mode_app = require('../tools/mode_app');
const swift = require('../tools/swift');
module.exports = async (id, bot, query, store,message_id) => {
    let keyboard;
  

store.flag=false;
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
    let element;
    if(store.last_mode=="active_appeal"){
        element=store.activelistAppeal.find(el=>{
            return el._id==message_id
        })
    }else{
        element=store.donelistAppeal.find(el=>{
            return el._id==message_id
        })
    }
    
    store.appeal=element;
   if(element.status=="active")
   { keyboard=[[{
        text:"Передати в опрацьовані",
        callback_data:"send_to_done"
    }],[{
        text:"Показати на карті",
        callback_data:"show_map"
    }]]}else{
        keyboard=[[{
            text:"Видалити звернення",
            callback_data:"delete_appeal"
        }],[{
            text:"Показати на карті",
            callback_data:"show_map"
        }]]
    }


text=`${text}\nТип звернення: ${swift[store.mode]}
Текст: ${element.textAppeal}
Фото url: ${element.urlPhoto}
latitude: ${element.latitude} 
longitude: ${element.longitude}
Автор: ${element.userName} @${element.userTelegram_nik}
Дата:${element.date}` 
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
								callback_data: store.mode
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
