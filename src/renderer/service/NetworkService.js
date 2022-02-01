"use strict";

const request = require("request-promise-native");
const AWS_REGION = "us-east-1";
let s3credentials;

const getS3Credentials = async(id, token) => {
    const mapbox_api = "https://api.mapbox.com/uploads/v1/" + id + "/credentials?access_token=" + token;
    return await request.post(mapbox_api);
}

const aws = require("aws-sdk");

const uploadFileToS3 = async(file, credentials, id, token, callback) => {
    s3credentials = credentials;
    console.log("s3 credentials: ", s3credentials);
    console.log(file)
    aws.config.accessKeyId = credentials.accessKeyId;
    aws.config.secretAccessKey = credentials.secretAccessKey;
    aws.config.sessionToken = credentials.sessionToken;
    aws.config.region = AWS_REGION;
    let param = {
        Bucket: credentials.bucket,
        Key: credentials.key,
        Body: ''
    }
    let fs = require('fs');
    let fileStream = fs.createReadStream(file.path);
    fileStream.on('error', function(err) {
        console.log('File Error', err);
    });
    param.Body = fileStream;
    const s3 = new aws.S3();
    s3.upload(param, (err, data) => {
        if(err) {
            console.log("ERROR", err);
        }
        console.log("upload complete", data);
        if(data) bindFileToMapbox(data, id, token, file.name).then(response => {
            console.log("mapbox binding completed", response)
            callback(response.tileset)
        });
    });
}

const uidBuilder = require('nanoid');

const bindFileToMapbox = async(response, id, token, fileName) => {
    console.log("response from previous progress: ", response);
    const mapbox_api = "https://api.mapbox.com/uploads/v1/" + id + "?access_token=" + token;
    const param = {
        uri: mapbox_api,
        method: 'POST',
        body: {
            name: fileName,
            tileset: id + "." + uidBuilder.nanoid(7),
            url: response.Location
            //"https://" + s3credentials.bucket + ".s3.amazonaws.com/" + response.body.name
        },
        json: true
    }
    return await request(param);
}

export {
    getS3Credentials,
    uploadFileToS3
}