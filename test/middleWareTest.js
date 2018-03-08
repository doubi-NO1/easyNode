const middleWare = require('../core/middleWare');

let middleWares = [
  ()=>{
    console.log(1);
  },
  async () => {
    console.log(2);
  },
  () => {
    console.log(3);
  },
  () => {
    console.log(4);
  },
  () => {
    console.log(5);
  },
]


middleWare(middleWares)();