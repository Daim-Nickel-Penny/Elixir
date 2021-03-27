const { Wallet } = require("./Wallet");
const { createSign, createVerify } = require("crypto");

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

// Method that returns data signature:
const sign = (data, publicKey, privateKey) => {
  const cert = Wallet.getNodePrivateKey(publicKey, privateKey);
  return createSign("SHA256").update(data).sign(cert, "hex");
};

// Method that verifies signature:
const verify = (data, publicKey, signature) => {
  const cert = Wallet.getNodePublicKey(publicKey);
  return createVerify("SHA256").update(data).verify(cert, signature, "hex");
};

// Example wallets:
const User1 = Wallet.create();
const User2 = Wallet.create();

// Case #1: Order that has a valid signature:
const orderOne = "send ten bucks from User1 to User2";
const orderOneIssuer = User1.publicKey;
const orderOneSignature = sign(orderOne, orderOneIssuer, User1.privateKey);

// Case #2: Order that has a fraud signature from another person:
const orderTwo = "send thousand bucks from User1 to User2";
const orderTwoIssuer = User1.publicKey;
const orderTwoSignature = sign(orderTwo, orderOneIssuer, User2.privateKey);

console.log(
  `%c 
-̶-̶-̶-̶-̶-̶-̶-̶-̶-̶-̶-̶-̶-̶-̶-̶-̶-̶-̶-̶-̶-̶`,
  `font-family: monospace`
);

// Verification:
console.log(
  "Order #1 status:",
  verify(orderOne, orderOneIssuer, orderOneSignature)
);
console.log(
  "Order #2 status:",
  verify(orderTwo, orderTwoIssuer, orderTwoSignature)
);
// Expected results: true, false
