export function setValue(object: Object, path: string, value: any) {
    path = path.replace(/[\[]/gm, '.').replace(/[\]]/gm, ''); //to accept [index]
    var keys = path.split('.'),
      last = keys.pop();
  
    keys.reduce(function (o, k) { return o[k] = o[k] || {}; }, object)[last] = value;
  }