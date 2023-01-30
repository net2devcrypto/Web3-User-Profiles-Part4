import axios from 'axios';

const mongokey = 'A6waMQ6UiKv95TjvK8TcrlTkQZ6IuaDl9yQfWRZq1ujoAYSOTzZoyj5fpkidCU8I'
const mongourl = 'https://data.mongodb-api.com/app/data-oumzz/endpoint/data/v1/action/'
const mongoheader =  {
    "Content-Type": "application/json",
    "api-key": mongokey,
  }

export async function storeWallet(addresstr, walletaddress, walletkey) {
    await axios.post(mongourl + "insertOne",
    {
        collection: "profiles",
        database: "n2D-database",
        dataSource: "Cluster0",
        document: {
            wallet: addresstr,
            paywallet: walletaddress,
            private: walletkey,
        }
    },
    mongoheader
    ).catch((error) => {
        console.log('Call failed:' + error)
  })
}

export async function updateWallet(addresstr, newwallet) {
    await axios.post(mongourl + "updateOne",
    {
        collection: "profiles",
        database: "n2D-database",
        dataSource: "Cluster0",
        filter: {
            wallet: addresstr,
        },
        update: {
            wallet: newwallet,
        }
    },
    mongoheader
    ).catch((error) => {
        console.log('Call failed:' + error)
  })
}

export async function getPayInfo(addresstr) {
    const getInfo = await axios.post(mongourl + "findOne",
    {
        collection: "profiles",
        database: "n2D-database",
        dataSource: "Cluster0",
        filter: {
            wallet: addresstr,
        }
    },
    mongoheader
    ).catch((error) => {
        console.log('Call failed:' + error)
  })
  return getInfo.data.document.private;
}