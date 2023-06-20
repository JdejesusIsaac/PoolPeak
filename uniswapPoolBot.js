const { ethers } = require('ethers')
const factoryUniswap = require('./uniswapFactory.json')
const FactorySushi = require('./sushiSwapFactory.json')
require('dotenv').config()

const provider = new ethers.providers.JsonRpcProvider("https://eth-mainnet.g.alchemy.com/v2/96MrehoJu4frDMrrIsmILber-4Cht0-r")

const ARBprovider = new ethers.providers.JsonRpcProvider("https://arb-mainnet.g.alchemy.com/v2/aVHByRe2UXLqj7q-rmmAf3xBc2oW5AyU")

const PolygonProvier = new ethers.providers.JsonRpcProvider("https://polygon-rpc.com")

const OptimismProvider = new ethers.providers.JsonRpcProvider("https://opt-mainnet.g.alchemy.com/v2/I0Q4uXJAXj4u-tnlEnbIgyHzNXAAuwQ6")

const uniswapV3CoreAddress = "0x1F98431c8aD98523631AE4a59f267346ea31F984"

const sushiSwapV3CoreAddress = "0xC0AEe478e3658e2610c5F7A4A2E1777cE9e4f2Ac"

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

//main()
//Arbmain()
//Optmain()
//Polymain()
//sushiMain()