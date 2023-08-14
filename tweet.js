const { TwitterApi } = require('twitter-api-v2');
require('dotenv').config();

const twitterConfig = {
    appKey: process.env.CONSUMER_KEY,
    appSecret: process.env.CONSUMER_SECRET,
    accessToken: process.env.ACCESS_TOKEN_KEY,
    accessSecret: process.env.ACCESS_TOKEN_SECRET,
};

const twitterClient = new TwitterApi(twitterConfig);

const poolClient = twitterClient.readWrite

// Tweet a text-based status
async function tweet(tweetText) {
    try {
        const tweetResponse = await poolClient.v1.tweet(tweetText);
        console.log(`Successfully tweeted: ${tweetText}`);
    } catch (error) {
        console.error("Error tweeting:", error);
    }
}

module.exports = {
    tweet: tweet
};
