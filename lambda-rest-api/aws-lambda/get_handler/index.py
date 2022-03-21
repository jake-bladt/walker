import boto3

def lambda_handler(event, context):
    client = boto3.resource('dynamodb')
    table = client.Table('walker_steps_data')

    response = table.get_item(
        Key = {
            'user_date_key': event['id']
        }
    )

    if 'Item' in response:
        return response['Item']
    else:
        return {
            'StatusCode': '404',
            'body': 'Not found'
        }
