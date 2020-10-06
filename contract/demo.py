import smartpy as sp

# A typical SmartPy program has the following form:

# A class of contracts
class MyContract(sp.Contract):
    def __init__(self, myParameter1, myParameter3):
        self.init(myParameter1 = myParameter1,
                  myParameter3 = myParameter3)

    # An entry point, i.e., a message receiver
    # (contracts react to messages)
    @sp.entry_point
    def myEntryPoint(self, params):
        sp.verify(self.data.myParameter1 <= 123)
        self.data.myParameter1 += params

# Tests
@sp.add_test(name = "Welcome Test 1")
def test():
    # We define a test scenario, together with some outputs and checks
    scenario = sp.test_scenario()

    # We first define a contract and add it to the scenario
    c1 = MyContract(12, 123)
    scenario += c1

    # And call some of its entry points
    scenario += c1.myEntryPoint(12)
    scenario += c1.myEntryPoint(13)
    scenario += c1.myEntryPoint(14)
    scenario += c1.myEntryPoint(50)
    scenario += c1.myEntryPoint(50)
    scenario += c1.myEntryPoint(50).run(valid = False) # this is expected to fail

    # Finally, we check its final storage
    scenario.verify(c1.data.myParameter1 == 151)

    # We can define another contract using the current state of c1
    c2 = MyContract(1, c1.data.myParameter1)
    scenario += c2
    scenario.verify(c2.data.myParameter2 == 151)