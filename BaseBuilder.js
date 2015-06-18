'use strict'

class BaseBuilder{
  constructor (){
    this.operations = [];
  }

  build(fixture){
    var stack = _.reduce(this.operations, (composite, func) =>{
      if(composite){
        return _.flow(composite, func)
      } else {
        return func;
      }
    });
    return stack(fixture);
  }

  _registerOperation(fn){
    this.operations.push(fn);
  }
}

module.exports = BaseBuilder;
