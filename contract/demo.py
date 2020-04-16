# Your Contract goes here 

import smartpy as sp
class MyContract(sp.Contract):
    def __init__(self, myParameter1, myParameter2):
        self.init(myParameter1 = myParameter1,
                  myParameter2 = myParameter2)
    @sp.entry_point
    def myEntryPoint(self, params):
        sp.verify(self.data.myParameter1 <= 123)
        self.data.myParameter1 += params
# We evaluate a contract with parameters.
contract = MyContract(12, 13)


# We need to export the compile the contract.
# It can be done with the following.
import smartpybasic as spb
spb.compileContract(contract,targetBaseFilename = "./contract_build/Contract")
print("Contract compiled in ./contract_build/ContractCode.tz")