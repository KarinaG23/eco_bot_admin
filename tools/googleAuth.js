
module.exports=async (appeal)=>{
const {google}=require("googleapis");
const { model } = require("mongoose");
const auth=new google.auth.GoogleAuth({
keyFile:"credentials.json",
scopes: "https://www.googleapis.com/auth/spreadsheets"
});
//екземпляр клієнта
const client=await auth.getClient();

const googleSheets=google.sheets({version:"v4",auth:client})
//get data from sheets 1bDeT9acVEVqVz3qlIwZ_iKWbhyhFvqT5bwqT1PzKp9I
const spreadsheetId="1bDeT9acVEVqVz3qlIwZ_iKWbhyhFvqT5bwqT1PzKp9I";
const metaData=await googleSheets.spreadsheets.get({
    auth,
    spreadsheetId,



})
// //load date
// const getRows=await googleSheets.spreadsheets.values.get({
//     auth,
//     spreadsheetId,
//     range:"Лист1!A:A",
// })
// wrire rows
// const newAppeal={
//     userName:store.userName,
//     userIdTelegram:store.userIdTelegram,
//     userTelegram_nik:store.userTelegram_nik,
//     textAppeal:store.appeal.textAppeal,
//     latitude:store.appeal.latitude,
//     longitude:store.appeal.longitude,
//     urlPhoto:store.appeal.urlPhoto,
//     status:store.status,
//     type:store.mode,
//     date:getDate(),
// }
console.log(appeal);
await googleSheets.spreadsheets.values.append({
    auth,
    spreadsheetId,
    range:"Лист1", 
    valueInputOption:"USER_ENTERED",
    resource:{
        values:[
            Object.values(appeal)
        ]
    }
})


}