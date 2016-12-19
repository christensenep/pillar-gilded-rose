const Quality = require('./quality');

const SULFURAS = 'Sulfuras, Hand of Ragnaros';
const PASSES = 'Backstage passes to a TAFKAL80ETC concert';
const BRIE = 'Aged Brie';

const qualityCurve = [
  { sell_in_min: 0, adjustment: 3 },
  { sell_in_min: 5, adjustment: 2 },
  { sell_in_min: 10, adjustment: 1 }
];

var items = [];

function update_quality() {
  items.forEach((item) => {
    if (!isLegendary(item)) {
      item.sell_in--;
      item.quality = calculateNewQuality(item).value;
    }
  });
}

function calculateNewQuality(item) {
  if (isExpired(item)) {
    return calculateExpiredQuality(item);
  }
  else {
    return calculateUnexpiredQuality(item);
  }
}

function calculateExpiredQuality(item) {
  const newQuality = new Quality(item.quality);

  if (qualityZeroAfterExpired(item)) {
    newQuality.set(0);
  }
  else if (qualityIncreasesWithAge(item)) {
    newQuality.add(2);
  }
  else {
    newQuality.subtract(2);
  }

  return newQuality;
}

function calculateUnexpiredQuality(item) {
  const newQuality = new Quality(item.quality);

  if (usesQualityCurve(item)) {
    newQuality.add(getCurvedQualityAdjustment(item));
  }
  else if (qualityIncreasesWithAge(item)) {
    newQuality.add(1);
  }
  else {
    newQuality.subtract(1);
  }

  return newQuality;
}

function getCurvedQualityAdjustment(item) {
  return qualityCurve.reduce(function(bestPoint,curvePoint) {
    if ((curvePoint.sell_in_min <= item.sell_in) && (curvePoint.sell_in_min > bestPoint.sell_in_min)) {
      bestPoint = curvePoint;
    }
    return bestPoint;
  }).adjustment;
}

function usesQualityCurve(item) {
  return item.name === PASSES;
}

function isLegendary(item) {
  return item.name === SULFURAS;
}

function qualityIncreasesWithAge(item) {
  return (item.name === PASSES || item.name === BRIE);
}

function isExpired(item) {
  return item.sell_in < 0;
}

function qualityZeroAfterExpired(item) {
  return item.name === PASSES;
}

module.exports.items = items;
module.exports.update_quality = update_quality;
