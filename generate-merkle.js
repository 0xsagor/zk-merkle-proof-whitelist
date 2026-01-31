const { MerkleTree } = require('merkletreejs');
const keccak256 = require('keccak256');

// Example whitelisted addresses
const whitelistAddresses = [
  "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
  "0x70997970C51812dc3A010C7d01b50e0d17dc79C8",
  "0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC"
];

const leafNodes = whitelistAddresses.map(addr => keccak256(addr));
const merkleTree = new MerkleTree(leafNodes, keccak256, { sortPairs: true });

const rootHash = merkleTree.getHexRoot();

console.log('Whitelist Merkle Tree\n', merkleTree.toString());
console.log('Root Hash:', rootHash);

// Generate proof for the first address
const claimingAddress = leafNodes[0];
const hexProof = merkleTree.getHexProof(claimingAddress);
console.log('Proof for Address 0:', hexProof);
