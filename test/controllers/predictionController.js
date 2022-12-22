const csv = require('csv-parser')
const fs = require('fs')
const brain = require("brain.js");
const net = new brain.NeuralNetwork();
var bayes = require('bayes')
var classifier = bayes()


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
            console.log(results.length)
            console.log(typeof results)
            let trainingData = []
            results.forEach(r=>{
                let status = r.Play
                // let status = (r.Play=='yes') ? 1 : 0
                predictions.push({ Play: (r.Play=='yes') ? 1 : 0 })
                delete r.Play;
                delete r['Play'];
                console.table(r)
                let input = [];
                console.log(Object.keys(r))
                Object.keys(r).forEach((e, index)=>{
                    input.push(e)
                    console.log("Length", index)
                    console.log("Object Key Length", Object.keys(r).length-1)
                    // if(Object.keys(r).length-1==index){
                    //     input=input+e+""
                    // }
                    // else{
                    //     input=input+e+", "
                    // }
                })
                trainingData.push({
                    input: input,
                    output: status
                })
            })
            console.error("Incoming Training Data")
            console.table(trainingData)
            net.train(trainingData);
        features = results
        console.log(trainingData[3])
        let result = net.run(trainingData[3]);
        console.log("Prediction made by Machine", result)
    });
    
    res.send(`Hello`)
}

const classifyData = async (req, res)=>{
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
            console.log(results.length)
            console.log(typeof results)
            let trainingData = []
            results.forEach(r=>{
                let status = r.Play
                // let status = (r.Play=='yes') ? 1 : 0
                predictions.push({ Play: (r.Play=='yes') ? 1 : 0 })
                delete r.Play;
                delete r['Play'];
                console.table(r)
                let input = [];
                console.log(Object.keys(r))
                Object.keys(r).forEach((e, index)=>{
                    input.push(e)
                    console.log("Length", index)
                    console.log("Object Key Length", Object.keys(r).length-1)
                    if(Object.keys(r).length-1==index){
                        input=input+e+""
                    }
                    else{
                        input=input+e+","
                    }
                })
                trainingData.push({
                    input: input,
                    output: status
                })
            })
            console.error("Incoming Training Data")
            console.table(trainingData)
            net.train(trainingData);
            trainingData.forEach(e=>{
                classifier.learn(e.input, e.status)
            })

        features = results
        console.log(trainingData[3])
        // let result = net.run(trainingData[3]);
        let result = classifier.categorize(trainingData[2].input)
        console.log("Prediction made by Machine", result)
    });
    
    res.send(`Hello`)
}

module.exports = {
    predictData,
    classifyData
}