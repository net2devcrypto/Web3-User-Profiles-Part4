import { client, nftcontract, tokencontract, usercontract, userdbaddress, tokenaddress, rpc} from "./config";
import Web3Modal from 'web3modal';
import { ethers } from "ethers";
import NFTABI from './nftabi.json';
import USERABI from './userdb.json';
import TOKENABI from './erc20abi.json';
import { storeWallet, getPayInfo } from "./mongo";

export async function convertWeiToEth(tokenbalance) {
    const output = ethers.utils.formatEther(tokenbalance);
    return output;
}

export const pinJSONToIPFS = async(data) => {
    const added = await client.add(data)
    const path = added.path;
    return path;
}

export async function ethConnect() {
    const web3Modal = new Web3Modal()
    const connection = await web3Modal.connect()
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    const nftctr = new ethers.Contract(nftcontract, NFTABI, signer);
    const userctr = new ethers.Contract(userdbaddress, USERABI, signer);
    const tokenctr = new ethers.Contract(tokenaddress, TOKENABI, signer);
    const addressraw = signer.getAddress();
    const addressstr = (await addressraw).valueOf();
    return {addressstr, nftctr, userctr, tokenctr};
}

export async function checkNfts() {
    const walletdata = await ethConnect();
    const nftcont = walletdata.nftctr;
    const walletaddr = walletdata.addressstr;
    const checkbalance = Number((await nftcont.balanceOf(walletaddr)).valueOf());
    if (checkbalance > 0) {
        return checkbalance;
    }
    else {
        return 0;
    }
}

export async function signInUser(){
    const walletdata = await ethConnect();
    const nftcont = walletdata.nftctr;
    const walletaddr = walletdata.addressstr;
    const getNftId = await nftcont.walletOfOwner(walletaddr);
    return {getNftId, walletaddr};
}

export async function changePic(file) {
    const added = await client.add(file)
    const piccid = added.path;
    return piccid;
}

export async function addPicture(piccid) {
    const userwallet = await ethConnect()
    const walletaddr = userwallet.addressstr;
    const sendPicCid = await usercontract.updatePicture(piccid, walletaddr);
    const receipt = await sendPicCid.wait();
    if (receipt) {
        return 'Complete';
    }
}

export async function getAccount() {
    const userdata = await ethConnect();
    const userctr = userdata.userctr;
    const userwallet = userdata.addressstr;
    const tokenctr = userdata.tokenctr;
    const usercid = await userctr._account(userwallet);

    if(usercid[1] == '0x0000000000000000000000000000000000000000'){
        return 'no user';
    }
    else {
        const userurl = 'http://10.10.20.32:8080/ipfs/' + usercid[0];
        const piccid = await userctr._picture(userwallet);
        const picurl = 'http://10.10.20.32:8080/ipfs/' + piccid;
        const paywallet = usercid[2];
        const balance = await tokenctr.balanceOf(paywallet);
        return {userurl, picurl, balance};
    }
}

export async function addAccount(newcid) {
    const userdata = await ethConnect();
    const userctr = userdata.userctr;
    const addresstr = userdata.addressstr;
    const confirmAccount = await userctr.confirmUser();
    if(confirmAccount == '0x0000000000000000000000000000000000000000'){
        const walletid = ethers.Wallet.createRandom();
        const walletaddress = walletid.address.toString();
        const walletkey = walletid.privateKey.toString();
        await storeWallet(addresstr, walletaddress, walletkey);
        const userentry = await usercontract.createProfile(newcid, addresstr, walletaddress);
        const receipt = await userentry.wait();
        if(receipt) {
            const amount = '250000000000000000000';
            await tokencontract.mint(walletaddress, amount);
            return "complete";
        } else {
            return 'not successful';
        }}
        else {
            const updateuser = await userctr.updateProfile(newcid, addresstr);
            const receipt = await updateuser.wait();
            if (receipt) {
                return "complete";
            } else {
                return "not successful";
            }
        }
}

export async function migrateProfile(newwallet, nftid) {
    const userdata = await ethConnect();
    const nftctr = userdata.nftctr;
    const addresstr = userdata.addressstr;
    await nftctr.transferFrom(addresstr, newwallet, nftid);
    const userctr = userdata.userctr;
    await updateWallet(addresstr, newwallet);
    await userctr.migrateProfile(newwallet);
    return 'completed';
}


export async function transferTokens() {
    const userdata = await ethConnect();
    const addresstr = userdata.addressstr;
    const userctr = userdata.userctr;
    const usercid = await userctr._account(addresstr);
    const paywallet = usercid[2];
    const amount = (await tokencontract.balanceOf(paywallet)).toString();
    const privk = await getPayInfo(addresstr);
    const provider = new ethers.providers.JsonRpcProvider(rpc);
    const wallet = new ethers.Wallet(privk, provider);
    let tokenctr = new ethers.Contract(tokenaddress, TOKENABI, wallet);
    const transfer = await tokenctr.transfer(addresstr, amount);
    const receipt = await transfer.wait();
    if (receipt) {
        return 'completed';
    }
}



