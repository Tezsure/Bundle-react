const fs = require('fs');
const config = require("../../config.json")

var file_content = fs.readFileSync("./utils/scripts/runCode.sh");
file_content = file_content.toString();
const contract_name = config.compile_config.contract_name;
const test_contract = config.test_config.contract_name;

fs.writeFileSync("./utils/scripts/runCode.sh", `./utils/SmartPyBasic/SmartPy.sh run ./contract/${contract_name}`);
fs.writeFileSync("./utils/scripts/checkScenario.sh", `  echo "---------------------";
echo " Tests ";
echo "---------------------";
./utils/SmartPyBasic/SmartPy.sh test ./contract/${test_contract} ./test-build; 
cat ./test-build/test.output;
echo "---------------------";
`)
console.log("Contract Synced !");

console.log("To compile your SmartPy code : npm run compile\n");