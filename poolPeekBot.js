const { ethers, Wallet } = require('ethers');
const tweet = require('./tweet');  // Import the tweet module

const factoryUniswap = require('./uniswapFactory.json');

require('dotenv').config();

const provider = new ethers.providers.JsonRpcProvider("https://eth-mainnet.g.alchemy.com/v2/96MrehoJu4frDMrrIsmILber-4Cht0-r");
const PolygonProvier = new ethers.providers.JsonRpcProvider("https://polygon-rpc.com");

const uniswapV3CoreAddress = "0x1F98431c8aD98523631AE4a59f267346ea31F984"

async function main() {
    const uniswapV3CoreContract = new ethers.Contract(
      uniswapV3CoreAddress,
      factoryUniswap,
      provider
    );

    const currentBlockNumber = await provider.getBlockNumber();
    const fromBlock = currentBlockNumber - 10000;
    const toBlock = "latest";

    const newPoolEvents = await uniswapV3CoreContract.queryFilter(
      "PoolCreated",
      fromBlock,
      toBlock
    );

    const newPools = newPoolEvents.map(event => event.args);

    // Tweet about the new pools
    newPools.forEach(pool => {
        const tweetText = `New Pool Created on Ethereum Mainnet! 🚀
Token0: ${pool.token0}
Token1: ${pool.token1}
Fee: ${pool.fee}
Pool Address: ${pool.pool}
Explore more on Uniswap!`;

        tweet.tweet(tweetText);
    });
}

async function Polymain() {
    const uniswapV3CoreContract = new ethers.Contract(
      uniswapV3CoreAddress,
      factoryUniswap,
      PolygonProvier
    );

    const currentBlockNumber = await PolygonProvier.getBlockNumber();
    const fromBlock = currentBlockNumber - 10000;
    const toBlock = "latest";

    const newPoolEvents = await uniswapV3CoreContract.queryFilter(
      "PoolCreated",
      fromBlock,
      toBlock
    );

    const newPools = newPoolEvents.map(event => event.args);

    // Tweet about the new pools on Polygon
    newPools.forEach(pool => {
        const tweetText = `New Pool Created on Polygon! 🚀
Token0: ${pool.token0}
Token1: ${pool.token1}
Fee: ${pool.fee}
Pool Address: ${pool.pool}
Explore more on Uniswap!`;

        tweet.tweet(tweetText);
    });




    

}




main();