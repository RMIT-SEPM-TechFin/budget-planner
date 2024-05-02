import { ComparisonProps, Item } from '@/types';

const compareItems = (items1: Item[], items2: Item[]) => {
  const itemMap1: ComparisonProps = {};

  const itemMap2: ComparisonProps = {};

  const items1Map = new Map(items1.map((item) => [item.id, item]));
  const items2Map = new Map(items2.map((item) => [item.id, item]));
  console.log('Items 1 Map:', items1Map);
  console.log('Items 2 Map:', items2Map);

  // Check for items in items1 not in items2 or different
  items1.forEach((item) => {
    let item2: Item | undefined;
    loop1: for (const [key, value] of items2Map) {
      if (item.name === value.name && item.category === value.category) {
        item2 = items2Map.get(key);
      }
      if (!item2) {
        continue;
      } else {
        console.log(item.name + ' ' + item2.name);
        for (const [key, value] of Object.entries(item)) {
          if (value !== item2[key as keyof typeof item2]) {
            console.log(value + ' vs ' + item2[key as keyof typeof item2]);
            itemMap1[item.id] = 'bg-comparison-yellow'; // Properties differ
            break loop1; // Stop at the first differing property
          }
        }
      }
    }
    if (!item2) {
      itemMap1[item.id] = 'bg-comparison-red'; // Item by this name and category doesn't exist in items2
    }
  });

  // Check for items in items2 not in items1 or different
  items2.forEach((item) => {
    let item1: Item | undefined;
    loop2: for (const [key, value] of items1Map) {
      if (item.name === value.name && item.category === value.category) {
        item1 = items1Map.get(key);
      }
      if (!item1) {
        continue;
      } else {
        console.log(item.name + ' ' + item1.name);
        for (const [key, value] of Object.entries(item)) {
          if (value !== item1[key as keyof typeof item1]) {
            console.log(value + ' vs ' + item1[key as keyof typeof item1]);
            itemMap2[item.id] = 'bg-comparison-yellow'; // Properties differ
            break loop2; // Stop at the first differing property
          }
        }
      }
    }
    if (!item1) {
      itemMap2[item.id] = 'bg-comparison-green'; // Item by this name and category doesn't exist in items2
    }
  });
  return [itemMap1, itemMap2];
};

export default compareItems;
