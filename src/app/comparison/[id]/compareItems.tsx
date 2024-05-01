import { FC } from "react";

import { ComparisonProps, Item } from "@/types";

const compareItems = (items1: Item[], items2: Item[]) => {
    const itemMap1: ComparisonProps = {};

    const itemMap2: ComparisonProps = {};

    const items1Map = new Map(items1.map(item => [`${item.category}-${item.name}`, item]));
    const items2Map = new Map(items2.map(item => [`${item.category}-${item.name}`, item]));
    console.log('Items 1 Map:', items1Map);
    console.log('Items 2 Map:', items2Map);
  
    // Check for items in items1 not in items2 or different
    items1.forEach(item => {
      const key = `${item.category}-${item.name}`;
      const item2 = items2Map.get(key);
    
      if (!item2) {
        itemMap1[item.id] = "bg-comparison-red";  // Item by this name and category doesn't exist in items2
      } else {
        let propertiesDiffer = false;
        let count = 0;
        loop1:
        for (const [key, value] of Object.entries(item)) {
          if (value !== item2[key as keyof typeof item2]) {
            count++;
            propertiesDiffer = true;
            console.log("the difference is ",value, " and location is ", count,item2[key as keyof typeof item2]);
            break loop1;  // Stop at the first differing property
          }
        }
        if (propertiesDiffer) {
          itemMap1[item.id] = "bg-comparison-yellow";  // Properties differ
        }
      }
    });

    // Check for items in items2 not in items1 or different
    items2.forEach(item => {
      const key = `${item.category}-${item.name}`;
      const item1 = items1Map.get(key);
    
      if (!item1) {
        itemMap2[item.id] = "bg-comparison-green";  // Item by this name and category doesn't exist in items2
      } else {
        let propertiesDiffer = false;
        let count2 = 0;
        loop2:
        for (const [key, value] of Object.entries(item)) {
          if (value !== item1[key as keyof typeof item1]) {
            count2++;
            propertiesDiffer = true;
            console.log("the difference is ",value, " and location is", count2,item1[key as keyof typeof item1]);
            break loop2;  // Stop at the first differing property
          }
        }
        if (propertiesDiffer) {
          itemMap2[item.id] = "bg-comparison-yellow";  // Properties differ
        }
      }
    });
    return [itemMap1, itemMap2];
  };

export default compareItems;