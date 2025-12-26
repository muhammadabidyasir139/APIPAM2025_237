const AWS = require("aws-sdk");

// Debug logging for environment variables
console.log("S3 Config - AWS_S3_ENDPOINT:", process.env.AWS_S3_ENDPOINT);
console.log("S3 Config - AWS_S3_BUCKET_NAME:", process.env.AWS_S3_BUCKET_NAME);

const region = process.env.AWS_REGION || "id-jkt-1";

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: region,
});

console.log("S3 Config - Using region:", region);

let endpoint = process.env.AWS_S3_ENDPOINT || "https://is3.cloudhost.id";

// Strips any protocol prefix and forces https://, handles quotes/spaces
if (endpoint) {
  // Remove quotes and whitespace
  endpoint = endpoint.replace(/['"\s]+/g, '');

  // Remove existing protocol (http://, https://, ttps://, etc)
  endpoint = endpoint.replace(/^[a-zA-Z]+:\/\//, '');

  // Add https:// prefix
  endpoint = `https://${endpoint}`;
}

console.log("S3 Config - Using endpoint:", endpoint);

const s3 = new AWS.S3({
  endpoint: endpoint,
  s3BucketEndpoint: false,
  s3ForcePathStyle: true,
  signatureVersion: "v4",
  maxRetries: 3, // Retry failed requests up to 3 times
  httpOptions: {
    timeout: 30000, // 30 second timeout
    connectTimeout: 5000 // 5 second connection timeout
  },
  retryDelayOptions: {
    base: 300 // exponential backoff base 300ms
  }
});

const bucketName = process.env.AWS_S3_BUCKET_NAME || "rumahistimewa";
console.log("S3 Config - Using bucket:", bucketName);

module.exports = { s3, bucketName };
