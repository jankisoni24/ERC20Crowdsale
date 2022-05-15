const token = artifacts.require("MyToken");

const chai = require("./chaisetup.js");
const BN = web3.utils.BN;

const { async } = require("regenerator-runtime");
//const { assert } = require("console");

const expect = chai.expect;

require('dotenv').config({path:'../.env'});

contract("Token Test", async (accounts) => {
    const [ initialHolder, recipient, anotherAccount ] = accounts;

    beforeEach(async() => {
        this.myToken = await token.new(process.env.INITIAL_TOKENS);
    });

    it("all tokens should be in my account", async() => {
        //let instance = await token.deployed();
        let instance = this.myToken;
        let totalSupply = await instance.totalSupply();
        //let balanceOf = await instance.balanceOf(accounts[0]);
        //assert.eqaul(totalSupply.valueOf(), balanceOf.valueOf(),"The balance was not the same");
        return expect(instance.balanceOf(initialHolder)).to.eventually.be.a.bignumber.equal(totalSupply);
    });

    it("I can send token from account 1 to account 2", async() => {
        const sendToken = 1;
        //let instance = await token.deployed();
        let instance = this.myToken;
        let totalSupply = await instance.totalSupply();
        await expect(instance.balanceOf(initialHolder)).to.eventually.be.a.bignumber.equal(totalSupply);
        await expect(instance.transfer(recipient, sendToken)).to.eventually.be.fulfilled;
        await expect(instance.balanceOf(initialHolder)).to.eventually.be.a.bignumber.equal(totalSupply.sub(new BN(sendToken)));
        return expect(instance.balanceOf(recipient)).to.eventually.be.a.bignumber.equal(new BN(sendToken));
    });

    it("It is not possible to send more tokens than account 1", async() => {
        //let instance = await token.deployed();
        let instance = this.myToken;
        let balanceOfAccount = await instance.balanceOf(initialHolder);
        await expect(instance.transfer(recipient, new BN(balanceOfAccount + 1))).to.eventually.be.rejected;
        return expect(instance.balanceOf(initialHolder)).to.eventually.be.a.bignumber.equal(balanceOfAccount);
    });
});