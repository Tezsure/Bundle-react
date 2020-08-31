import smartpy as sp

class FA12(sp.Contract):
    def __init__(self, admin):
        self.init(paused = False, balances = sp.big_map(tvalue = sp.TRecord(approvals = sp.TMap(sp.TAddress, sp.TNat), balance = sp.TNat)), administrator = admin, totalSupply = 0)

    @sp.entry_point
    def transfer(self, params):
        sp.set_type(params, sp.TRecord(from_ = sp.TAddress, to_ = sp.TAddress, value = sp.TNat).layout(("from_ as from", ("to_ as to", "value"))))
        sp.verify((sp.sender == self.data.administrator) |
            (~self.data.paused &
                ((params.from_ == sp.sender) |
                 (self.data.balances[params.from_].approvals[sp.sender] >= params.value))))
        self.addAddressIfNecessary(params.to_)
        sp.verify(self.data.balances[params.from_].balance >= params.value)
        self.data.balances[params.from_].balance = sp.as_nat(self.data.balances[params.from_].balance - params.value)
        self.data.balances[params.to_].balance += params.value
        sp.if (params.from_ != sp.sender) & (self.data.administrator != sp.sender):
            self.data.balances[params.from_].approvals[sp.sender] = sp.as_nat(self.data.balances[params.from_].approvals[sp.sender] - params.value)

    @sp.entry_point
    def approve(self, params):
        sp.set_type(params, sp.TRecord(spender = sp.TAddress, value = sp.TNat).layout(("spender", "value")))
        sp.verify(~self.data.paused)
        alreadyApproved = self.data.balances[sp.sender].approvals.get(params.spender, 0)
        sp.verify((alreadyApproved == 0) | (params.value == 0), "UnsafeAllowanceChange")
        self.data.balances[sp.sender].approvals[params.spender] = params.value

    @sp.entry_point
    def setPause(self, params):
        sp.set_type(params, sp.TBool)
        sp.verify(sp.sender == self.data.administrator)
        self.data.paused = params

    @sp.entry_point
    def setAdministrator(self, params):
        sp.set_type(params, sp.TAddress)
        sp.verify(sp.sender == self.data.administrator)
        self.data.administrator = params

    @sp.entry_point
    def mint(self, params):
        sp.set_type(params, sp.TRecord(address = sp.TAddress, value = sp.TNat))
        sp.verify(sp.sender == self.data.administrator)
        self.addAddressIfNecessary(params.address)
        self.data.balances[params.address].balance += params.value
        self.data.totalSupply += params.value
        sp.transfer(
            sp.record(
                address = params.address, 
                value = params.value
            ), 
            sp.tez(0), 
            sp.contract(
                sp.TRecord(
                    address = sp.TAddress, 
                    value = sp.TNat
                ),
               self.data.administrator, 
                "addTokens"
            ).open_some()
        )

    @sp.entry_point
    def burn(self, params):
        sp.set_type(params, sp.TRecord(address = sp.TAddress, value = sp.TNat))
        sp.verify(sp.sender == self.data.administrator)
        sp.verify(self.data.balances[params.address].balance >= params.value)
        self.data.balances[params.address].balance = sp.as_nat(self.data.balances[params.address].balance - params.value)
        self.data.totalSupply = sp.as_nat(self.data.totalSupply - params.value)

    def addAddressIfNecessary(self, address):
        sp.if ~ self.data.balances.contains(address):
            self.data.balances[address] = sp.record(balance = 0, approvals = {})

    @sp.entry_point
    def getBalance(self, params):
        sp.transfer(self.data.balances[params.arg.owner].balance, sp.tez(0), sp.contract(sp.TNat, params.target).open_some())

    @sp.entry_point
    def getAllowance(self, params):
        sp.transfer(self.data.balances[params.arg.owner].approvals[params.arg.spender], sp.tez(0), sp.contract(sp.TNat, params.target).open_some())

    @sp.entry_point
    def getTotalSupply(self, params):
        sp.transfer(self.data.totalSupply, sp.tez(0), sp.contract(sp.TNat, params.target).open_some())

    @sp.entry_point
    def getAdministrator(self, params):
        sp.transfer(self.data.administrator, sp.tez(0), sp.contract(sp.TAddress, params.target).open_some())
        
        
