const jsdoc2md = require('jsdoc-to-markdown');
const fs = require('fs');

(async ()=>{
  let docs = await jsdoc2md.render({ files: 'core/db/dbMongo.js' });
})(); 