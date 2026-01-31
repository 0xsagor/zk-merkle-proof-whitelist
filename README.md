# ZK-Style Merkle Proof Whitelist

Storing a whitelist of 10,000 addresses on-chain is prohibitively expensive. This repository implements a **Merkle Root Verification** system that reduces storage costs to a single `bytes32` hash.



## How it Works
1. **Off-Chain**: All whitelisted addresses are hashed together into a Merkle Tree.
2. **On-Chain**: Only the "Root" of the tree is stored in the contract.
3. **Verification**: To mint, a user provides their "Proof" (the sibling hashes). The contract re-hashes the proof to see if it matches the stored Root.

## Features
* **O(log n) Verification**: Extremely fast and gas-efficient regardless of whitelist size.
* **OpenZeppelin Integrated**: Uses the industry-standard `MerkleProof.sol` library.
* **Javascript Generator**: Includes a script to generate the tree and proofs for your frontend.

## Setup
1. `npm install`
2. Run `node generate-merkle.js` to create your root and proofs.
3. Deploy the contract with the generated root.
