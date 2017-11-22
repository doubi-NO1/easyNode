let server = require('../core/server'),
 config = require('../conf/dev.js');

interface.get('column/getcolumns.do',(req,res)=>{
  
}); 

interface.post('column/findcolumns.do',(req,res)=>{
  
});

interface('wrap/getWrap.do',(req,res)=>{

});
let app = new server(config,interface.getconfigs());