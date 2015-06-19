'use strict'

class BaseBuilder {

  constructor(transforms) {
    this.operations = [];
    this._transForm(transforms)
  }

  build(fixture) {
    var stack = _.reduce(this.operations, (composite, func) => {
      if (composite) {
        return _.flow(composite, func)
      } else {
        return func;
      }
    });
    return stack(fixture);
  }

  _registerOperation(fn) {
    this.operations.push(fn);
  }

  _transform(transformations) {
    if (_.isObject(transformations)) {
      this._registerOperation((fixture) => {
        _.each(_.keys(transformations), (key) => {
          fixture[key] && (fixture[key] = transformations[key](fixture));
        });
        return fixture;
      });
    } else {
      throw new Error('Cannot transform on anything other than an object');
    }
  }
}

module.exports = BaseBuilder;
