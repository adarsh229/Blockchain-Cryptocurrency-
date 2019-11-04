//const SHA256 = require('crypto-js/sha256');
const ChainUtil = require('../chain-util');
const {DIFFICULTY, MINE_RATE} = require('../config');

//const DIFFICULTY = 4;

class Block {
    constructor(timestamp, lastHash, hash, data, nonce, difficulty) {
        this.timestamp = timestamp;
        this.lastHash = lastHash;
        this.hash = hash;
        this.data = data;
        this.nonce = nonce;
        this.difficulty = difficulty || DIFFICULTY;

    }
    toString() {
        return `Block - 
        TimeStamp: ${this.timestamp}
        LastHash: ${this.lastHash.substring(0,10)}
        Hash: ${this.hash}
        Nonce: ${this.nonce}
        Difficulty: ${this.difficulty}
        Data: ${this.data}`;
    }

    static genesis() {  //the first block - the origin
        return new this('Genesis Time', '------', 'firstHash1-h43229', [], 0, DIFFICULTY);   //return a new instance of this "Block" class
        //0 is the nonce value
    }

    //difficulty of next mine block based on prev mine block

    static mineBlock(lastBlock, data) {  //contains lastBlock details and the data which we want to store in it
        let hash, timestamp;
       // const timestamp = Date.now();
        const lastHash = lastBlock.hash;
        let { difficulty } = lastBlock;
        let nonce = 0;
        do {
            nonce++;
            timestamp = Date.now();
            difficulty = Block.adjustDifficulty(lastBlock, timestamp)
            hash = Block.hash(timestamp, lastHash, data, nonce, difficulty);
        } while(hash.substring(0, difficulty) !== '0'.repeat(difficulty));  //to check for leading zeroes
        


        return new this(timestamp, lastHash, hash, data, nonce, difficulty);

    }

    static hash(timestamp, lastHash, data, nonce, difficulty) {
        return ChainUtil.hash(`${timestamp}${lastHash}${data}${nonce}${difficulty}`).toString();
    }

    static blockHash(block) {
        const {timestamp, lastHash, data, nonce, difficulty} = block;
        return Block.hash(timestamp, lastHash, data, nonce, difficulty);
    }

    static adjustDifficulty(lastBlock, currentTime) {
        let {difficulty} = lastBlock;
        difficulty = lastBlock.timestamp + MINE_RATE > currentTime ? difficulty + 1 : difficulty - 1;
        return difficulty;
    }
}

module.exports = Block;