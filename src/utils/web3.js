// // import Web3 from 'web3';
// import contractAbi from '../utils/abi/pizza-nft.json'
// import { toast } from 'react-toastify';
// import { ENV } from '../config/config';
// import axios from 'axios';
// import { Form } from 'react-bootstrap';

// const {bitzNpizzaContractAddress, web3ProviderAddress, appName} = ENV
// let Contract = require("web3-eth-contract");
// Contract.setProvider(web3ProviderAddress)

// export const connectToWallet = async () =>{
//     let web3;
//     try {
//         if(window.ethereum){
//             web3 = new Web3(window.ethereum)
//             await window.ethereum.enable()
//         }else if (window.web3){
//             web3 = new Web3(window.web3.currentProvider || "http://127.0.0.1:7545")
//         }
//         const accounts = await web3.eth.getAccounts();
//         return accounts[0]
//     } catch (error) {
//         console.log("Error: ", error)
//     }
// }

// export const signRequest = async ()=> {
//     if(window.ethereum) {
//         const web3 = new Web3(Web3.givenProvider);
//         let accounts = await web3.eth.getAccounts();
//         let address = accounts[0];
//         let signature = await handleSignMessage(address);
//         return signature;
//     }
//     else {
//         alert("Please install metamask to connect to the Marketplace");
//     }
// }

// const handleSignMessage = (address) => {
//     return new Promise((resolve, reject) =>{
//         try {
//             const web3 = new Web3(Web3.givenProvider);
//             web3.eth.personal.sign(
//                 web3.utils.fromUtf8(`${appName} uses this cryptographic signature in place of a password, verifying that you are the owner of this address.`),
//                 address,
//                 (err, signature) => {
//                     if (err) return reject(err);
//                     return resolve(signature);
//                 }
//             )
//         }
//         catch (e) {
//             console.log(e);
//         }
//     });
// };

// export const getWeb3 = async () => {
//     if(window.ethereum) {
//         const web3 = new Web3(Web3.givenProvider);
//         return web3;
//     }else {
//         return false;
//     }
// }

// export const mintPizzaIngredients = async (uri, name, qty, price) => {
//     const web3 = await getWeb3();
//     if(!web3) {
//         toast.error("No web3 instance found.");
//         return false;
//     }
//     try{
//         let connectedAddress = await connectToWallet();
//         let pizzaNftContract = new Contract(contractAbi, bitzNpizzaContractAddress);
//         const txCount = await web3.eth.getTransactionCount(connectedAddress);
//         const myNewData = await pizzaNftContract.methods._mintPizzaIngretients(uri, name, qty, price).encodeABI()
        
//         const gasLimit = await web3.eth.estimateGas({
//             from: connectedAddress,
//             nonce: txCount,
//             to: bitzNpizzaContractAddress,
//             data: myNewData
//         })

//         const gas2 = await web3.eth.getGasPrice()
//         const transactionParameters = {
//             nonce: web3.utils.toHex(txCount),
//             gasPrice: web3.utils.toHex(gas2),
//             gasLimit: web3.utils.toHex(gasLimit),
//             to: bitzNpizzaContractAddress,
//             from: connectedAddress,
//             data: myNewData
//         }

//         // As with any RPC call, it may throw an error
//         const txHash = await window.ethereum.request({
//             method: 'eth_sendTransaction',
//             params: [transactionParameters],
//         });
//         if(txHash){
//             toast.success(`Success! Ingridient purchased successfully!`)
//             return true;
//         }
//     } catch (e) {
//         toast.error(e.message);
//         return false;
//     }
// }


// export const mintBakedPizza = async (_bakedPizzaTokenURI, base, sauce, cheese, meats, toppings, price) => {
//     const web3 = await getWeb3();
//     if(!web3) {
//         toast.error("No web3 instance found.");
//         return false;
//     }
//     try{
//         let connectedAddress = await connectToWallet();
//         let pizzaNftContract = new Contract(contractAbi, bitzNpizzaContractAddress);
//         const txCount = await web3.eth.getTransactionCount(connectedAddress);
//         const myNewData = await pizzaNftContract.methods._mintBakedPizza(_bakedPizzaTokenURI, base, sauce, cheese, meats, toppings, price).encodeABI()
        
//         const gasLimit = await web3.eth.estimateGas({
//             from: connectedAddress,
//             nonce: txCount,
//             to: bitzNpizzaContractAddress,
//             data: myNewData
//         })

//         const gas2 = await web3.eth.getGasPrice()
//         const transactionParameters = {
//             nonce: web3.utils.toHex(txCount),
//             gasPrice: web3.utils.toHex(gas2),
//             gasLimit: web3.utils.toHex(gasLimit),
//             to: bitzNpizzaContractAddress,
//             from: connectedAddress,
//             data: myNewData
//         }

//         // As with any RPC call, it may throw an error
//         const txHash = await window.ethereum.request({
//             method: 'eth_sendTransaction',
//             params: [transactionParameters],
//         });
//         if(txHash){
//             toast.success(`Success! Pizza Created successfully!`)
//             return true;
//         }
//     } catch (e) {
//         toast.error(e.message);
//         return false;
//     }
// }


// // upsert smart contract ingredient for pizza
// export const _upsertIngredient = async (ingredientTokenURI, price, artistAddress, id, _ingredientId , categoryType, type, name, maxMints) => {
//     const web3 = await getWeb3();
//     if(!web3) {
//         toast.error("No web3 instance found.");
//         return false;
//     }
//     try{
//         let connectedAddress = await connectToWallet();
//         let pizzaNftContract = new Contract(contractAbi, bitzNpizzaContractAddress);
//         const txCount = await web3.eth.getTransactionCount(connectedAddress);
//         let myNewData = null

