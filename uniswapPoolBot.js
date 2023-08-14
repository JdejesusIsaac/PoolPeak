const { ethers, Wallet } = require('ethers')
const MevShareClient = require('@flashbots/mev-share-client');
const factoryUniswap = require('./uniswapFactory.json')
const FactorySushi = require('./sushiSwapFactory.json')
const ERC20ABI = require('./erc20.json')
require('dotenv').config()



//const FB_REPUTATION_PRIVATE_KEY = 
const provider = new ethers.providers.JsonRpcProvider("https://eth-mainnet.g.alchemy.com/v2/96MrehoJu4frDMrrIsmILber-4Cht0-r")

//const authSigner = new Wallet(FB_REPUTATION_PRIVATE_KEY, provider)

const ARBprovider = new ethers.providers.JsonRpcProvider("")

const PolygonProvier = new ethers.providers.JsonRpcProvider("https://polygon-rpc.com")

<<<<<<< HEAD
const OptimismProvider = new ethers.providers.JsonRpcProvider("https://mainnet.optimism.io")
=======
const OptimismProvider = new ethers.providers.JsonRpcProvider("")
>>>>>>> 64779e82887c5744c3f9411c05ffc3aed3d501a1

const uniswapV3CoreAddress = "0x1F98431c8aD98523631AE4a59f267346ea31F984"

const sushiSwapV3CoreAddress = "0xC0AEe478e3658e2610c5F7A4A2E1777cE9e4f2Ac"

<<<<<<< HEAD
const baseProvider = new ethers.providers.JsonRpcProvider("https://mainnet.base.org")

//const mevshare = MevShareClient.useEthereumMainnet(authSigner)



async function mevStart() {
  
  console.log("mev-share auth address: " + authSigner.address);
  //console.log("executor address: " + executorWallet.address);

  // bot only executes one trade, so get the nonce now
  //const nonce = await executorWallet.getNonce("latest");

  mevshare.on('transaction', async (pendingTx) => {
    // callback to handle pending transaction
    console.log(pendingTx);
  });
}




=======
// query uniswap mempool for pending transaction
>>>>>>> 64779e82887c5744c3f9411c05ffc3aed3d501a1

async function UniMemPool() {
  var url = "wss://falling-summer-aura.discover.quiknode.pro/d6a78f45b6b10351b3ce4578d18604f2294a6022/"
  var uniswapRouter2 = '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D'
  const provider = new ethers.providers.WebSocketProvider(url)
  
  

  provider.on("pending", async (tx) => {
      const txInfo = await provider.getTransaction(tx)
      try {
        if(txInfo.to == uniswapRouter2){
          console.log(txInfo.from) 
          
        }
        


      } catch (error) {
        console.log("no data to show")
        
      }
      
      
      
      //console.log(txInfo);
    });

}

async function main() {
    
    /// get data from 'PoolCreated' event!
    const uniswapV3CoreContract = new ethers.Contract(
      uniswapV3CoreAddress,
      factoryUniswap, // ABI of the Uniswap V3 core contract
      provider
    )

    ///

    const currentBlockNumber = await provider.getBlockNumber()
    const fromBlock = currentBlockNumber - 10000 // get events from the last 5000 blocks
    const toBlock = "latest"

    const newPoolEvents = await uniswapV3CoreContract.queryFilter(
      "PoolCreated",
      fromBlock,
      toBlock
    )

    const newPools = newPoolEvents.map(event => event.args)

    console.log(newPools)

    

    
}

async function baseUni() {
    
  /// get data from 'PoolCreated' event!
  const uniswapV3CoreContract = new ethers.Contract(
    uniswapV3CoreAddress,
    factoryUniswap, // ABI of the Uniswap V3 core contract
    baseProvider
  )

  ///

  const currentBlockNumber = await baseProvider.getBlockNumber()
  const fromBlock = currentBlockNumber - 10 // get events from the last 5000 blocks
  const toBlock = "latest"

  const newPoolEvents = await uniswapV3CoreContract.queryFilter(
    "PoolCreated",
    fromBlock,
    toBlock
  )

  const newPools = newPoolEvents.map(event => event.args)

  console.log(newPools)

  

  
}





  


async function Arbmain() {
    
    /// get data from 'PoolCreated' event!
    const uniswapV3CoreContract = new ethers.Contract(
      uniswapV3CoreAddress,
      factoryUniswap, // ABI of the Uniswap V3 core contract
      ARBprovider
    )
  
    ///
  
    const currentBlockNumber = await provider.getBlockNumber()
    const fromBlock = currentBlockNumber - 10000 // get events from the last 5000 blocks
    const toBlock = "latest"
  
    const newPoolEvents = await uniswapV3CoreContract.queryFilter(
      "PoolCreated",
      fromBlock,
      toBlock
    )
  
    const newPools = newPoolEvents.map(event => event.args)
  
    console.log(newPools)
  
    
  
    
  }
  
  
  /// //query poolcreated event of Uniswap V3 core contract Polygon
  async function Polymain() {
      
    /// get data from 'PoolCreated' event!
    const uniswapV3CoreContract = new ethers.Contract(
      uniswapV3CoreAddress,
      factoryUniswap, // ABI of the Uniswap V3 core contract
      PolygonProvier
    )
  
    ///
  
    const currentBlockNumber = await PolygonProvier.getBlockNumber()
    const fromBlock = currentBlockNumber - 10000 // get events from the last 5000 blocks
    const toBlock = "latest"
  
    const newPoolEvents = await uniswapV3CoreContract.queryFilter(
      "PoolCreated",
      fromBlock,
      toBlock
    )
  
    const newPools = newPoolEvents.map(event => event.args)
  
    console.log(newPools)
  
    
  
    
  }
  
  //query poolcreated event of Uniswap V3 core contract optimism
  
  async function Optmain() {
      
    /// get data from 'PoolCreated' event!
    const uniswapV3CoreContract = new ethers.Contract(
      uniswapV3CoreAddress,
      factoryUniswap, // ABI of the Uniswap V3 core contract
      OptimismProvider
    )
  
    ///
  
    const currentBlockNumber = await provider.getBlockNumber()
    const fromBlock = currentBlockNumber - 10000 // get events from the last 5000 blocks
    const toBlock = "latest"
  
    const newPoolEvents = await uniswapV3CoreContract.queryFilter(
      "PoolCreated",
      fromBlock,
      toBlock
    )
  
    const newPools = newPoolEvents.map(event => event.args)
  
    console.log(newPools)
  
    
  
    
  }
  
  
  
  async function sushiMain() {
      
    /// get PoolCreated data 
    const sushiSwapV3CoreContract = new ethers.Contract(
      sushiSwapV3CoreAddress,
      FactorySushi, // ABI of the Uniswap V3 core contract
      provider
    )
  
    ///
  
    const currentBlockNumber = await provider.getBlockNumber()
    const fromBlock = currentBlockNumber - 15000 // get events from the last 5000 blocks
    const toBlock = "latest"
  
    const newPoolEvents = await sushiSwapV3CoreContract.queryFilter(
      "PairCreated ",
      fromBlock,
      toBlock
    )
  
    const newPools = newPoolEvents.map(event => event.args)
  
    console.log(newPools)
  
    
  
    
  }
<<<<<<< HEAD

  //mevStart()
  //baseUni()

  //UniMemPool()
  
 main()
//getPoolDetails(poolAddress)
=======
UniMemPool()
//main()
>>>>>>> 64779e82887c5744c3f9411c05ffc3aed3d501a1
//Arbmain()
//Optmain()
//Polymain()
//sushiMain()
