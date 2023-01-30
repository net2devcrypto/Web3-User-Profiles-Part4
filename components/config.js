import { ethers } from "ethers";
import { create as ipfsHttpClient } from "ipfs-http-client";
import userDbAbi from '../components/userdb.json';
import tokenAbi from '../components/erc20abi.json'

export const client = ipfsHttpClient('http://IPFS-NODE-IP-ADDRESS:5001');
export const userdbaddress = 'REPLACE WITH USER DB SMART CONTRACT ADDRESS';
export const rpc = 'https://rpc.ankr.com/polygon_mumbai';
const updaterwallet = 'ADD YOUR UPDATER WALLET PRIVATE KEY';
const provider = new ethers.providers.JsonRpcProvider(rpc);
const updater = new ethers.Wallet(updaterwallet, provider);
export const usercontract = new ethers.Contract(userdbaddress, userDbAbi, updater);
export const nftcontract = "REPLACE WITH NFT COLLECTION SMART CONTRACT ADDRESS";
export const tokenaddress = "REPLACE WITH ERC-20 TOKEN SMART CONTRACT ADDRESS";
export const tokencontract = new ethers.Contract(tokenaddress, tokenAbi, updater);

