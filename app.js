require("dotenv").config();
const express = require(`express`);
const app = express();
const port = process.env.PORT || 3001;

const {
    Connection,
    LAMPORTS_PER_SOL,
    clusterApiUrl,
    PublicKey,
} = require ('@solana/web3.js')