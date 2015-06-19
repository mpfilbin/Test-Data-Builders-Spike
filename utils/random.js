import uuid from 'uuid'

var random = module.exports = {};

random.integer = (max, min) => {

  return Math.round(random.float(max, min)) / 100;
};

random.float = (max, min) => {
  return Math.random() * (max - min) + min * 100
}