//         let weiPrice = web3.utils.toWei(`${price}`, 'ether');
//         let priceHex = web3.utils.toHex(weiPrice)
//         // console.log(ingredientTokenURI, priceHex, artistAddress, categoryType, maxMints, name);
//         if(type === 1){
//             myNewData = await pizzaNftContract.methods.createIngredient(ingredientTokenURI, priceHex, artistAddress, categoryType, maxMints, name).encodeABI()
//         }else if(type === 2){
//             myNewData = await pizzaNftContract.methods.editIngredient(_ingredientId, ingredientTokenURI, priceHex, artistAddress, categoryType, maxMints, name).encodeABI()
//         }else {}
//         // console.log(myNewData)
        
//         // const gasLimit = await web3.eth.estimateGas({
//         //     from: connectedAddress,
//         //     nonce: txCount,
//         //     to: bitzNpizzaContractAddress,
//         //     data: myNewData
//         // })

//         const gas2 = await web3.eth.getGasPrice()
//         const transactionParameters = {
//             nonce: web3.utils.toHex(txCount),
//             gasPrice: web3.utils.toHex(gas2),
//             // gasLimit: web3.utils.toHex(gasLimit),
//             to: bitzNpizzaContractAddress,
//             from: connectedAddress,
//             data: myNewData
//         }

//         // As with any RPC call, it may throw an error
//         const txHash = await window.ethereum.request({
//             method: 'eth_sendTransaction',
//             params: [transactionParameters],
//         });
//         if(txHash){
//             if(type === 2){
//                 toast.success("Ingredient Updated Successfully.")
//                 return
//             }else if (type === 1){
//                 // toast.success("Ingredient Created Successfully.")
//                 const loaderId = toast.loading("Transaction in progress...")
//                 checkConfirmation(txHash, id, loaderId);
//             }else {
//                 return
//             }
//         }
        
//     } catch (e) {
//         toast.error(e.message);
//         return false;
//     }
// }


// // createIngredeint transation confirmation 
// const checkConfirmation = async (txHash, id, loaderId) => {
//     const web3 = await getWeb3();
//     if(!web3) {
//         toast.error("No web3 instance found.");
//         return false;
//     }
    
//     web3.eth.getTransactionReceipt(`${txHash}`, async (err, res) => {
//         // console.log("res before ==> ", res)
//     if (res) {
//         // let connectedAddress = await connectToWallet();
//         // let pizzaNftContract = new Contract(contractAbi, bitzNpizzaContractAddress);
//         // const txCount = await web3.eth.getTransactionCount(connectedAddress);
//         // const mintedIds = await pizzaNftContract.getPastEvents("createIngredientEvent", {
//         // toBlock: res.blockNumber,
//         // });
//         ("res ==> ", res)
//         const mintedId = await web3.utils.toNumber(res.logs[0].topics[1]);
//         ("mintedId ==> ", mintedId)
//         if (mintedId) {

//             const ingId = mintedId
    
//             let formData = new FormData();  
//             formData.append('_id', id);
//             formData.append('_ingredientId', ingId);

//             try {
//                 fetch( `${ENV.url}ingredient/edit`, {
//                     method: 'PUT',
//                     headers: {
//                         'Authorization': ENV.Authorization,
//                         'x-auth-token': ENV.x_auth_token
//                     },
//                     body: formData
//                 }).then(res => res.json()).then(data => {
//                     if (data.success) {
//                         // console.log(data.message)
//                     } else {
//                         // console.log(data.message)
//                     }
//                     toast.update(loaderId, { render: "Transaction Done, Successfully!", type: "success", isLoading: false, autoClose: 3000 });
//                 }).catch(error => {
//                     if (error.response && error.response.data) {
//                         const { data } = error.response
//                         if (data.message)
//                             console.log(data.message)
//                     }
//                     toast.update(loaderId, { render: "Something Gone Wrong!", type: "error", isLoading: false, autoClose: 3000 });
//                 })
//                 return 
//             } catch (error) {
//                 console.log("ERROR = ", error?.message)
//             return
//             }            
//         }
//     } else {
        
//         setTimeout(() => {
//             checkConfirmation(txHash, id, loaderId);
//         },100)
//     }
//     });
// };

// // randome time setting
// export const setRandomBakeDateTime = async (startTime, endTime) => {
//     const web3 = await getWeb3();
//     if(!web3) {
//         toast.error("No web3 instance found.");
//         return false;
//     }
//     try{
//         let connectedAddress = await connectToWallet();
//         let pizzaNftContract = new Contract(contractAbi, bitzNpizzaContractAddress);
//         const txCount = await web3.eth.getTransactionCount(connectedAddress);
//         const myNewData = await pizzaNftContract.methods.setRandomBakeDateTime(startTime, endTime).encodeABI()
        
//         const gasLimit = await web3.eth.estimateGas({
//             from: connectedAddress,
//             nonce: txCount,
//             to: bitzNpizzaContractAddress,
//             data: myNewData
//         })

//         const gas2 = await web3.eth.getGasPrice()
//         const transactionParameters = {
//             nonce: web3.utils.toHex(txCount),
//             gasPrice: web3.utils.toHex(gas2),
//             gasLimit: web3.utils.toHex(gasLimit),
//             to: bitzNpizzaContractAddress,
//             from: connectedAddress,
//             data: myNewData
//         }

//         // As with any RPC call, it may throw an error
//         const txHash = await window.ethereum.request({
//             method: 'eth_sendTransaction',
//             params: [transactionParameters],
//         });
//         if(txHash){
//             toast.success(`Random Timming has been set, successfully!`)
//             return true;
//         }
//     } catch (e) {
//         toast.error(e.message);
//         return false;
//     }
// }