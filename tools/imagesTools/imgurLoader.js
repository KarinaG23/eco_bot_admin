const { ImgurClient } = require('imgur');

path = require('path');
var fs = require('fs');
module.exports= async(url)=>{

const client = new ImgurClient({
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  refreshToken: process.env.REFRESH_TOKEN,
});
// upload multiple images via fs.createReadStream (node)
const response = await client.upload({
  image: url,
  type: 'url',
});
return response.data.link;
}