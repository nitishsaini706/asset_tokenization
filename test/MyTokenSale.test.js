const Token = artifacts.require("MyToken");
const MyTokenSale = artifacts.require("MyTokenSale");
const KycContract = artifacts.require("KycContract");

const chai = require("./setupchai.js");
const BN = web3.utils.BN;
const expect = chai.expect ;

require("dotenv").config({path:"../.env"});

contract ("TokenSale" , async (accounts) => {
    
    const [deployerAccount , recipient , anotherAccount]= accounts ;
    it("should not have any tokens in my deployed account " , async () => {
        let instance = await Token.deployed();
        return expect(instance.balanceOf(deployerAccount)).to.eventually.be.a.bignumber.equal(new BN(0));
    });

    it('all tokens should be in the TokenSale start contract by default' , async() => {
        let instance = await Token.deployed();
        let balanceOfTokenSaleSmartContract = await instance.balanceOf(TokenSale.address);
        let totalSupply = await instance.totalSupply();
        expect(balanceOfTokenSaleSmartContract).to.be.a.bignumber.equal(totalSupply);
    });

    it('should be possbile to buy tokens ', async ()=> {
        let instance = await Token.deployed();
        let tokensaleInstance = await TokenSale.deployed();
        let kycInstance = await KycContract.deployed();
        let balanceBefore = await tokensaleInstance.balanceOf(deployerAccount);
        await kycInstance.setKycCompleted(deployerAccount,{from:deployerAccount});
        expect(tokensaleInstance).sendTransactions({from :deployerAccount, vallue:web3.utils.towei("1" , "wei")}).to.be.fulfilled;
        balanceBefore = balanceBefore.add(new BN(1));
        return expect(tokensaleInstance.balanceOf(deployerAccount)).to.eventually.be.a.bignumber.equal(balanceBefore);
    });
});
