const Quality = require('./quality');

var items = [];

const SULFURAS = 'Sulfuras, Hand of Ragnaros';
const PASSES = 'Backstage passes to a TAFKAL80ETC concert';
const BRIE = 'Aged Brie';

function isLegendary(item) {
  return item.name === SULFURAS;
}

function qualityIncreasesWithAge(item) {
  return (item.name === PASSES || item.name === BRIE)
}

function isExpired(item) {
  return item.sell_in < 0;
}

function qualityZeroAfterExpired(item) {
  return item.name === PASSES;
}

function calculateNewQuality(item) {
  const name = item.name;
  const quality = item.quality;
  const sell_in = item.sell_in;

  let newQuality = new Quality(quality);

  if (isExpired(item)) {
    if (qualityZeroAfterExpired(item)) {
      newQuality.set(0);
    } else if (qualityIncreasesWithAge(item)) {
      newQuality.add(2);
    } else {
      newQuality.subtract(2);
    }
  }
  else {
    if (!qualityIncreasesWithAge(item)) {
      newQuality.subtract(1);
    } else {
      newQuality.add(1);
      if (name === PASSES) {
        if (sell_in < 10) {
          newQuality.add(1);
        }
        if (sell_in < 5) {
          newQuality.add(1);
        }
      }
    }
  }

  return newQuality.value;
}

function update_quality() {
  items.forEach((item) => {
    if (!isLegendary(item)) {
      item.sell_in--;
      item.quality = calculateNewQuality(item);
    }
  });
}

module.exports.items = items;
module.exports.update_quality = update_quality;
