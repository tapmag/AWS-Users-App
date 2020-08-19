'use strict'
const AWS = require('aws-sdk')

AWS.config.update({region: "us-east-1"});

exports.handler = async (event, context) => {
    const ddb = new AWS.DynamoDB({ apiVersion: "2012-10-08"});
    const documentClient = new AWS.DynamoDB.DocumentClient({ region: "us-east-1"});

    let responseBody = "";
    let statusCode = 0;

    const {id, firstname, lastname } = JSON.parse(event.body);

    const params = {
        TableName: "Users",
        Item: {
            id:id,
            firstname: firstname,
            lastname: lastname
        }
    }

    try{
      const data = await documentClient.put(params).promise();
      responseBody = JSON.stringify(data);
      statusCode = 201;
    } catch (err) {
        responseBody = "Unable to put User";
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


/* changes from put function - only added additional params and changed get to put , changed key to item  */