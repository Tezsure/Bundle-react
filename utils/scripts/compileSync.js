const fs = require('fs');
const config = require("../../config.json")

var file_content = fs.readFileSync("./utils/scripts/runCode.sh");
file_content = file_content.toString();
const contract_name = config.compile_config.contract_name;

fs.writeFileSync("./utils/scripts/runCode.sh", `./utils/SmartPyBasic/SmartPy.sh run ./contract/${contract_name}`);
console.log("Contract Synced !");

console.log("To compile your SmartPy code : npm run compile");