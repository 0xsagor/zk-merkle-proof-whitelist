// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Whitelist is Ownable {
    bytes32 public merkleRoot;
    mapping(address => bool) public hasClaimed;

    constructor(bytes32 _merkleRoot) Ownable(msg.sender) {
        merkleRoot = _merkleRoot;
    }

    function checkIn(bytes32[] calldata _merkleProof) external {
        require(!hasClaimed[msg.sender], "Already checked in");

        // Verify the leaf (msg.sender) against the root
        bytes32 leaf = keccak256(abi.encodePacked(msg.sender));
        require(MerkleProof.verify(_merkleProof, merkleRoot, leaf), "Invalid Merkle Proof");

        hasClaimed[msg.sender] = true;
    }

    function updateRoot(bytes32 _newRoot) external onlyOwner {
        merkleRoot = _newRoot;
    }
}
