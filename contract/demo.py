# Your Contract goes here 

import smartpy as sp

class StoreValue(sp.Contract):
    def __init__(self, value):
        self.init(storedValue = value)

    @sp.entry_point
    def replace(self, params):
        self.data.storedValue = params.value

    @sp.entry_point
    def double(self, params):
        self.data.storedValue *= 2

    @sp.entry_point
    def divide(self, params):
        sp.verify(params.divisor > 5)
        self.data.storedValue /= params.divisor
# We evaluate a contract with parameters.
contract = StoreValue(12)


# We need to export the compile the contract.
# It can be done with the following.
import smartpybasic as spb
spb.compileContract(contract,targetBaseFilename = "./contract_build/Contract")
print("Contract compiled in ./contract_build/ContractCode.tz")