const transform_tweet_to_params = require('./lib/utils').transform_tweet_to_params;

console.log(transform_tweet_to_params({'id': '123', 'created_at': '2021-01-01'}));