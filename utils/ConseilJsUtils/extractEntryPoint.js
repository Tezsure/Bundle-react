var fs = require('fs');
const config = require('../../config.json')

require.extensions['.tz'] = function (module, filename) {
  module.exports = fs.readFileSync(filename, 'utf8');
};

const conseiljs = require("conseiljs");
conseiljs.setLogLevel("debug");
const contract_code = require(`../../contract_build/${config.deploy_config.contract_code}`);

async function interrogateContract() {
    const entryPoints = await conseiljs.TezosContractIntrospector.generateEntryPointsFromCode(contract_code);
    console.log("\n ---------------")
    console.log(" Entry Points :")
    console.log(" ---------------\n")

    entryPoints.forEach(p => {

        console.log(` Name : ${p.name} \n ${p.parameters.map(params => {
             console.log(" Params : ",params)
        })}Structure : ${p.structure} \n Sample Invocation : ${p.generateSampleInvocation()}`);

        console.log("\n----------------\n")
    });
}

interrogateContract();