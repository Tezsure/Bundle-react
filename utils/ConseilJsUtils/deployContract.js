var fs = require('fs');
const config = require('../../config.json')

require.extensions['.tz'] = function (module, filename) {
  module.exports = fs.readFileSync(filename, 'utf8');
};

const conseiljs = require("conseiljs");
const contract_code = require(`../../contract_build/${config.deploy_config.contract_code}`);
const contract_storage = require(`../../contract_build/${config.deploy_config.contract_storage}`);
const tezosNode = config.deploy_config.node;
const keystore = require(`./../../keystore/${config.deploy_config.key}`)

console.log("---------------------------")

console.log("Contract Code : \n\n", contract_code);

console.log("---------------------------")

console.log("Contract Storage : ", contract_storage);

console.log("---------------------------")

async function deployContract() {
  const contract = contract_code;
  const storage = contract_storage;
  const amount = config.deploy_config.amount;
  const delegate_address = config.deploy_config.delegate_address.length != 0 ? config.deploy_config.delegate_address : undefined;
  const fee = config.deploy_config.fee;
  const derivation_path = config.deploy_config.derivation_path;
  const storage_limit = config.deploy_config.storage_limit;
  const gas_limit = config.deploy_config.gas_limit;


  console.log("\nDeploying Contract .... ");
  const result = await conseiljs.TezosNodeWriter.sendContractOriginationOperation(
    tezosNode,
    keystore,
    amount,
    delegate_address,
    fee,
    derivation_path,
    storage_limit,
    gas_limit,
    contract,
    storage,
    conseiljs.TezosParameterFormat.Michelson
  );
  

  console.log(`Injected operation ! \n Contract Deployed with group ID : ${result.operationGroupID}`);

  console.log(`Contract Address : ${result.results.contents[0].metadata.operation_result.originated_contracts[0]} \n`)
}

deployContract();
