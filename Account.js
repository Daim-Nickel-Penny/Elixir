const State = (exports.State = class State {
  constructor(opts = {}) {
    Object.assign(this, { wallets: {} }, opts);
  }

  hash() {
    const keys = Object.keys(this.wallets).sort();
    const head = JSON.stringify(keys);
    const tail = JSON.stringify(keys.map((wl) => this.wallets[wl]));
    return createHash("SHA256")
      .update(head + tail)
      .digest("hex");
  }

  with(mt) {
    if (mt instanceof Transaction) {
      const sender = this.wallets[mt.from] || { value: 0, nonce: 0 };
      const target = this.wallets[mt.to] || { value: 0, nonce: 0 };
      return new State({
        ...this,
        wallets: {
          ...this.wallets,
          [mt.from]: {
            value: sender.value - mt.value,
            nonce: sender.nonce + 1,
          },
          [mt.to]: { value: target.value + mt.value, nonce: target.nonce },
        },
      });
    } else {
      const miner = this.wallets[mt.miner] || { value: 0, nonce: 0 };
      return new State({
        ...this,
        wallets: {
          ...this.wallets,
          [mt.miner]: { ...miner, value: miner.value + CONFIG.BLOCK_REWARD },
        },
      });
    }
  }
});

const Blockchain = (exports.Blockchain = class Blockchain {
  constructor(opts = {}) {
    Object.assign(
      this,
      {
        state: new State(),
        blocks: new Array(),
      },
      opts
    );
  }

  static verifyTransaction(prev, state, tx) {
    const sender = state.wallets[tx.from] || { value: 0 };
    if (tx.value <= 0 || sender.value < tx.value) throw Error("Bad value.");
    if (tx.nonce < 0 || sender.nonce > tx.nonce) throw Error("Bad nonce.");
    if (prev && prev.nonce > tx.nonce) throw Error("Bad nonce order.");
    if (!tx.test()) throw Error("Transaction is not signed properly.");
    return state.with(tx);
  }

  static verifyBlock(prev, state, block) {
    if (prev && block.parentHash !== prev.hash())
      throw Error("Bad parentHash.");
    if (prev && block.stateHash !== state.hash()) throw Error("Bad stateHash.");
    if (!block.test()) throw Error("Block is not mined properly.");
    return block.transactions.reduce((state, tx, index) => {
      const prev = block.transactions[index - 1] || null;
      return Blockchain.verifyTransaction(prev, state, tx);
    }, state.with(block));
  }

  baln(address) {
    if (!this.state.wallets[address]) return 0;
    return this.state.wallets[address].value;
  }

  push(block) {
    const prev = this.blocks[this.blocks.length - 1] || null;
    this.state = Blockchain.verifyBlock(prev, this.state, block);
    this.blocks.push(block);
  }

  mine(miner, transactions = []) {
    const prev = this.blocks[this.blocks.length - 1] || null;
    this.push(
      new Block({
        parentHash: prev && prev.hash(),
        stateHash: this.state.hash(),
        transactions,
        miner,
      }).mine()
    );
  }
});
