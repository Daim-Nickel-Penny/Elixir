const { Wallet, Transaction, Blockchain } = require("./filesTerm");

const User2 = Wallet.create();
const User1 = Wallet.create();

const chain = new Blockchain();
chain.mine(User1.publicKey);

console.log("User1:", chain.baln(User1.publicKey));
console.log("User2:", chain.baln(User2.publicKey));

chain.mine(User1.publicKey, [
  new Transaction({
    from: User1.publicKey,
    to: User2.publicKey,
    value: 15,
    nonce: 0,
  }).sign(User1.privateKey),
]);

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

console.log("User1:", chain.baln(User1.publicKey));
console.log("User2:", chain.baln(User2.publicKey));
