'use strict'
const AWS = require('aws-sdk')

AWS.config.update({region: "us-east-1"});

exports.handler = async (event, context) => {
    const ddb = new AWS.DynamoDB({ apiVersion: "2012-10-08"});
    const documentClient = new AWS.DynamoDB.DocumentClient({ region: "us-east-1"});

    let responseBody = "";
    let statusCode = 0;

    const {id} = event.pathParameters;

    const params = {
        TableName: "Users",
        Key: {
            id: id
        }
    }

    try{
      const data = await documentClient.get(params).promise();
      responseBody = JSON.stringify(data.Item);
      statusCode = 200;
    } catch (err) {
        responseBody = "Unable to get User";
        statusCode = 403;
    }

    const response = {
        statusCode: statusCode,
        headers: {
            "myheader": "test",
        },
        body: responseBody
    }

    return response;
}

    /* Old code , uses ddb.getItem and dynamo db json for params object and old function style, above code uses promises

    exports.handler = function (event, context, callback) {
    const ddb = new AWS.DynamoDB({ apiVersion: "2012-10-08"});
    const documentClient = new AWS.DynamoDB.DocumentClient({ region: "us-east-1"});

    const params = {
        TableName: "Users",
        Key: {
            id: "12345"
        }
    }

    ddb.getItem(params, (err, data) => {
        if(err) {
            console.log(err);
        }
        console.log(data);
    })
    }*/
