const path = require("path");
require("dotenv").config({path:"./.env"});
const HDWalletProvider = require("@truffle/hdwallet-provider");
const AccountIndex = 0;

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  contracts_build_directory: path.join(__dirname, "client/src/contracts"),
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*" // Match any network id
    },
    ganache_local :{
      provider : function(){
        return new HDWalletProvider(process.env.Mnemonic,"http://127.0.0.1:7545" ,AccountIndex)
      },

      network_id :5777
    }
  } ,

  compilers: {
    solc: {
      version: "^0.6.0"
    }
  }
};
