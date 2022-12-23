require("dotenv").config();
const express = require(`express`);
const app = express();
const port = process.env.PORT || 3001;

const {
    Connection,
    LAMPORTS_PER_SOL,
    clusterApiUrl,
    PublicKey,
    Keypair,
} = require ('@solana/web3.js')

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

app.get(`api-devnet.magiceden.dev/v2/wallets/:wallet_address/tokens?offset=0&limit=100&listStatus=both`, async (req, res) => {
    res.send({
        inventory: await getNFT(req.params.address)})
})


/// CONNECTION TO SERVER MAINNET   
const connection = new Connection(clusterApiUrl("mainnet-beta"), "confirmed");

async function getNFT(wallet_address){
    try {
        return (await)
    }
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