from __future__ import print_function

import base64
import json
import jmespath
import boto3

comprehend = boto3.client(service_name='comprehend', region_name='us-west-2')

print('Loading function')

def lambda_handler(event, context):
    output = []

    for record in event['records']:
        # print(record['recordId'])
        payload = base64.b64decode(record['data'])

        # print(record['recordId'])
        # print (payload)
        # Print stream as source only data here
        # kinesisMetadata = record['kinesisRecordMetadata']
        # print(kinesisMetadata['sequenceNumber'])
        # print(kinesisMetadata['subsequenceNumber'])
        # print(kinesisMetadata['partitionKey'])
        # print(kinesisMetadata['shardId'])
        # print(kinesisMetadata['approximateArrivalTimestamp'])

        # Do custom processing on the payload here
        payload_json = json.loads(payload)
        # payload_json = payload
        # Add Comprehend here.

        text=payload_json['text']
        print('Calling DetectSentiment')
        sentiment_reponse = comprehend.detect_sentiment(Text=text, LanguageCode='en')
        sentiment = sentiment_reponse['Sentiment']
        print (sentiment)
        payload_json.update({'sentiment': sentiment})
        print('End of DetectSentiment\n')

        # print(payload_json['text'])
        # print(payload_json['sentiment'])

        processed_payload = json.dumps(payload_json)
        # print processed_payload

        output_record = {
            'recordId': record['recordId'],
            'result': 'Ok',
            # ',\n' added to ensure each JSON element is seperated correctly. Required for Athena Queries
            'data': base64.b64encode(processed_payload+',\n')
        }

        output.append(output_record)


    print('Successfully processed {} records.'.format(len(event['records'])))
    # print(output)
    return {'records': output}
