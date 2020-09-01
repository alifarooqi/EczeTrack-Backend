const fooddata = require('./fooddata');
const {Sheet1: kna} = require('./sodium_potassium_data');
const fs = require('fs');

const preprocess = async () => {
  let output = {};
  console.log(fooddata.length, kna.length);

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

    for(let food2 of kna){
      const desc2 = food2['Main food description'];
      if(desc === desc2){
        const na = parseFloat(food2['Sodium (mg)'])/1000;
        const k = parseFloat(food2['Potassium (mg)'])/1000;
        output[desc]['Sodium'] = na;
        output[desc]['Potassium'] = k;
        break;
      }
    }
  }

  // console.log(output);

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
