const AWS = require("aws-sdk");

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION || "us-east-1",
});

const s3 = new AWS.S3({
  endpoint: process.env.AWS_S3_ENDPOINT,
  s3BucketEndpoint: true,
  s3ForcePathStyle: true,
});

const bucketName = process.env.AWS_S3_BUCKET_NAME;

module.exports = { s3, bucketName };
