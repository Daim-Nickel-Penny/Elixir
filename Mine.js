const { Wallet, Block, Transaction } = require("./filesTerm");

const User1 = Wallet.create();
const User2 = Wallet.create();

const blockchain = [];

console.log("----Mining In progress----");

blockchain.push(
  new Block({
    parentHash: null,
    stateHash: null,
    miner: User1.publicKey,
    transactions: [],
  }).mine()
);

console.log(blockchain[0].hash());

blockchain.push(
  new Block({
    parentHash: blockchain[blockchain.length - 1].hash(),
    stateHash: null,
    miner: User1.publicKey,
    transactions: [
      new Transaction({
        from: User1.publicKey,
        to: User2.publicKey,
        value: 15,
        nonce: 0,
      }).sign(User1.privateKey),
    ],
  }).mine()
);
console.log(blockchain[1].hash());

console.log(
  `%c 
-̶-̶-̶-̶-̶-̶-̶-̶-̶-̶-̶-̶-̶-̶-̶-̶-̶-̶-̶-̶-̶-̶`,
  `font-family: monospace`
);
