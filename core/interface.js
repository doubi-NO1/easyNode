let interface = {
  gets: {

  },
  posts: {

  },
  any: { //set代表既可以post又可以get

  },
  catalog: { //接口目录

  }
};

let post = (url, fn) => {
    interface.posts[url] = fn;
    interface.catalog[url] = 'post';
  },

  get = (url, fn) => {
    interface.gets[url] = fn;
    interface.catalog[url] = 'get';
  },

  any = (url, fn) => {
    interface.any[url] = fn;
    interface.catalog[url] = 'any';
  },

  setup = (interfaces) => {
    interfaces.forEach(v => {
      interface[v.type || 'any'] = v.fn;
      interface.catalog[url] = v.type || 'any';
    });
  },

  handle = (url, req, res) => {
    let type = interface.catalog[url];
    type && interface[type][url](req, res);
  };

module.exports = {
  post,
  get,
  any,
  setup,
  handle
};