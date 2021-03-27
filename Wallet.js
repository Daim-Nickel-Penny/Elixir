//Building Wallet
const { createHash, createECDH, createSign, createVerify } = require("crypto");

const Wallet = (exports.Wallet = class Wallet {
  constructor(opts = {}) {
    Object.assign(
      this,
      {
        /*Here,
wallet --> store --> private key --[Secured]--> --> Sign -->data
wallet --> store --> public key --[Secured] <-- Verify Status <-- Data
*/
        publicKey: null,
        privateKey: null,
      },
      opts
    );
  }

  //using Elliptic Curve Diffie-Hellman

  static create() {
    const keypair = createECDH("secp256k1");
    keypair.generateKeys();
    return new Wallet({
      publicKey: keypair.getPublicKey("hex"),
      privateKey: keypair.getPrivateKey("hex"),
    });
  }

  static getNodePrivateKey(user, key) {
    const t =
      "308184020100301006072a8648ce3d020106052b8104000a046d306b0201010420";
    const k = Buffer.from(t + key + "a144034200" + user, "hex").toString(
      "base64"
    );
    return `-----BEGIN PRIVATE KEY-----\n${k}\n-----END PRIVATE KEY-----`;
  }

  static getNodePublicKey(user) {
    const t = "3056301006072a8648ce3d020106052b8104000a034200";
    const k = Buffer.from(t + user, "hex").toString("base64");
    return `-----BEGIN PUBLIC KEY-----\n${k}\n-----END PUBLIC KEY-----`;
  }
});
