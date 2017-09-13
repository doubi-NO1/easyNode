let is = {
  types: ["Array", "Boolean", "Date", "Number", "Object", "RegExp", "String"]
};
for (let i = 0,c; c = is.types[i++];) {
  is[c] = ((type) => {
    return (obj) => {
      return Object.prototype.toString.call(obj) == "[object " + type + "]";
    };
  })(c);
}
module.exports = is;