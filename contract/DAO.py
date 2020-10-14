import smartpy as sp
        
class Project_token(sp.Contract):
    def __init__(self, admin):
        self.init(paused = False, ledger = sp.big_map(tvalue = sp.TRecord(approvals = sp.TMap(sp.TAddress, sp.TNat), balance = sp.TNat)), administrator = admin, totalSupply = 0)

    @sp.entry_point
    def transfer(self, params):
        sp.set_type(params, sp.TRecord(from_ = sp.TAddress, to_ = sp.TAddress, value = sp.TNat).layout(("from_ as from", ("to_ as to", "value"))))
        sp.verify((sp.sender == self.data.administrator) |
            (~self.data.paused &
                ((params.from_ == sp.sender) |
                 (self.data.ledger[params.from_].approvals[sp.sender] >= params.value))))
        self.addAddressIfNecessary(params.to_)
        sp.verify(self.data.ledger[params.from_].balance >= params.value)
        self.data.ledger[params.from_].balance = sp.as_nat(self.data.ledger[params.from_].balance - params.value)
        self.data.ledger[params.to_].balance += params.value
        sp.if (params.from_ != sp.sender) & (self.data.administrator != sp.sender):
            self.data.ledger[params.from_].approvals[sp.sender] = sp.as_nat(self.data.ledger[params.from_].approvals[sp.sender] - params.value)

    @sp.entry_point
    def approve(self, params):
        sp.set_type(params, sp.TRecord(spender = sp.TAddress, value = sp.TNat).layout(("spender", "value")))
        sp.verify(~self.data.paused)
        alreadyApproved = self.data.ledger[sp.sender].approvals.get(params.spender, 0)
        sp.verify((alreadyApproved == 0) | (params.value == 0), "UnsafeAllowanceChange")
        self.data.ledger[sp.sender].approvals[params.spender] = params.value

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
        self.addAddressIfNecessary(params.address)
        self.data.ledger[params.address].balance += params.value
        self.data.totalSupply += params.value

    @sp.entry_point
    def burn(self, params):
        sp.set_type(params, sp.TRecord(address = sp.TAddress, value = sp.TNat))
        sp.verify(sp.sender == self.data.administrator)
        sp.verify(self.data.ledger[params.address].balance >= params.value)
        self.data.ledger[params.address].balance = sp.as_nat(self.data.ledger[params.address].balance - params.value)
        self.data.totalSupply = sp.as_nat(self.data.totalSupply - params.value)

    def addAddressIfNecessary(self, address):
        sp.if ~ self.data.ledger.contains(address):
            self.data.ledger[address] = sp.record(balance = 0, approvals = {})

    @sp.view(sp.TNat)
    def getBalance(self, params):
        sp.result(self.data.ledger[params].balance)

    @sp.view(sp.TNat)
    def getAllowance(self, params):
        sp.result(self.data.ledger[params.owner].approvals[params.spender])

    @sp.view(sp.TNat)
    def getTotalSupply(self, params):
        sp.set_type(params, sp.TUnit)
        sp.result(self.data.totalSupply)

    @sp.view(sp.TAddress)
    def getAdministrator(self, params):
        sp.set_type(params, sp.TUnit)
        sp.result(self.data.administrator)        
        
        