class DAOContract(sp.Contract):
    def _init_(self,_Admin,members,amt):
        self.init (
            admin = _Admin,
            mincontribution = amt,
            tokencontract = sp.TAddress,
            totalmembers = members,
            allocprop = sp.big_map(tkey = sp.TNat, 
                                            tvalue = 
                                                sp.TRecord(
                                                    creator = sp.TAddress,
                                                    amount  = sp.TNat,
                                                    votesfor   = sp.TNat,
                                                    votesagainst = sp.TNat,
                                                    voteCount = sp.TNat,
                                                    allocexpiry  = sp.TTimestamp,
                                                    accepted = sp.TBool,
                                                    voteexpiry = sp.TTimestamp,
                                                    diff = sp.TInt
                                                    
                                                )
                                    ),
            membermap = sp.big_map(tkey = sp.TAddress,
                            tvalue = sp.TBool),                                
            addmemberdata = sp.big_map(tkey = sp.TNat,
                                   tvalue = sp.record(
                                       address = sp.TAddress,
                                       balance = sp.TNat,
                                       status = sp.TBool
                                       )
                                    ),
            addmemberdataid = sp.nat(0),
            membermapid = sp.nat(0),
            membercount = sp.nat(0),
            allocpropid = sp.nat(0),
            indispute = sp.TBool,
            finalproject = sp.TAddress,
            projectdata = sp.big_map(tkey = sp.TAddress,
                                    tvalue = sp.TRecord(
                                funded = sp.TBool,
                                votesfor   = sp.TNat,
                                votesagainst = sp.TNat,
                                voteCount = sp.TNat,
                                expiry  = sp.TTimestamp,
                                diff = sp.TInt)
                                ),
                holders = sp.big_map(  # Holder address to balance, approvals map
                tkey = sp.TAddress, 
                tvalue = sp.TRecord(
                    approvals = sp.TMap(sp.TAddress, sp.TNat),
                    balance = sp.TNat
                )
            ) 
                                
            
        )
        
        
    """@sp.entry_point
    def addTokens(self, params):
        sp.set_type(
            params,
            sp.TRecord(
                address = sp.TAddress,
                value = sp.TNat
            )
        ).layout(
            (
                "address",
                "value"
            )    
        )
        sp.verify(sp.sender == self.data.token.open_some())
        #sp.if ~self.data.holders.contains(params.address):
            #self.data.holders[params.address] = sp.record(approvals = {}, balance = 0)
        self.data.holders[params.address].balance += params.value"""
        
       
    def settokencontract(self,token):
        sp.set_type(token, sp.TAddress)
        sp.verify(sp.sender == self.data.admin)
        #sp.verify(~self.data.tokencontract.is_some())
        self.data.tokencontract = token
        
    @sp.entry_point    
    def intialize (self,token):
        
        sp.verify(sp.sender == self.data.admin)
        
        self.settokencontract(token)
        
        tokenDAO = sp.contract(sp.TRecord(address = sp.TAddress, value = sp.TNat),
                            self.data.tokencontract, entry_point = "mint").open_some()
        
        sp.transfer(sp.record(address = self.data.admin, value = 100), sp.tez(0), tokenDAO)                    
    
    def addMembers(self,params):
        sp.verify(sp.sender == self.data.admin)
        sp.verify(self.data.membercount <= totalmembers)
        memberaddress = self.data.addmemberdata[params.id].address
        fa = sp.contract(sp.TRecord(address = sp.TAddress, value = sp.TNat),
                            self.data.tokencontract, entry_point = "mint").open_some()
        sp.transfer(sp.record(address = memberaddress, value = 100), sp.tez(0), fa)
        self.data.membermap[params.id] = True
        self.data.membercount+=1
    
            
            
            
    def addrequest(self, params):
        sp.verify(params.amt == self.data.mincontribution)
        sp.send(self.data.admin, params.amt)
        addmemberdata[self.data.addmemberdataid] = params.address
        self.data.addmemberdataid += 1
        
    
    
    
       

    def allocationrequest(self,params):
        sp.verify(self.data.membermap[sp.sender] == True)
        self.data.allocprop[self.data.allocpropid] = sp.record(
            
                                                    creator = params.address,
                                                    amount  = params.amt,
                                                    votesfor   = sp.nat(0),
                                                    voteagainst = sp.nat(0),
                                                    voteCount = sp.nat(0),
                                                    allocexpiry  = sp.TTimestamp,
                                                    accepted = False,
                                                    voteexpiry = sp.TTimestamp,
                                                    diff = sp.nat(0)
                                                    )
                                                    
        self.data.allocpropid += 1
    
    
    
        
    """QV implementation first go"""
    def vote(self, params):
        sp.verify(self.data.membermap[sp.sender] == True)
        burn = sp.nat(0)
        propvote = self.data.allocprop[params.id]
        sp.verify(propvote.allocexpiry > sp.now)
        sp.verify(propvote.voteexpiry > sp.now)
        sp.if params.infavor == True:
            propvote.votesfor += params.value
            propvote.voteCount +=params.value
            burn = params.value * params.value
            burnfunc = sp.contract(sp.TRecord(address = sp.TAddress, value = sp.TNat),
                            self.data.tokencontract, entry_point = "burn").open_some()
            sp.transfer(sp.record(address = sp.sender, value = burn), sp.tez(0), burnfunc)
            self.data.holder[sp.sender].balance-=burn
        sp.if params.infavor == False:
            propvote.voteagainst += params.value
            propvote.voteCount +=params.value
            burn = params.value * params.value
            burnfunc = sp.contract(sp.TRecord(address = sp.TAddress, value = sp.TNat),
                            self.data.tokencontract, entry_point = "burn").open_some()
            sp.transfer(sp.record(address = sp.sender, value = burn), sp.tez(0), burnfunc)
            self.data.holder[sp.sender].balance-=burn
        
        propvote.diff = propvote.votesfor - prop.voteagainst
        
        
    def finaliseallocation(self,params):
        sp.verify(self.data.membermap[sp.sender] == True)
        sp.for x in self.data.allocpropid:
            k = sp.nat(0)
            sp.verify(self.data.allocprop[x].accepted == False)
            sp.verify(self.data.allocprop[x].allocexpiry > sp.now)
            sp.verify(self.data.allocprop[x].voteexpiry < sp.now)
            aldiff = self.data.allocprop[x].diff
            sp.if aldiff > k:
                k = aldiff
            
        self.data.allocprop[k].accepted = True
        
        
    def projectvote(self,params):
         projectd = projectdata[params.address]
         sp.verify(projectd.funded == False)
         #sp.verify(sp.now < projectd.expiry)
         sp.if params.favour == True:
             projectd.votesfor +=1
         sp.if params.against == False:
             projectd.votesagainst += 1
         projectd.diff = projectd.votesfor - projectd.votesagainst
    
     
    def finaliseproject(self,params):
        sp.verify(self.data.membermap[sp.sender] == True)
        self.data.finalproject = projectdata[params.address]
        sp.send(self.data.finalproject,)
        
    def dispute(self,params):
        sp.verify(self.data.indispute == False)
        sp.if projectdata[params.address].diff > self.data.finalproject:
            self.data.finalproject = projectdata[params.address]
        
    

