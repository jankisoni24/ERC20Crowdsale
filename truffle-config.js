const path = require("path");
require('dotenv').config({path: './.env'});
const HDwalletProvider = require('@truffle/hdwallet-provider');
const MetamaskAccountIndex = 0;

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  contracts_build_directory: path.join(__dirname, "client/src/contracts"),
  networks: {
    //connect to ganache
    development: {
      port: 7545,
      network_id: 5777,
      host: "127.0.0.1"
    },
    //connect to default truffle network
    // develop: {
    //   port: 8545
    // }
    ganache_local: {
      provider: function() {
        return new HDwalletProvider(process.env.MNEMONIC, "http://127.0.0.1:7545", MetamaskAccountIndex)
      },
      network_id : 5777
    },
    ropsten_infura: {
      provider: function() {
        return new HDwalletProvider(process.env.MNEMONIC, "https://ropsten.infura.io/v3/dc559134229d4e82a56e827cc3caec2b", MetamaskAccountIndex)
      },
      network_id : 3
    },
    gorli_infura: {
      provider: function() {
        return new HDwalletProvider(process.env.MNEMONIC, "https://goerli.infura.io/v3/dc559134229d4e82a56e827cc3caec2b", MetamaskAccountIndex)
      },
      network_id : 5
    },
  },
  compilers: {
    solc: {
      version: "^0.8.13"
    }
  }
};
