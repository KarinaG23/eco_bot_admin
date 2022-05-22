const TelegramApi = require('node-telegram-bot-api');
const imgurlLoader = require('./tools/imagesTools/imgurLoader');
const getFileLink = require('./tools/getLinkforDownload');
require('dotenv').config();
const mongoose = require('mongoose');
const onStart = require('./layouts/onStart');
const home_keyboard = require('./keyboard/home_keyboard');

const removeMessageSingle = require('./tools/removeMessageSingle');
const mode_app = require('./tools/mode_app');
const onActiveAppeals = require('./layouts/onActiveAppeals');
const showAppeals = require('./layouts/showAppeals');
const showMessage = require('./layouts/showMessage');
const showMap = require('./layouts/showMap');
const onDone = require('./layouts/onDone');
const deleteAppeal = require('./layouts/deleteAppeal');
const info_board = require('./layouts/info_board');
const firstStep = require('./layouts/notification/firstStep');
const showTitle = require('./layouts/notification/showTitle');
const showText = require('./layouts/notification/showText');
const onShowLocation = require('./layouts/notification/onShowLocation');
const sendMessage = require('./layouts/notification/sendMessage');
const showNotifications = require('./layouts/notification/showNotifications');
const showItem = require('./layouts/notification/showItem');
const deleteNot = require('./layouts/notification/deleteNot');
mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true }, () => console.log('Connect DB'));
const bot = new TelegramApi(process.env.TOKKEN, { polling: true });
const store = {
	userName: '',
	userIdTelegram: '',
	userTelegram_nik: '',
	mode: '',
	last_mode:"",
	activelistAppeal:[],
	donelistAppeal:[],
	listNot:[],
	not:{},
	flag:false,
	latitude:"",
	longitude:"",
	appeal:{},
	
	notArray:{
		title:"",
		text:"",
		latitude:"",
		longitude:"",
		date:""



	} ,
	step1:false,
	step2:false,
	step3:false,
	};
//старт бота
bot.onText(/\/start/, async (msg) => {
	const { id } = msg.chat;
	const firstName = msg.from.first_name || '';
	const lastName = msg.from.last_name || '';
	store.userName = firstName + ' ' + lastName;
	store.userIdTelegram = msg.from.id;
	store.userTelegram_nik = msg.from.username;
	onStart(id, bot, home_keyboard, msg.message_id,store);
});

// // обробка головного меню
bot.on('callback_query', async (query) => {
	const id = query.message.chat.id;
	const data = query.data;
	switch (data) {
		//активні звернення
		case mode_app.active_appeal:
			store.mode = mode_app.active_appeal;
			onActiveAppeals(id, bot, query, store)
			break;
		case mode_app.done_appeal:
			store.mode = mode_app.done_appeal;
			onActiveAppeals(id, bot, query, store)
			break;

			case mode_app.inf_board:
				store.mode = mode_app.inf_board;
				info_board(id, bot, query, store)
				break;
				case mode_app.not_first:
					store.mode = mode_app.not_first;
					firstStep(id, bot, query,store)
					break;

					case mode_app.next_step:
					store.mode = mode_app.next_step;
					showTitle(id, bot, query.message.message_id,store)
					break;
					case mode_app.next_step_text:
						store.mode = mode_app.next_step_text;
						showText(id, bot, query.message.message_id,store)
						break;
						
						case mode_app.next_step_cord:
							store.mode = mode_app.next_step_cord;
							onShowLocation(id, bot, query.message.message_id,store)
							break;
							case mode_app.send_message:
								store.mode = mode_app.send_message;
								sendMessage(id, bot, query.message.message_id,store)
								break;
								case mode_app.not_activ:
									store.mode = mode_app.not_activ;
									showNotifications(id, bot, query, store)
									break;
							

			case mode_app.show_map:
			showMap(id, bot,query, store)
			break;
			case mode_app.send_to_done:
			onDone(id, bot, query, store)
			break;
			case mode_app.delete_appeal:
			deleteAppeal(id, bot, query, store)
			break;
			case mode_app.delete_not:
				
			deleteNot(id, bot, query, store)
			break;




			

		//повернення на головну сторінку
		case mode_app.return_home: 
			store.mode = '';
			console.log('Головна');
			await onStart(id, bot, home_keyboard, query.message.message_id,store);
			break;
	}
});

// обробка видів порушень
bot.on('callback_query', async (query) => {
	const id = query.message.chat.id;
	const data = query.data;
	switch (data) {
		//активні звернення
		case mode_app.on_forest:
			if(store.flag){
				store.last_mode=store.mode;
					}
			store.mode = mode_app.on_forest;
			console.log("Ліс");
			showAppeals(id, bot, query, store)
			
			break;
			case mode_app.on_landfills:
				if(store.flag){
			store.last_mode=store.mode;
				}

			store.mode = mode_app.on_landfills;
			console.log("Ліс");
			showAppeals(id, bot, query, store)
			
			break;
			case mode_app.on_barriers:
				if(store.flag){
					store.last_mode=store.mode;
						}
				store.mode = mode_app.on_barriers;
			
				showAppeals(id, bot, query, store)
				
				break;
				case mode_app.on_pit:
					if(store.flag){
						store.last_mode=store.mode;
							}
					store.mode = mode_app.on_pit;
				
					showAppeals(id, bot, query, store)
					
					break;
					case mode_app.on_other:
						if(store.flag){
							store.last_mode=store.mode;
								}
						store.mode = mode_app.on_other;
					
						showAppeals(id, bot, query, store)
						
						break;


			
	}
});
//обробка категорії виведеня 
bot.on('callback_query', async (query) => {
	const id = query.message.chat.id;
	const data = query.data;
	
	if (data.indexOf("on_forest|") != -1) {
     const idMessage= data.split("|")[1] 
	 showMessage(id, bot, query, store,idMessage)


};
if (data.indexOf("on_barriers|") != -1) {
	const idMessage= data.split("|")[1] 
	showMessage(id, bot, query, store,idMessage)


};
if (data.indexOf("on_pit|") != -1) {
	const idMessage= data.split("|")[1] 
	showMessage(id, bot, query, store,idMessage)


};
if (data.indexOf("on_landfills|") != -1) {
	const idMessage= data.split("|")[1] 
	showMessage(id, bot, query, store,idMessage)


};
if (data.indexOf("on_other|") != -1) {
	const idMessage= data.split("|")[1] 
	showMessage(id, bot, query, store,idMessage)


};
if (data.indexOf("not_activ|") != -1) {
	const idMessage= data.split("|")[1] 
	
	showItem(id, bot, query, store,idMessage)


};
});
bot.on('message', async (msg) => {
	const { id } = msg.chat;
	if (store.step1&&msg.text!="/start") {
		store.notArray.title = msg.text;
		showTitle(id, bot, msg.message_id,store)
		
	}else if (store.step2&&msg.text!="/start"){
		store.notArray.text = msg.text;
		showText(id, bot, msg.message_id,store)
	}
else{
	await removeMessageSingle(id, bot,msg.message_id);
}
});



bot.on('location',async (msg) => {
	const { id } = msg.chat;
	if (store.step3 == true&&msg.text!="/start") {
		store.notArray.latitude = msg.location.latitude;
		store.notArray.longitude = msg.location.longitude;
		onShowLocation(id, bot, msg.message_id,store);
	}else{
		
		await removeMessageSingle(id, bot,msg.message_id);
	}
});
