var fs = require('fs');
const config = require('../../config.json')

require.extensions['.tz'] = function (module, filename) {
  module.exports = fs.readFileSync(filename, 'utf8');
};

const conseiljs = require("conseiljs");
conseiljs.setLogLevel("debug");
const contract_code = require(`../../contract_build/${config.compile_config.michelson_code}`);

async function interrogateContract() {
    const entryPoints = await conseiljs.TezosContractIntrospector.generateEntryPointsFromCode(contract_code);
    console.log(" \n\n Entry Points :")
    entryPoints.forEach(p => {

        console.log(` Name : ${p.name} \n Parameters : ${p.parameters.map(params => {
            console.log(params)
        })} \n Structure : ${p.structure} \n Smaple Invocation : ${p.generateSampleInvocation()}`);

        console.log("\n----------------\n")
    });
}

interrogateContract();