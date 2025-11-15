async function main() {
  const [deployer, tenant] = await ethers.getSigners();
  console.log("Deployer:", deployer.address);

  const LeaseContract = await ethers.getContractFactory("LeaseContract");
  const contract = await LeaseContract.deploy(tenant.address, ethers.parseEther("0.1"), { value: ethers.parseEther("0.1") });

  await contract.waitForDeployment();
  console.log("SmartLeje live på Amoy:", await contract.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
