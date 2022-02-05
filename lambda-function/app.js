// const axios = require('axios')
// const url = 'http://checkip.amazonaws.com/';
const AWS = require('aws-sdk');
const transform_tweet_to_params = require('./lib/utils').transform_tweet_to_params;

AWS.config.update({region: 'REGION', apiVersion: '2012-11-05'});

const sqs = new AWS.SQS();

let response;

/**
 *
 * Event doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html#api-gateway-simple-proxy-for-lambda-input-format
 * @param {Object} event - API Gateway Lambda Proxy Input Format
 *
 * Context doc: https://docs.aws.amazon.com/lambda/latest/dg/nodejs-prog-model-context.html 
 * @param {Object} context
 *
 * Return doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html
 * @returns {Object} object - API Gateway Lambda Proxy Output Format
 * 
 */
exports.lambdaHandler = async (event, context) => {
    let response = {};
    try {
        if (event.body === null || event.body === undefined)
            return {
                statusCode: 400,
                body: JSON.stringify({
                    message: 'Ops... requisição incorreta!'
                })
            };

        let body = JSON.parse(event.body) //use in case of JSON body

        let message_attributes = transform_tweet_to_params(body);

        response = {
            statusCode: 200,
            body: JSON.stringify(message_attributes)
        }
    } catch (err) {
        console.log(err);
        return err;
    }

    console.log(response);
    return response;
};