class Tijoricontract(sp.Contract):
    def __init__(self,tijoriadmin):
        self.init(
            admin=tijoriadmin,
            projecttoken=sp.address("KT1GuH9jvwcWjkx2M8RzUQw2JgQgUPnkdEUh"),
            DAO_id=0,
            project_id=0,
            proposal_id=0,
            addDAOdata = sp.big_map( 
                tkey = sp.TInt, 
                tvalue = sp.TRecord(
                    serialno=sp.TInt,
                    admin=sp.TAddress,
                    strength= sp.TInt,
                    maxtoken=sp.TInt,
                    min_contribution=sp.TMutez,
                    winproposalid=sp.TInt,
                    winprojectid=sp.TInt,
                    maxmember=sp.TNat,
                    currentcount=sp.TInt,
                    disputevotecount=sp.TNat,
                    proposedproposalid=sp.TInt,
                    proposedprojectid=sp.TInt,
                    disputestatus=sp.TInt,
                    votestart=sp.TTimestamp,
                    voteend=sp.TTimestamp,
                    disputeend=sp.TTimestamp,
                    rewardstatus=sp.TInt,
                    contri= sp.TNat
                    
                )
            ),
            addmemberdata = sp.big_map( 
                tkey = sp.TAddress, 
                tvalue = sp.TRecord(
                    tokenbalance=sp.TInt,
                    contribution=sp.TMutez,
                    DAO= sp.TInt
                )
            ),
            addprojectdata = sp.big_map( 
                tkey = sp.TInt, 
                tvalue = sp.TRecord(
                    serialno=sp.TInt,
                    proowner=sp.TAddress,
                    vote = sp.TInt,
                    DAO = sp.TInt,
                    cat=sp.TInt
                )
            ),
            addpropoasldata = sp.big_map(
                tkey = sp.TInt, 
                tvalue = sp.TRecord(
                    proposer=sp.TAddress,
                    cat=sp.TInt,
                    serialno=sp.TInt,
                    vote = sp.TInt,
                    DAO = sp.TInt
                )
            )
            )
            
        
    @sp.entry_point
    def addDAO(self,stre,mincontribution,mtoken,vstart,vend,disend,cont):
        
        sp.set_type(mincontribution, sp.TMutez)
        mincontribution=mincontribution
        sp.verify(sp.now<disend)
        sp.if self.data.addmemberdata.contains(sp.sender)==False:
            self.data.DAO_id +=1
            keyindex=self.data.DAO_id
            sp.verify(sp.amount == mincontribution)
            self.data.addDAOdata[keyindex] = sp.record(admin=sp.sender,strength=stre,min_contribution=mincontribution,serialno=keyindex,winproposalid=-1,winprojectid=-1,maxtoken=mtoken,proposedproposalid=-1,proposedprojectid=-1,disputevotecount=0,maxmember=1,disputestatus=0,rewardstatus=0,votestart=vstart,voteend=vend,disputeend=disend,currentcount=1,contri=cont)
            self.data.addmemberdata[sp.sender]=sp.record(DAO=keyindex,contribution=sp.amount,tokenbalance=mtoken)
            
            
  
        
    @sp.entry_point
    def addMember(self,dao):
        cstr=self.data.addDAOdata[dao].currentcount
        mstr=self.data.addDAOdata[dao].strength
        disend=self.data.addDAOdata[dao].disputeend
        mem_address = sp.sender
        sp.verify(cstr<=mstr)
        sp.verify(sp.now<disend)
        sp.if self.data.addmemberdata.contains(mem_address)==False:
            sp.if self.data.addDAOdata.contains(dao):
                sp.verify(sp.amount == self.data.addDAOdata[dao].min_contribution)
                self.data.addmemberdata[mem_address]=sp.record(DAO=dao,contribution=sp.amount,tokenbalance=self.data.addDAOdata[dao].maxtoken)
                self.data.addDAOdata[dao].maxmember+=1
                self.data.addDAOdata[dao].currentcount+=1
    
    @sp.entry_point
    def addProject(self,dao,adminaddress,cat):
        sp.set_type(adminaddress, sp.TAddress)
        adminaddress=adminaddress
        sp.if self.data.addDAOdata.contains(dao):
            self.data.project_id +=1
            keyindex=self.data.project_id
            self.data.addprojectdata[keyindex] = sp.record(proowner=adminaddress,DAO=dao,serialno=keyindex,vote=0,cat=cat)
        
            
        
    @sp.entry_point
    def addProposal(self,cat,dao):
        mem_address = sp.sender
        sp.if self.data.addDAOdata.contains(dao):
            sp.if self.data.addmemberdata.contains(mem_address):
                self.data.proposal_id+=1
                keyindex=self.data.proposal_id
                self.data.addpropoasldata[keyindex]=sp.record(proposer=mem_address,cat=cat,serialno=keyindex,vote=0,DAO=dao)
                
                
    @sp.entry_point
    def voteproject(self,castedvotes,projectid):
        did=self.data.addprojectdata[projectid].DAO
        vstart=self.data.addDAOdata[did].votestart
        vend=self.data.addDAOdata[did].voteend
        mem_address = sp.sender
        sp.verify(sp.now>vstart)
        sp.verify(sp.now<vend)
        sp.if self.data.addmemberdata.contains(mem_address):
            sp.verify(self.data.addmemberdata[mem_address].DAO== self.data.addprojectdata[projectid].DAO)
            burntokens=castedvotes*castedvotes
            sp.verify(burntokens <= self.data.addmemberdata[mem_address].tokenbalance)
            self.data.addprojectdata[projectid].vote+=castedvotes
            self.data.addmemberdata[mem_address].tokenbalance-=burntokens
            
            
            
    @sp.entry_point
    def voteproposal(self,castedvotes,proposalid):
        did=self.data.addpropoasldata[proposalid].DAO
        vstart=self.data.addDAOdata[did].votestart
        vend=self.data.addDAOdata[did].voteend
        mem_address = sp.sender
        sp.verify(sp.now>vstart)
        sp.verify(sp.now<vend)
        sp.if self.data.addmemberdata.contains(mem_address):
            sp.verify(self.data.addmemberdata[mem_address].DAO== self.data.addpropoasldata[proposalid].DAO)
            burntokens=castedvotes*castedvotes
            sp.verify(burntokens <= self.data.addmemberdata[mem_address].tokenbalance)
            self.data.addpropoasldata[proposalid].vote+=castedvotes
            self.data.addmemberdata[mem_address].tokenbalance-=burntokens    
            
            
            
    
    @sp.entry_point
    def proposeresult(self,projectid,proposalid):
        mem_address=sp.sender
        daoid=self.data.addprojectdata[projectid].DAO
        sp.if self.data.addmemberdata.contains(mem_address):
           sp.verify(mem_address== self.data.addDAOdata[daoid].admin)
           sp.verify(self.data.addprojectdata[projectid].DAO== self.data.addpropoasldata[proposalid].DAO)
           self.data.addDAOdata[daoid].proposedprojectid=projectid
           self.data.addDAOdata[daoid].proposedproposalid=proposalid
           
           
           
    @sp.entry_point
    def disputeresult(self,dao,vote):
        vend=self.data.addDAOdata[dao].voteend
        disend=self.data.addDAOdata[dao].disputeend
        sp.verify(sp.now>vend)
        sp.verify(sp.now<disend)
        mem_address=sp.sender
        sp.if self.data.addmemberdata.contains(mem_address):
            self.data.addDAOdata[dao].disputevotecount+=vote
           
    
    @sp.entry_point
    def finaliseresult(self,projectid,proposalid):
        mem_address=sp.sender
        daoid=self.data.addprojectdata[projectid].DAO
        sp.if self.data.addmemberdata.contains(mem_address):
           sp.verify(mem_address== self.data.addDAOdata[daoid].admin)
           sp.verify(self.data.addprojectdata[projectid].DAO== self.data.addpropoasldata[proposalid].DAO)
           sp.verify(self.data.addDAOdata[daoid].disputevotecount<=(self.data.addDAOdata[daoid].maxmember)//2)
           self.data.addDAOdata[daoid].winprojectid=self.data.addDAOdata[daoid].proposedprojectid
           self.data.addDAOdata[daoid].winproposalid=self.data.addDAOdata[daoid].proposedproposalid
           self.data.addDAOdata[daoid].disputestatus=1
        
        
    @sp.entry_point
    def rewardfunds(self,daoid):
        sp.verify(self.data.addDAOdata[daoid].disputestatus==1)
        x=self.data.addDAOdata[daoid].winprojectid
        y=self.data.addDAOdata[daoid].winproposalid
        sendadd=self.data.addprojectdata[x].proowner
        count=self.data.addDAOdata[daoid].maxmember
        contribution=self.data.addDAOdata[daoid].min_contribution
        sp.for x in sp.range(0,count):
            sendfunds=contribution+contribution
        sp.send(sendadd,sendfunds)
        self.data.addDAOdata[daoid].rewardstatus=1
        
        
    @sp.entry_point
    def regaintez(self,daoid):
        mem_address=sp.sender
        sp.verify(self.data.addDAOdata[daoid].disputestatus==0)
        sp.verify(self.data.addmemberdata[mem_address].DAO== daoid)
        sendfunds=self.data.addmemberdata[mem_address].contribution
        sp.send(mem_address,sendfunds)
        del self.data.addmemberdata[mem_address]
        
        
    @sp.entry_point
    def gaintoken(self,daoid):
        mem_address=sp.sender
        sp.verify(self.data.addDAOdata[daoid].disputestatus==1)
        sp.verify(self.data.addDAOdata[daoid].rewardstatus==1)
        sp.verify(self.data.addmemberdata[mem_address].DAO== daoid)
        sp.transfer(
                sp.record(
                    address= sp.sender,
                    value = self.data.addDAOdata[daoid].contri
                ), 
                sp.tez(0),
                sp.contract(
                    sp.TRecord(
                      address= sp.TAddress,
                      value = sp.TNat
                    ), 
                    self.data.projecttoken, 
                    "mint"
                ).open_some()
            )
        del self.data.addmemberdata[mem_address]
        
    
        
        
if "templates" not in __name__:
    @sp.add_test(name="Test_contract")
    def contracttesting():
        scenario=sp.test_scenario()
        admin = sp.test_account('Administrator')
        dhruv = sp.test_account('Dhruv')
        aryan = sp.test_account('Aryan')
        devansh = sp.test_account('Devansh')  
        komal = sp.test_account('Komal')
        shikhar = sp.test_account('Shikhar')
        amit=sp.test_account('Amit')
        jaanvi=sp.test_account('Jaanvi')
        swapnanil=sp.test_account('Swapnanil')
        debashish=sp.test_account('Debashish')
        project1=sp.test_account('Project1')
        project2=sp.test_account('Project2')
        project3=sp.test_account('Project3')
        project4=sp.test_account('Project4')
        project5=sp.test_account('Project5')
        ptokenc=Project_token(admin.address)
        tijoric=Tijoricontract(admin.address)
        scenario.h1("TIJORI Contract testing")
        scenario.h2("list of contracts")
        scenario.h3("Tijori contract")
        scenario.show([tijoric.address])
        scenario.h3("FA1.2 token(Project Token)")
        scenario.show([ptokenc.address])
        scenario.h2("Project Token Contract")
        scenario +=ptokenc
        scenario.h3("Token Initialized")
        scenario.h2("Tojori Contract")
        scenario += tijoric
        scenario.h3("Tijori Initialized")
        scenario.h2("Add DAO")
        scenario+=tijoric.addDAO(stre=2,mincontribution=sp.mutez(100),mtoken=100,vstart=sp.timestamp(10000),vend=sp.timestamp(11000),disend=sp.timestamp(13000),cont=100).run(sender=komal,amount=sp.mutez(100))
        scenario.h3("Add DAO successful")
        scenario.h2("Add Member")
        scenario+=tijoric.addMember(1).run(sender=aryan,amount=sp.mutez(10),valid=False)
        scenario+=tijoric.addMember(1).run(sender=komal,amount=sp.mutez(100))
        scenario+=tijoric.addMember(1).run(sender=komal,amount=sp.mutez(100))
        scenario.h3("Add member succesful")
        scenario.h2("Add project")
        scenario+=tijoric.addProject(dao=1,adminaddress=devansh.address,cat=1).run(sender=devansh)
        scenario.h3("Add project successful")
        scenario.h2("Add proposal")
        scenario+=tijoric.addProposal(dao=1,cat=5).run(sender=komal)
        scenario.h3('Add proposal sucessful')
        scenario.h2("Project voting")
        scenario+=tijoric.voteproject(castedvotes=5,projectid=1).run(sender=komal,now =10500)
        scenario.h3("Project voting successful")
        scenario.h2("Proposal voting")
        scenario+=tijoric.voteproposal(castedvotes=8,proposalid=1).run(sender=komal)
        scenario.h3("Proposal voting successful")
        scenario.h2("Propose results")
        scenario+=tijoric.proposeresult(projectid=1,proposalid=1).run(sender=komal)
        scenario.h3("Propose result succesful")
        scenario.h2("dispute results")
        scenario+=tijoric.disputeresult(dao=1,vote=1).run(sender=komal,now=11500)
        scenario.h3("dispute resut succesful")
        scenario.h2("Finalise results")
        scenario+=tijoric.finaliseresult(projectid=1,proposalid=1).run(sender=komal,valid=False)
        scenario.h3("Finalise result succesful")
        scenario.h2("Reward funds")
        scenario+=tijoric.rewardfunds(1).run(sender=komal,valid=False)
        scenario.h3("reward funds successful")
        scenario.h2("Regain Tezos")
        scenario+=tijoric.regaintez(1).run(sender=komal)
        scenario.h3("Regain Tezos successfull")
        scenario.h2("gaintoken")
        scenario+=tijoric.gaintoken(1).run(sender=komal,valid=False)
        scenario.h3("gain token successful")
