# Web3-User-Profiles-Part4
😎🚀 Final Full Web3 User Profile App that generates ERC Wallets and assigns the ERC Wallets to User Accounts. 


** THE FILES ATTACHED TO THIS REPO ARE FOR EDUCATIONAL PURPOSES ONLY **

** NOT FINANCIAL ADVISE **

** USE IT AT YOUR OWN RISK** **I'M NOT RESPONSIBLE FOR ANY USE, ISSUES ETC.. **


Click for video:

<a href="https://www.youtube.com/watch?v=D1wg0OldCKU" target="_blank"><img src="https://github.com/net2devcrypto/misc/blob/main/ytlogo2.png" width="150" height="40"></a> 


<h3>Steps to use this Repo</h3>

<h4>First: Create your NextJS App</h4>

```shell
npx create-next-app web3profiles
```

<h4>Download all files in the repo and drop to your new project folder. Replace existing if necessary.</h4>

1 - Add "Components folder from this repo to your project.

2 - Replace index.js with the one attached to this repo.

3 - Replace package.json with the one attached to this repo.

4 - Navigate to your project folder and execute:

```shell
npm i
```

5 - Deploy the Smart Contract located below to your favorite testnet:

https://raw.githubusercontent.com/net2devcrypto/Web3-User-Profiles-Part2/main/Web3-UserProfiles-UserDB-Smart-Contract.sol

6 - Grant role to an updater wallet in the smart contract, Refer to video 36:25 - 39:33

7 - Update the config.js file located in the components folder in your project:

```shell
export const client = ipfsHttpClient('http://IP-ADDRESS-OF-YOUR-IPFS-NODE:5001');
export const userdbaddress = '0xSMART-CONTRACT-ADDRESS-FROM-STEP-5';
const rpc = 'ADDRESS OF TESTNET DEPLOYED'; // refer to video 35:30 - 36:25
const updaterwallet = 'KEY-OBTAINED-FROM-STEP-6';
```
CTRL + S to save file.

8 - Run project:

```shell
npm run dev
```

Follow the video tutorial for explanations and guidance!
