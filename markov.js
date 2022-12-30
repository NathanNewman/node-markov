/** Textual markov chain generator */


class MarkovMachine {

  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter(c => c !== "");
    this.makeChains();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() {
    // TODO
    const chains = new Map();

    this.words.forEach((word, index) => {
      let nextWord = this.words[index + 1] || null;
      if (chains.has(word)) chains.get(word).push(nextWord);
      else chains.set(word, [nextWord]);
    });
    this.chains = chains;
  }


  /** return random text from chains */

  static randomText(keyWords) {
    return keyWords[Math.floor(Math.random() * keyWords.length)];
  }

  makeText(numWords = 100) {
    // TODO
    const keyWords = Array.from(this.chains.keys());
    let keyWord = MarkovMachine.randomText(keyWords);
    const text = [];

    while (text.length < numWords && keyWord !== null) {
      text.push(keyWord);
      keyWord = MarkovMachine.randomText(this.chains.get(keyWord));
    }
    return text.join(" ");
  }
}

module.exports = {
  MarkovMachine,
};
