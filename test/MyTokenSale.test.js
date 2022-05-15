const token = artifacts.require("MyToken");
const tokenSale = artifacts.require("MyTokenSale");
const kycContract = artifacts.require("KycContract");

const chai = require("./chaisetup.js");
const BN = web3.utils.BN;
const { async } = require("regenerator-runtime");
//const { assert } = require("console");

const expect = chai.expect;

require('dotenv').config({path:'../.env'});

contract("Token Test", async (accounts) => {
    const [ initialHolder, recipient, anotherAccount ] = accounts;

    it("There shouldn't be any coins in my account", async() => {
        let instance = await token.deployed();
        return expect(instance.balanceOf(initialHolder)).to.eventually.be.a.bignumber.equal(new BN(0));
    });

    it("all coins should be in the tokensale smart contract", async() => {
        let tokenInstance = await token.deployed();
        let balance = await tokenInstance.balanceOf(tokenSale.address);
        let totalSupply = tokenInstance.totalSupply();

        return expect(totalSupply).to.eventually.be.a.bignumber.equal(balance);
    });

    it("should be possible to buy 1 token by simply sending ether to smart contract", async() => {
        let tokenInstance = await token.deployed();
        let tokenSaleInstance = await tokenSale.deployed();
        let balanceBefore = await tokenInstance.balanceOf.call(recipient);
        await expect(tokenSaleInstance.sendTransaction({from: recipient, value: web3.utils.toWei("1", "wei")})).to.be.rejected;
        expect(balanceBefore).to.be.a.bignumber.equal(await tokenInstance.balanceOf(recipient));

        let kycInstance = await kycContract.deployed();
        await kycInstance.setKycCompleted(recipient);
        await expect(tokenSaleInstance.sendTransaction({from: recipient, value: web3.utils.toWei("1", "wei")})).to.be.fulfilled;
        return expect(balanceBefore+1).to.be.a.bignumber.equal(await tokenInstance.balanceOf(recipient));
    });
});