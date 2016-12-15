var items = [];

const SULFURAS = 'Sulfuras, Hand of Ragnaros';
const PASSES = 'Backstage passes to a TAFKAL80ETC concert';
const BRIE = 'Aged Brie';

function isLegendary(item) {
  return item.name === SULFURAS;
}

function adjustQuality(item) {
  if (item.name !== BRIE && item.name !== PASSES) {
    if (item.quality > 0) {
      item.quality = item.quality - 1;
    }
  } else {
    if (item.quality < 50) {
      item.quality = item.quality + 1;
      if (item.name === PASSES) {
        if (item.sell_in < 10) {
          if (item.quality < 50) {
            item.quality = item.quality + 1;
          }
        }
        if (item.sell_in < 5) {
          if (item.quality < 50) {
            item.quality = item.quality + 1;
          }
        }
      }
    }
  }

  if (item.sell_in < 0) {
    if (item.name !== BRIE) {
      if (item.name !== PASSES) {
        if (item.quality > 0) {
          item.quality = item.quality - 1;
        }
      } else {
        item.quality = item.quality - item.quality;
      }
    } else {
      if (item.quality < 50) {
        item.quality = item.quality + 1;
      }
    }
  }
}

function update_quality() {
  items.forEach((item) => {
    if (!isLegendary(item)) {
      item.sell_in--;
      adjustQuality(item);
    }
  });
}

module.exports.items = items;
module.exports.update_quality = update_quality;
