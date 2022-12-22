const csv = require('csv-parser')
const fs = require('fs')
const brain = require("brain.js");
const net = new brain.NeuralNetwork();


const readCSV = ()=>{
    const results = [];
    fs.createReadStream('./dataset/golf.csv')
    .pipe(csv())
    .on('data', (data) =>{
        console.log(data)
        results.push(data)
    })
    .on('end', () => {
        // [
            //   { NAME: 'Daffy Duck', AGE: '24' },
            //   { NAME: 'Bugs Bunny', AGE: '22' }
            // ]
    });
    return(results)
}

const trainData = ()=>{
    let results = readCSV()
    // console.log(readCSV())
    // console.log(typeof readCSV())
    // results.forEach((d)=>{
    //     console.log(d)
    // })
    net.train([
        { input: { r: 0.03, g: 0.7, b: 0.5 }, output: { black: 1 } },
        { input: { r: 0.16, g: 0.09, b: 0.2 }, output: { white: 1 } },
        { input: { r: 0.5, g: 0.5, b: 1.0 }, output: { white: 1 } },
    ]);
    return(readCSV())
}

const predictData = (req, res)=>{
    const results = [];
    fs.createReadStream('./dataset/golf.csv')
    .pipe(csv())
    .on('data', (data) =>{
        results.push(data)
    })
    .on('end', () => {
        console.table(results)
        let features = []
        let predictions = []
        // [
            //   { NAME: 'Daffy Duck', AGE: '24' },
            //   { NAME: 'Bugs Bunny', AGE: '22' }
            // ]
        net.train([
            { input: { r: 0.03, g: 0.7, b: 0.5 }, output: { black: 1 } },
            { input: { r: 0.16, g: 0.09, b: 0.2 }, output: { white: 1 } },
            { input: { r: 0.5, g: 0.5, b: 1.0 }, output: { white: 1 } },
        ]);
        console.log(results.length)
        console.log(typeof results)
        results.forEach(r=>{
            console.table(r)
            console.table(r.Play)
            predictions.push({ Play: r.Play })
            delete r.play;
            // r.play = undefined;
        })
        features = results
        let result = net.run([1,0]);
        console.log("Features")
        console.table(features)
        console.log("Predictions")
        console.table(predictions)
    });
    
    res.send(`Hello`)
}

module.exports = {
    predictData
}