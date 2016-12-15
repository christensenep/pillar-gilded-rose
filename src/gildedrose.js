var items = [];

const SULFURAS = 'Sulfuras, Hand of Ragnaros';
const PASSES = 'Backstage passes to a TAFKAL80ETC concert';
const BRIE = 'Aged Brie';

function isLegendary(item) {
  return item.name === SULFURAS;
}

function calculateNewQuality(item) {
  const name = item.name;
  const quality = item.quality;
  const sell_in = item.sell_in;

  let newQuality = quality;

  if (name !== BRIE && name !== PASSES) {
    if (newQuality > 0) {
      newQuality--;
    }
  } else {
    if (newQuality < 50) {
      newQuality++;
      if (name === PASSES) {
        if (sell_in < 10) {
          if (newQuality < 50) {
            newQuality++;
          }
        }
        if (sell_in < 5) {
          if (newQuality < 50) {
            newQuality++;
          }
        }
      }
    }
  }

  if (sell_in < 0) {
    if (name !== BRIE) {
      if (name !== PASSES) {
        if (newQuality > 0) {
          newQuality--;
        }
      } else {
        newQuality = 0;
      }
    } else {
      if (quality < 50) {
        newQuality++;
      }
    }
  }

  return newQuality;
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
