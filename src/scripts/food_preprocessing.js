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
      else
        output[desc][foodclass] = quantity;
    }
    else {
      output[desc] = {};
      output[desc][foodclass] = quantity;
    }
  }

  return output;
};


const main = async ()=>{
  let output = await preprocess();

  fs.writeFileSync('food_desc_to_class.json', JSON.stringify(output, null, 2));


};

main();
