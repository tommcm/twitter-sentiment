/***
Copyright 2015 Amazon.com, Inc. or its affiliates. All Rights Reserved.

Licensed under the Amazon Software License (the "License").
You may not use this file except in compliance with the License.
A copy of the License is located at

http://aws.amazon.com/asl/

or in the "license" file accompanying this file. This file is distributed
on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either
express or implied. See the License for the specific language governing
permissions and limitations under the License.
***/

'use strict';

var config = module.exports = {
 firehose : {
  DeliveryStreamName: 'twitter-sentiment-analysis', /* required */
  S3DestinationConfiguration: {
    BucketARN: 'arn:aws:s3:::tommcm-twitter', /* required if stream not exists */
    RoleARN: 'arn:aws:iam::447119549480:role/firehose_delivery_role', /* required if stream not exists */
    BufferingHints: {
      IntervalInSeconds: 300,
      SizeInMBs: 5
    },
    CompressionFormat: 'UNCOMPRESSED', /* 'UNCOMPRESSED | GZIP | ZIP | Snappy' */
    EncryptionConfiguration: {
      NoEncryptionConfig: 'NoEncryption'
    },
    Prefix: 'twitter/raw-data'  /* if stream not exists. example: twitter/raw-data/  */
  }
  },
  twitter: {
      consumer_key: 'qFLIdEfrt6WpH4FYtZ0jteUfV',
      consumer_secret: 'k7KWMySZIX3yYQsaJSr79OzJy8YnhhORGec7EnU5VUu11odo41',
      access_token: '930607849-IqaARTB0lwrx84wOvVlAwMwdqxN5IRSimOlvvncM',
      access_token_secret: 'etk6BHm5h7zj08LrbZBqooDjfe9uoXIdUJ0n8VgLJ4eaR'
 },
 locations: ['-127.33,23.34,-55.52,49.56'], //US   (All the world:'-180,-90,180,90; New York City:-74,40,-73,41; San Francisco:-122.75,36.8,-121.75,37.8, US:-127.33,23.34,-55.52,49.56)
 waitBetweenDescribeCallsInSeconds: 2,
 recordsToWritePerBatch: 100,
 waitBetweenPutRecordsCallsInMilliseconds: 50,
 region: 'us-west-2'   
};
