# Bundle React

<img src="bundle.png" height="100" >

Compile SmartPy code locally , Deploy in the Testnet / Local tezos node & interact with your Dapps

  
## Setup & Run Steps :

  

1.  `npm install` it will install all your dependencies

  

  

2.  `npm run client-install` it will install all the client dependencies i.e in React

  

  

### Now you are ready to write your SmatPy Smart Contract

  

This is how a Smart Contract in SmartPy looks like :

  
```python
import smartpy as sp

class MyContract(sp.Contract):
	def __init__(self, myParameter1, myParameter2):
		self.init(myParameter1 = myParameter1,myParameter2 = myParameter2)
  
	@sp.entry_point
	def myEntryPoint(self, params):
		sp.verify(self.data.myParameter1 <= 123)
		self.data.myParameter1 += params

contract = MyContract(12, 13)
```

**Note:**  *You don't need to explicitly add the initial storage somewhere just initialize the contract class like a normal python class.*

  

This part should be intact as it helps to build your contract :

  
```python
import smartpybasic as spb
spb.compileContract(contract,targetBaseFilename = "./contract_build/Contract")
print("Contract compiled in ./contract_build/ContractCode.tz")
```
  

Once done writing your Smart Contract inside ./contract, You have to configure the compile the config.

  

  

## Its time to compile & Deploy

  

3.  `npm run sync` this is a syncing command. Whenever  the compile_config is changed in config.json this command must be executed from the terminal. This command helps the bundle to reconfigure the compilation parameters according to the changes you have made.

  

4.  `npm run compile` will build the contracts locally inside the folder ./contract_build. 
### Editing compile_config :

You have to mention the contract name "demo.py" inside the contract name section.

Note : You have to be specific about file name, otherwise it will throw an error. We have provided an initial config which compiles the ./contract/demo.py

  
```json
"compile_config" : {
	"contract_name": "demo.py"
}
```
  

  

Your code will get compiled and stored in ./contract_build folder and the two files you need to focus on is the *Code.tz & *Storage.tz

 ####  contract_build folder will contain the following files :
 - ContractCode.tz : Michelson Code of your Smart Contract.
 - ContractCode.tz.json : Micheline Code of your Smart Contract.
 - ContractExpression.smlse : an internal expression between SmartPy and SmartML, kept for the record but not directly useful.
 - ContractStorage.tz : Micheline representation of the Storage.
 - ConractTypes.tz : It specifies the types of the params used in the contract.

  

5.  `npm run deploy` will deploy your contract with the params respect to your config.json

  

  

### Configuring Deployment Parameters :

  

Inside the deploy_config section

  

- First is the Tezos node you want to use , It can be local or any remote node

  

- Next You can change the contractCode and ContractStorage with the ones you want to deploy

  

- Set the parameters like amount, gas_limit, derivation_path etc

  
  
  

These are the pre-defined config for deployment:

```json

"deploy_config" : {
	"node" : "https://testnet.tezster.tech",
	"contract_code" : "ContractCode.tz",
	"contract_storage" : "ContractStorage.tz",
	"key" : "test_key1",
	"amount" : 100,
	"delegate_address" : "",
	"fee" : 100000,
	"derivation_path" : "",
	"storage_limit" : 10000,
	"gas_limit" : 100000
}

```

A Tezos **node** allows you deploy contract, make transaction etc Other Tezos Node

-   [https://tezos-dev.cryptonomic-infra.tech](https://tezos-dev.cryptonomic-infra.tech/)
-   [https://carthagenet.SmartPy.io](https://carthagenet.smartpy.io/)
-   [http://carthagenet.tezos.cryptium.ch:8732](http://carthagenet.tezos.cryptium.ch:8732/)

Conseil node is used to access conseil services and you need a API Key for that

-   [https://conseil-dev.cryptonomic-infra.tech:443/](https://conseil-dev.cryptonomic-infra.tech/)

Use  [https://nautilus.cloud](https://nautilus.cloud/)  to access API KEY for Conseil node. Use  [https://faucet.tzalpha.net/](https://faucet.tzalpha.net/)  to obtain keys for any testing. You can use  [http://smartpy.io/dev/faucetImporter.html](http://smartpy.io/dev/faucetImporter.html)  to activate the keys obtained from faucet.  

**Contract Specifications:** 
 - **contract_code** : It should refer to the Michelson Contract  code you want to deploy.
 - **contract_storage** : refers to the Michelson representation of the initial storage used for deployment

**Bundle is provided with 6 Keys in the Keystore :** 
- Both test_key1.js & test_key2.js are activated in the Alphanet . One can use that or import your own from the faucet and Activate & Reveal using the ConseilJsUtils.

- 4 bootstrap acoounts are provided which can be directly used with our Tezster Suite which provides a local development Blockchain with unique ease of interaction with the Tezos node !

  

To deploy your contracts in the local tezos blockchain you first need to Setup [Tezster-CLI](https://github.com/Tezsure/Tezster-CLI/) / [Tezster-GUI](https://github.com/Tezsure/Tezster-GUI)

  

Once done just change the deploy_config.node : "http://localhost:18731"

  

***Note** : *By Default the tezos-node runs in 18731 for Tezster.**

**Remaining keys are the contract deployment prams which inchudes :**
- **amount** you want to send to the contract ( in micro Tez ).
- **delegate_address** to whom you want to delegate your contract balance. ( tz1 address )
- **fee** to the baker ( in micro Tez )
- **storage_limit** for the contract ( limits the storage used by the contract )
- **gas_limit** to restrict the actions / operactions to be carried out while deployment.

**And then Run the above command ! Your contract will be Deployed**

  

  

6.  `npm run dapp ` It will spin-up the Dapp front-end and you are ready to use it. This Bundle is packed up with simple create-react-app. Once you run the command the front-end dev server will start up and you will be redirected to your home page in your default browser.

  

  

Package comes with React Ready front-end , and you are ready to use. Use ConseilJs library to interct with the contract.

  

Build some Awesome Dapps !

## Future Development
We'll be adding some new set of features like **local testing environment** to provide more flexibitity and usability to this Bundle & More bundles are coming soon , stay tuned!

## License

Licensed under the MIT. See the [LICENSE](https://github.com/Tezsure/Bundle-react/blob/master/LICENSE) file for details.s
