import { ethers } from "ethers";
import { create as ipfsHttpClient } from "ipfs-http-client";
import userDbAbi from '../components/userdb.json';
import tokenAbi from '../components/erc20abi.json'

export const client = ipfsHttpClient('http://10.10.20.32:5001');
export const userdbaddress = '0xA146575395D7f685CC096A227f895137A1517FFE';
export const rpc = 'https://rpc.ankr.com/polygon_mumbai';
const updaterwallet = '89b0896f8b0fea1cec2d7dfd0204ba63e896d4b58581d299aea477dc3f2b2a35';
const provider = new ethers.providers.JsonRpcProvider(rpc);
const updater = new ethers.Wallet(updaterwallet, provider);
export const usercontract = new ethers.Contract(userdbaddress, userDbAbi, updater);
export const nftcontract = "0x8E9Ed84B3983945E9040DEAc43AB0BAC9975c916";
export const tokenaddress = "0xAA5a7371881Bf96FcC1A7b2D3Fc8E201B7C62710";
export const tokencontract = new ethers.Contract(tokenaddress, tokenAbi, updater);

