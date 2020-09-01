const keys = require('./keys');
const redis = require('redis');

const redisClient = redis.createClient({
    host: keys.redisHost,
    port: keys.redisPort,
    retry_strategy: () => 1000
});
const sub = redisClient.duplicate();

function fib(index) {
    return index < 2 ? 1 : fib(index - 1) + fib(index - 2);
}

sub.on('message', (channel, message) => {
    const index = parseInt(message);
    console.log(`New index ${message} received on ${channel}`);
    redisClient.hset('values', index, fib(index));
});

sub.subscribe('newIndex');