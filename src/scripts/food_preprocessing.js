const fooddata = require('./fooddata');
const fs = require('fs');

const preprocess = async () => {
  let output = {};
  console.log(fooddata.length);

  for(let food of fooddata){
    const desc = food['Main food description'];
    const foodclass = food['Food Class'];
    const quantity = parseFloat(food['Ingredient weight (g)']);

    if(output[desc]){
      if(output[desc][foodclass]){
        output[desc][foodclass] += quantity;
      }
      else {
        output[desc][foodclass] = quantity;
      }
    }
    else {
      output[desc] = {};
      output[desc][foodclass] = quantity;
    }
  }

  for (let item in output){
    let total = 0;
    let foodItem = output[item];

    for (let foodClass in foodItem){
      total += foodItem[foodClass];
    }

    for (let foodClass in foodItem){
      foodItem[foodClass] = foodItem[foodClass] / total
    }
  }

  return output;
};


const main = async ()=>{
  let output = await preprocess();

  fs.writeFileSync('food_desc_to_class.json', JSON.stringify(output, null, 2));


};

main();
