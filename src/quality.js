const MAX_QUALITY = 50;
const MIN_QUALITY = 0;

const Quality = function (value) {
  this.value = value;
}

Quality.prototype.validateQuality = function validateQuality() {
  if (this.value > MAX_QUALITY) {
    this.value = MAX_QUALITY;
  }
  if (this.value < MIN_QUALITY) {
    this.value = MIN_QUALITY;
  }
}

Quality.prototype.add = function add(amount) {
  this.value += amount;
  this.validateQuality();
}

Quality.prototype.subtract = function subtract(amount) {
  this.value -= amount;
  this.validateQuality();
}

Quality.prototype.set = function set(amount) {
  this.value = 0;
  this.validateQuality();
}

module.exports = Quality;