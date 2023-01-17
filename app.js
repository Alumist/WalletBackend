require("dotenv").config();
const express = require(`express`);
const app = express();
const port = process.env.PORT || 3001;
const axios = require('axios');

const {
    Connection,
    LAMPORTS_PER_SOL,
    clusterApiUrl,
    PublicKey,
    Keypair,
} = require ('@solana/web3.js')

///CODE BELLOW IS NEEDED FOR AXIOS/GET REQUEST
app.use(function (req, res, next) {
    res.setHeader(`Access-Control-Allow-Origin`, `*`);
    res.setHeader(
      `Access-Control-Allow-Methods`,
      `GET, POST, OPTIONS, PUT, PATCH, DELETE`
    );
    res.setHeader(
      `Access-Control-Allow-Headers`,
      `X-Requested-With,content-type`
    );
    res.setHeader(`Access-Control-Allow-Credentials`, true);
    next();
  });
  ///^^^^
  
  app.listen(process.env.PORT || 3000, function(){
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
  });

app.get(`/`, (req,res) => {
    res.send('mom said get yo money up.')
})


app.get(`/getWalletBalance/:address`, async (req,res) => {
    res.send ({
        balance: await getWalletBalance(req.params.address)
    })
})

/// CONNECTION TO SERVER MAINNET   
const connection = new Connection(clusterApiUrl("mainnet-beta"), "confirmed");

app.get(`/nfts_of_addy/:addy`, async (req, res) => {
    res.send({
        nfts: await getNftsOfAddy(req.params.addy)
    });
  })
  
  async function getNftsOfAddy(addy) {
    let nfts = (await axios.get(`https://api-mainnet.magiceden.dev/v2/wallets/${addy}/tokens?offset=0&limit=100&listStatus=both`)).data;
    
   
      return nfts.map(nft => nft.name);    
    
    // for(var i; i < nfts.length(); i++)
    // return nfts[i].name; 

  }

/// getting api from magiceden
    //app.get(api-devnet.magiceden.dev/v2/wallets/:wallet_address/tokens?offset=0&limit=100&listStatus=both

    
///




async function getWalletBalance(address){
    try {
        return (await connection.getBalance(new PublicKey(address)))/LAMPORTS_PER_SOL
    } catch (error) {
        return 0;
    }
};