class Viewer(sp.Contract):
    def __init__(self, t):
        self.init(last = sp.none)
        self.init_type(sp.TRecord(last = sp.TOption(t)))
    @sp.entry_point
    def target(self, params):
        self.data.last = sp.some(params)

if "templates" not in __name__:
    """@sp.add_test(name = "FA12")
    def test():

        scenario = sp.test_scenario()
    
        scenario.h1("FA1.2 template - Fungible assets")

        scenario.table_of_contents()

        # sp.test_account generates ED25519 key-pairs deterministically:
        admin = sp.test_account("Administrator")
        alice = sp.test_account("Alice")
        bob   = sp.test_account("Robert")

        # Let's display the accounts:
        scenario.h1("Accounts")
        scenario.show([admin, alice, bob])

        scenario.h1("Contract")
        c1 = FA12(admin.address)

        scenario.h1("Entry points")
        scenario += c1
        scenario.h2("Admin mints a few coins")
        scenario += c1.mint(address = alice.address, value = 12).run(sender = admin)
        scenario += c1.mint(address = alice.address, value = 3).run(sender = admin)
        scenario += c1.mint(address = alice.address, value = 3).run(sender = admin)
        scenario.h2("Alice transfers to Bob")
        scenario += c1.transfer(from_ = alice.address, to_ = bob.address, value = 4).run(sender = alice)
        scenario.verify(c1.data.balances[alice.address].balance == 14)
        scenario.h2("Bob tries to transfer from Alice but he doesn't have her approval")
        scenario += c1.transfer(from_ = alice.address, to_ = bob.address, value = 4).run(sender = bob, valid = False)
        scenario.h2("Alice approves Bob and Bob transfers")
        scenario += c1.approve(spender = bob.address, value = 5).run(sender = alice)
        scenario += c1.transfer(from_ = alice.address, to_ = bob.address, value = 4).run(sender = bob)
        scenario.h2("Bob tries to over-transfer from Alice")
        scenario += c1.transfer(from_ = alice.address, to_ = bob.address, value = 4).run(sender = bob, valid = False)
        scenario.h2("Admin burns Bob token")
        scenario += c1.burn(address = bob.address, value = 1).run(sender = admin)
        scenario.verify(c1.data.balances[alice.address].balance == 10)
        scenario.h2("Alice tries to burn Bob token")
        scenario += c1.burn(address = bob.address, value = 1).run(sender = alice, valid = False)
        scenario.h2("Admin pauses the contract and Alice cannot transfer anymore")
        scenario += c1.setPause(True).run(sender = admin)
        scenario += c1.transfer(from_ = alice.address, to_ = bob.address, value = 4).run(sender = alice, valid = False)
        scenario.verify(c1.data.balances[alice.address].balance == 10)
        scenario.h2("Admin transfers while on pause")
        scenario += c1.transfer(from_ = alice.address, to_ = bob.address, value = 1).run(sender = admin)
        scenario.h2("Admin unpauses the contract and transferts are allowed")
        scenario += c1.setPause(False).run(sender = admin)
        scenario.verify(c1.data.balances[alice.address].balance == 9)
        scenario += c1.transfer(from_ = alice.address, to_ = bob.address, value = 1).run(sender = alice)

        scenario.verify(c1.data.totalSupply == 17)
        scenario.verify(c1.data.balances[alice.address].balance == 8)
        scenario.verify(c1.data.balances[bob.address].balance == 9)

        scenario.h1("Views")
        scenario.h2("Balance")
        view_balance = Viewer(sp.TNat)
        scenario += view_balance
        scenario += c1.getBalance(arg = sp.record(owner = alice.address), target = view_balance.address)
        scenario.verify_equal(view_balance.data.last, sp.some(8))

        scenario.h2("Administrator")
        view_administrator = Viewer(sp.TAddress)
        scenario += view_administrator
        scenario += c1.getAdministrator(target = view_administrator.address)
        scenario.verify_equal(view_administrator.data.last, sp.some(admin.address))

        scenario.h2("Total Supply")
        view_totalSupply = Viewer(sp.TNat)
        scenario += view_totalSupply
        scenario += c1.getTotalSupply(target = view_totalSupply.address)
        scenario.verify_equal(view_totalSuppy.data.last, sp.some(17))

        scenario.h2("Allowance")
        view_allowance = Viewer(sp.TNat)
        scenario += view_allowance
        scenario += c1.getAllowance(arg = sp.record(owner = alice.address, spender = bob.address), target = view_allowance.address)
        scenario.verify_equal(view_allowance.data.last, sp.some(1))
       """ 
        
        
        
    @sp.add_test(name = "DAOContract")
    def test():    
        # DAO Contract testing#
        
        scenario = sp.test_scenario()
        scenario.h1("Accounts")
        #scenarionew.show([newadmin, newalice, newbob])
        
        admin = sp.test_account("Administrator")
        alice = sp.test_account("Alice")
        bob   = sp.test_account("Robert")
        
        scenario.show([admin, alice, bob])
        
        daoContract = DAOContract(_Admin=admin.address, members=5, amt=10)
        fa12 = FA12(daoContract.address)
        scenario.show([daoContract.address])
        scenario.show([fa12.address])
        scenario +=daoContract
        
        
        
        
        
        
        
        
        
        
        
        
        
    