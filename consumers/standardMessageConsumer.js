const properties = require("../properties.json");
exports.StandardMessageConsumer = class StandardMessageConsumer {
  /**
   *
   * @param {Object} client
   * @param {Object} dictionary
   */
  constructor(dictionary) {
    this.behavior = dictionary.behavior;
    this.supportedKeywords = dictionary.supported_keywords;
    this.dictionaryContent = dictionary.content;
  }

  /**
   * Consumes a message and reply (or not).
   *
   * @param {object} message
   */
  replyToMessage(message) {
    const replyRand = Math.floor(Math.random() * 100);
    if (replyRand > properties.reply_percentage) return;
    let selectedWord = null;
    switch (this.behavior) {
      case "message":
        selectedWord = this.selectKeywordFromMessage(message.content);
        break;
      case "dictionary":
        selectedWord = this.selectKeywordOrExpressionFromManagedWords(
          message.content
        );
        break;
      default:
        console.error(
          "Unknown behavior... Please reboot the bot with a correct configuration.."
        );
    }
    if (selectedWord === null) return;
    const channel = message.channel;
    // message.reply(this.pickReplyForKeyword(selectedWord));
    // this.client.channels.cache.get(channel)
    channel.send(this.pickReplyForKeyword(selectedWord));
  }

  /**
   * Randomly picks an available reply in the dictionary for the given keyword.
   *
   * @param {string} keyword
   */
  pickReplyForKeyword(keyword) {
    const availableReplies = this.dictionaryContent[keyword];
    let replyId = Math.floor(Math.random() * availableReplies.length);
    this.dictionaryContent[keyword][replyId];
    return this.dictionaryContent[keyword][replyId];
  }

  /**
   * Reads each words of the message and checks if it matches a word supported by the dictionary.
   * Then randomly selects 1 of the matching words to reply.
   *
   * @param {string} messageContent
   */
  selectKeywordFromMessage(messageContent) {
    const messageString = messageContent.toLowerCase();
    const words = messageString.split(" ");
    const matchingWords = [];

    for (let word of words) {
      if (this.supportedKeywords.indexOf(word) >= 0) {
        matchingWords.push(word);
      }
    }

    if (matchingWords.length > 0) {
      let wordId = Math.floor(Math.random() * matchingWords.length);
      return matchingWords[wordId];
    }
    return null;
  }

  /**
   * Read each word or expression supported by the dictionary and checks if it matches a part of the message.
   * Then randomly selects 1 of the matching words/expression to reply.
   *
   * @param {string} messageContent
   */
  selectKeywordOrExpressionFromManagedWords(messageContent) {
    // TODO: write the code!
  }
};
