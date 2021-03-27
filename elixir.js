//Building Wallet

class Wallet {
  constructor(opts = {}) {
    /*Here,
wallet --> store --> private key --[Secured]--> --> Sign -->data
wallet --> store --> public key --[Secured] <-- Verify Status <-- Data

*/
    Object.assign(
      this,
      {
        publicKey: null,
        privateKey: null,
      },
      opts
    );
  }
}

//using Elliptic Curve Diffie-Hellman
