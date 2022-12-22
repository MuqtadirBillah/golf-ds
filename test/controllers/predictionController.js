const csv = require('csv-parser')
const fs = require('fs')
const brain = require("brain.js");
const net = new brain.NeuralNetwork();

let results = [];

const readCSV = ()=>{
    fs.createReadStream('./dataset/golf.csv')
    .pipe(csv())
    .on('data', (data) => results.push(data))
    .on('end', () => {
        // console.log(results);
        // [
        //   { NAME: 'Daffy Duck', AGE: '24' },
        //   { NAME: 'Bugs Bunny', AGE: '22' }
        // ]
    });
    return results
}

const trainData = ()=>{
    let result = readCSV()
    console.log(readCSV())
    result.forEach
    net.train([
        { input: { r: 0.03, g: 0.7, b: 0.5 }, output: { black: 1 } },
        { input: { r: 0.16, g: 0.09, b: 0.2 }, output: { white: 1 } },
        { input: { r: 0.5, g: 0.5, b: 1.0 }, output: { white: 1 } },
    ]);
}

const predictData = (req, res)=>{
    trainData();
    result = net.run([1,0]);
    console.log(results)
    res.send(`Hello ${result}`)
}

module.exports = {
    predictData
}