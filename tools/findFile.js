
const fs = require("fs").promises;
module.exports = async (folderName) =>{
    const arrFile=[]
    const items = await fs.readdir(folderName, { withFileTypes: true });
    items.forEach((item) => {
      if (item.isDirectory()) {
        findFiles(`${folderName}/${item.name}`);
      } else {
          arrFile.push({name:item.name,folderName:folderName});
        
      }
    });
    console.log(arrFile);
  }