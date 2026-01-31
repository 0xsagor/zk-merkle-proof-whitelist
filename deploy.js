const hre = require("hardhat");

async function main() {
  const root = "0x839d39e240212002f23cf516e507f30026e63715c6f3702167c134882194c794"; // From generator
  const Whitelist = await hre.ethers.getContractFactory("Whitelist");
  const contract = await Whitelist.deploy(root);

  await contract.waitForDeployment();
  console.log(`Whitelist contract deployed to: ${await contract.getAddress()}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
