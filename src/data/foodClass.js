const foodClassSubgategories = [
  'Whole Fresh Vegetables', //0
  'Whole Fresh Fruits', //1
  "Unrefined Carbohydrates", //2
  "Whole Animal, Plant Protein Foods", //3
  "Water", //4
  "Potassium", //5
  "Colorful vegetables and Fruits", //6
  "Refined Carbohydrates", //7
  "Fruit and Vegetable Juice", //8
  "Dried Fruit and Vegetables", //9
  "Processed Animal, Plant Protein Foods", //10
  "Free Sugar, Sweets, and SSB", //11
  "Sodium", //12
  "Snacking" //13
];


const foodClass = {
  'Baby Foods': {
    subcategory: false
  },
  'Baked Products': {
    subcategory: foodClassSubgategories[7]
  },
  'Beans, peas, legumes': {
    subcategory: foodClassSubgategories[0]
  },
  'Beef and Beef Products': {
    subcategory: foodClassSubgategories[3]
  },
  'Beverages': {
    subcategory: false
  },
  'Cereal Grains and Pasta': {
    subcategory: foodClassSubgategories[7]
  },
  'Dairy and Egg Products': {
    subcategory: foodClassSubgategories[3]
  },
  'Dips, gravies, other sauces': {
    subcategory: foodClassSubgategories[12]
  },
  'Fast Foods': {
    subcategory: false
  },
  'Fats and Oils': {
    subcategory: false
  },
  'Finfish and Shellfish Products': {
    subcategory: foodClassSubgategories[3]
  },
  'French fries and other fried white potatoes': {
    subcategory: foodClassSubgategories[7]
  },
  'Fried vegetables': {
    subcategory: foodClassSubgategories[7]
  },
  'Fruits and Fruit Juices': {
    subcategory: foodClassSubgategories[1]
  },
  'Lamb, Veal, and Game Products': {
    subcategory: foodClassSubgategories[3]
  },
  'Legumes and Legume Products': {
    subcategory: foodClassSubgategories[0]
  },
  'Milk substitutes': {
    subcategory: foodClassSubgategories[7]
  },
  'Nut and Seed Products': {
    subcategory: foodClassSubgategories[0]
  },
  'Pork Products': {
    subcategory: foodClassSubgategories[3]
  },
  'Poultry Products': {
    subcategory: foodClassSubgategories[3]
  },
  'Processed soy products': {
    subcategory: foodClassSubgategories[7]
  },
  'Salt': {
    subcategory: foodClassSubgategories[13]
  },
  'Sausages and Luncheon Meats': {
    subcategory: foodClassSubgategories[10]
  },
  'Snacks': {
    subcategory: foodClassSubgategories[13]
  },
  'Soup': {
    subcategory: false
  },
  'Spices and Herbs': {
    subcategory: foodClassSubgategories[0]
  },
  'Sweets': {
    subcategory: foodClassSubgategories[11]
  },
  'Vegetables and Vegetable Products': {
    subcategory: foodClassSubgategories[0]
  },
}

export {
  foodClassSubgategories,
  foodClass
}
