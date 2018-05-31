# Download the helper library from https://www.twilio.com/docs/python/install
from twilio.rest import Client

# Account Sid and Auth Token from twilio.com/console
account_sid = 'ACbe1e4ade42ae58ecc4b127400ea53a29'
auth_token = '3b3bc103010b5dbc794fb2f40092a722'
client = Client(account_sid, auth_token)

message = client.messages \
    .create(
            body="Your photo has successfully uploaded! Let the hunt continue!",
            from_='+13614924116',
            to='+16692516002'
            )
print(message.sid)
