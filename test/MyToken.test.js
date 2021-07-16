const Token = artifacts.require("MyToken");

const chai = require("./setupchai.js");
const BN = web3.utils.BN;
const expect = chai.expect ;

require("dotenv").config({path:"../.env"});

contract ("Token Test" , async (accounts) => {
    
    const [deployerAccount , recipient , anotherAccount]= accounts ;
    //before each sabse pehle instance deploy karega idhar he and not from migrations files 
    
    beforeEach(async() => {
        this.myToken = await Token.new(process.env.INITIAL_TOKENS); 
    })

    it("all tokens should be in my account" , async ()=>{

        let instance = this.myToken;
        let totalSupply = await instance.totalSupply();

        //let balance = await instance.balanceof(accounts[0]);
        //assert.equal(balance.valueOf() , initialSupply.valueOf() , "the balancenwas not the same" );

        expect(awaitinstance.balanceOf(deployerAccount)).to.eventually.be.a.bignumber.equal(totalSupply);
    })

    it("is possible to send tokens between accounts " , async ()=> {
        const sendTokens=1;
        let instance = this.myToken;
        let totalSupply = await instance.totalSupply();

        expect(instance.balanceOf(deployerAccount)).to.eventually.be.a.bignumber.equal(totalSupply);
        expect(instance.transfer(recipient , sendToken)).to.eventually.be.fullfulled;
        expect(instance.balanceOf(deployerAccount)).to.a.bignumber.equal(totalSupply.sub(new BN(sendTokens)));
        return expect(instance.balanceOf(recipient)).to.eventually.be.bignumber.equal(new BN(sendTokens));

    });

    it("is not possible to send more tokens than available intotal" , async () => {
        let instance = this.myToken;
        let totalSupply = await instance.totalSupply();

        expect(instance.transfer(recipient ,new BN(balanceOfDeployer+1))).to.eventually.be.rejected;

        return expect(instance.balanceOf(deployerAccount)).to.eventually.be.a.bignumber.equal(balanceOfDeployer);
    });
    // in many it statments we need to return the last expect 
}) 