const config = require("../../config.json");
const tezosNode = config.contract_interaction_config.node;
const conseiljs = require('conseiljs');

console.log("\n Wait for response !\n");

async function getContractStorage(contract) {

    try {
        let storage = await conseiljs.TezosNodeReader.getContractStorage(tezosNode, "KT1Bad45CdfvjRkM7UHcvJWciBSzs9G7i5Jn");
        console.log(JSON.stringify(storage));
    }
    catch(error) {
        console.error(error);
    }
}
 getContractStorage()