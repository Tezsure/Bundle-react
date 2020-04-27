var key_name = "test_key1";

var keystore = require(`../../keystore/${key_name}`);
const contract = require("../ConseilJsUtils/invokeContract");

contract.callContract(keystore, "KT1LRre6w4EgkCRLwUugQLEdRGPvJdTmx3Ae", 10000, 100000, 1000, 100000, undefined, "(Left 6)");
console.log("\n Wait for response !\n");