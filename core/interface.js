let filter=require('./filter.js');//拦截器

let interface={
  gets:{  

  },
  posts:{

  },
  sets:{//set代表既可以post又可以get

  },
  catalog:{//接口目录

  }
};

function post(url, fn) {
  interface.posts[url] = fn;
  interface.catalog[url]='post';
}

function get(url, fn) {
  interface.gets[url] = fn;
  interface.catalog[url]='get';
}

function set(url, fn) {
  interface.sets[url] = fn;
  interface.catalog[url]='set';
}

function setup(interfaces) {
  interfaces.forEach(v => {
    interface[v.type || 'set']=v.fn;
    interface.catalog[url]=v.type || 'set';
  });
}

function handle(url,req,res){
  let type = interface.catalog[url];
  type && interface[type][url](req,res);
}

module.exports = {
  post,
  get,
  set,
  setup,
  handle
};