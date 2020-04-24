var fs = require("fs");
const config = require("../../config.json");

require.extensions[".tz"] = function (module, filename) {
  module.exports = fs.readFileSync(filename, "utf8");
};

const conseiljs = require("conseiljs");
conseiljs.setLogLevel("debug");
const tezosNode = config.contract_interaction_config.node;

module.exports.callContract = async function (
  keystore,
  contractAddress,
  amount,
  fee,
  storage_limit,
  gas_limit,
  entry_point,
  parameters
) {
  var derivation_path = derivation_path ? derivation_path : "";

  console.log("\nCalling Contract .... ");
  const result = await conseiljs.TezosNodeWriter.sendContractInvocationOperation(
    tezosNode,
    keystore,
    contractAddress,
    amount,
    fee,
    derivation_path,
    storage_limit,
    gas_limit,
    entry_point,
    parameters,
    conseiljs.TezosParameterFormat.Michelson
  );

  console.log(
    `Injected operation ! \n Invocation Group ID : ${result.operationGroupID}`
  );
}
