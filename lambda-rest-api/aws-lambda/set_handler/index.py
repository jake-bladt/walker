import boto3

def lambda_handler(event, context):
    client = boto3.resource('dynamodb')
    table = client.Table('walker_steps_data')
    