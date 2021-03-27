const { Wallet, Transaction } = require("./filesTerm");
console.log(
  `%c 

███████╗  ██╗░░░░░    ██╗  ██╗░░██╗  ██╗  ██████╗░
██╔════╝  ██║░░░░░    ██║  ╚██╗██╔╝  ██║  ██╔══██╗
█████╗░░  ██║░░░░░    ██║  ░╚███╔╝░  ██║  ██████╔╝
██╔══╝░░  ██║░░░░░    ██║  ░██╔██╗░  ██║  ██╔══██╗
███████╗  ███████╗    ██║  ██╔╝╚██╗  ██║  ██║░░██║
╚══════╝  ╚══════╝    ╚═╝  ╚═╝░░╚═╝  ╚═╝  ╚═╝░░╚═╝`,
  `font-family: monospace`
);

const User1 = Wallet.create();
const User2e = Wallet.create();

const transactionOne = new Transaction({
  from: User1.publicKey,
  to: User2e.publicKey,
  nonce: 0,
  value: 15,
}).sign(User1.privateKey);

const transactionTwo = new Transaction({
  from: User1.publicKey,
  to: User2e.publicKey,
  nonce: 0,
  value: 15,
});

const transactionThree = new Transaction({
  from: User1.publicKey,
  to: User2e.publicKey,
  nonce: 0,
  value: 15,
}).sign(User2e.privateKey);

console.log("Transaction #1 status:", transactionOne.test());
console.log("Transaction #2 status:", transactionTwo.test());
console.log("Transaction #3 status:", transactionThree.test());

console.log(
  `%c 
-̶-̶-̶-̶-̶-̶-̶-̶-̶-̶-̶-̶-̶-̶-̶-̶-̶-̶-̶-̶-̶-̶`,
  `font-family: monospace`
);
