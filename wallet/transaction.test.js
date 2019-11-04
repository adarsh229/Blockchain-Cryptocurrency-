const Transaction = require('./transaction');
const Wallet = require('./index');


describe('Transaction', () => {
    let transaction, wallet, recipient, amount;

    beforeEach(() => {
        wallet = new Wallet();
        amount = 50;
        recipient = 'reciPient';
        transaction = Transaction.newTransaction(wallet, recipient, amount);
    })

    it('outputs the `amount` subtracted from wallet balance', () => {
        expect(transaction.outputs.find(output => output.address === wallet.publicKey).amount.toEqual(wallet.balance - amount));
    });

    it('outputs the `amount` added to the recipient', () => {
        expect(transaction.outputs.find(output => output.address === recipient).amount.toEqual(amount));
    });

    it('invalidates a corrupt transaction', () => {
        transaction.outputs[0].amount = 500000;
        expect(Transaction.verifyTransaction(transaction)).toBe(false);
    })

    // describe('update a transaction', () => {
    //     let nextAmount, nextRecipient;

    //     beforeEach(() => {
    //         nextAmount = 20;
    //         nextRecipient = 'neXT AddreSS';
    //         transactions = transaction.update(wallet, nextRecipient, nextAmount);
    //     })
    // })
})