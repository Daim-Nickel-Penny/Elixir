const Block = (exports.Block = class Block {
  constructor(opts = {}) {
    Object.assign(
      this,
      {
        parentHash: null,
        stateHash: null,
        miner: null,
        nonce: 0,
        transactions: [],
      },
      opts
    );
  }

  hash() {
    const head = JSON.stringify(this, [
      "parentHash",
      "stateHash",
      "miner",
      "nonce",
    ]);
    const tail = JSON.stringify(this.transactions.map((tx) => tx.hash()));
    return createHash("SHA256")
      .update(head + tail)
      .digest("hex");
  }

  mine(min = 0, max = Number.MAX_SAFE_INTEGER) {
    for (let nonce = min; nonce <= max; nonce++) {
      const block = new Block({ ...this, nonce });
      if (block.test()) return block;
    }
  }

  test() {
    const mask = "0".repeat(CONFIG.BLOCK_DIFFICULTY);
    return this.hash().startsWith(mask);
  }
});
