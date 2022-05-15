var mytoken = artifacts.require("./MyToken.sol");
var MyTokenSale = artifacts.require("./MyTokenSale.sol");
var KycContract = artifacts.require("KycContract.sol");
require('dotenv').config({path:'../.env'});

module.exports = async function(deployer) {
    let address = await web3.eth.getAccounts();
    await deployer.deploy(mytoken, process.env.INITIAL_TOKENS);
    await deployer.deploy(KycContract);
    await deployer.deploy(MyTokenSale, 1, address[0], mytoken.address, KycContract.address);

    let instance = await mytoken.deployed();
    await instance.addMinter(MyTokenSale.address);
    await instance.transfer(MyTokenSale.address, process.env.INITIAL_TOKENS);
}