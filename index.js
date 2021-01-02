const natural = require('natural');
const BrainJs = require('brain.js');
const TrainingSet = require('./data.json');

/**
 * Creates a word dictionary to encode phrases
 * @param {Object} trainingData The JSON training set
 */
function buildWordDictionary(trainingData) {
    const tokenisedArray = trainingData.map(item => {
        const tokens = item.phrase.split(' ');
        return tokens.map(token => natural.PorterStemmer.stem(token));
    });

    const flattenedArray = [].concat.apply([], tokenisedArray);
    return flattenedArray.filter((item, pos, self) => self.indexOf(item) == pos);
}

const dictionary = buildWordDictionary(TrainingSet);

/**
 * Encodes a phrrase to a series of 0 and 1.
 * It basically splits the phrase, checks if the words are in the dictionary array, ands adds 0 or 1.
 * Example: "ur mom is so fat"
 * All the words of that phrase are in the dictionary array so it will return:
 * "1 1 1 1 1"
 * If the phrase is: "she just went to the bathroom", the result would be: "1 0 1 1 1 0"
 * @param {String} phrase phrase to be encoded
 */
function encode(phrase) {
    const phraseTokens = phrase.split(' ');
    const encodedPhrase = dictionary.map(word => phraseTokens.includes(word) ? 1 : 0);

    return encodedPhrase;
}

/**
 * Encodes each word of the dataset
 */
const encodedTrainingSet = TrainingSet.map(dataSet => {
    const encodedValue = encode(dataSet.phrase);
    return { input: encodedValue, output: dataSet.result };
});

class UrMom {
    /**
     * The urmom.js constructor
     * @param {Boolean} debug If set to true, console logging is enabled.
     * @param {Number} threshold AI classification threshold. (0.85 default)
     */
    constructor(debug, threshold) {
        if (typeof(debug) != "boolean" && typeof(debug) != "undefined")
            throw new Error("The \"debug\" variable needs to be a boolean!");
        this.debug = debug || false;

        if (typeof(threshold) != "number" && typeof(threshold) != "undefined")
            throw new Error("The \"threshold\" variable needs to be a number!");
        this.threshold = threshold || 0.8;
    }

    /**
     * Initializes and trains the AI
     */
    Init() {
        this.DataSet = TrainingSet;
        this.EncodedDataSet = encodedTrainingSet;
        this.Network = new BrainJs.NeuralNetwork();
        if (this.debug)
            console.log("[urmom.js] - Creating encoded set...");
        if (this.debug)
            console.log("[urmom.js] - Training AI...");
        this.network.train(this.EncodedDataSet);
        if (this.debug)
            console.log("[urmom.js] - Done!");
    }

    /**
     * Analyzes the given text to search for "ur mom" jokes
     * @param {String} text The text to analize
     */
    Check(text) {
        if (!this.network)
            throw new Error("You need to train the AI first!");

        if (typeof(text) != "string")
            throw new Error("The \"text\" variable needs to be a string!");

        if (this.debug)
            console.log("[urmom.js] - Encoding text...");

        const encoded = encode(text);

        if (this.debug) {
            console.log("[urmom.js] - Done!");
            console.log("[urmom.js] - Running AI...");
        }

        var res = this.network.run(encoded);

        if (this.debug)
            console.log(`[urmom.js] - Result: ${res.joke}. Threshold: ${this.threshold}.`);

        if (res.joke > this.threshold)
            return { result: true, number: res.joke };

        return { result: false, number: res.joke };
    }
}

module.exports = UrMom;