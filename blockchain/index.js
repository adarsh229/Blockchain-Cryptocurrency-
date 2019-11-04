const Block = require('./block');

class BlockChain {
    constructor() {
        this.chain = [Block.genesis()];
    }

    addBlock(data) {
        const lastBlock = this.chain[this.chain.length - 1];
        const block = Block.mineBlock(lastBlock, data);
        this.chain.push(block);

        return block;
    }

    isValidChain(chain) {
        if(JSON.stringify(chain[0]) !== JSON.stringify(Block.genesis())) return false;

        for(let i = 1; i < chain.length; i++) {
            const block = chain[i];
            const lastBlock = chain[i-1];

            if(block.lastHash !== lastBlock.hash || block.hash !== Block.blockHash(block)) {
                return false;
            }
        }

        return true;
    }

    replaceChain(newChain) {  //for multiple collaborators/ contributors 
        if(newChain.length <= this.chain.length) {
            console.log("chain is not longer than current chain");
            return;
        } else if(!this.isValidChain(newChain)) {
            console.log("received chain is not valid");
            return;
        }

        this.chain = newChain;
        console.log("replacing blockchain with the new chain");
    }
}

module.exports = BlockChain;