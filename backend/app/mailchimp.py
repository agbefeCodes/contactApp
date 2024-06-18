from typing import Final
import mailchimp_marketing

# import mailchimp_transactional as MailChimpTransactional
from mailchimp_marketing.api_client import ApiClientError
from . import schemas as _schemas
from string import Template
from . import mail_template

API_KEY: Final[str] = "6322d3256392498d733d3713a282c511-us21"
DATA_CENTER: Final[str] = "us21"
LIST_ID: Final[str] = "4015f9953f"
CAMPAIGN_ID: Final[str] = "8765fe69c9"
FORGOT_EMAIL_CAMPAIGN_ID: Final[str] = "18e0cef2bb"
client = mailchimp_marketing.Client()
client.set_config({"api_key": API_KEY, "server": DATA_CENTER})


# ADD USER TO LIST
def add_user(new_user: _schemas.UserCreate):
    # mailchimp = mailchimp_marketing.Client()
    # mailchimp.set_config({"api_key": API_KEY, "server": DATA_CENTER})

    member_info = {
        "email_address": new_user.email,
        "status": "subscribed",
        "merge_fields": {"FNAME": new_user.firstname, "LNAME": new_user.lastname},
    }
    try:
        res = client.lists.add_list_member(LIST_ID, member_info)
        print(f"response: {res}")
    except ApiClientError as err:
        print(f"An exception occurred: {err.text}")


def create_campaign():
    campaign_data = {
        "type": "regular",
        "recipients": {"list_id": LIST_ID},
        "settings": {
            "subject_line": "Forgot Password",
            "reply_to": "ziregbeagbefe@gmail.com",
            "from_name": "ContactApp Admin",
        },
    }
    try:
        response = client.campaigns.create(body=campaign_data)
        print("Campaign id:", response["id"])
    except ApiClientError as error:
        print("Error creating campaign:", error.text)


# create_campaign()
def send_campaign_mail(link: str, email):
    email_data = {
        "message": {
            "subject": "Your Subject",
            "text": "Your plain text message",
            "html": f"click on this <a href={link}>link</a> to activate account",
        },
        "test_emails": [email],
        "send_type": "plaintext",
    }

    try:
        response = client.campaigns.send_test_email(CAMPAIGN_ID, body=email_data)
        print(response)
    except ApiClientError as error:
        print(f"Error: {error.text}")


def customized_template_forgot_password(link):
    html_code = f"""\<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<title>Forgot Email</title>
	</head>
	<body>
		<p>
			Please click <a href={link}>here</a> to
			Reset Password
		</p>
	</body>
</html>
"""
    string_template = Template(html_code).safe_substitute()

    new_content = {"content": "Campaign message", "html": string_template}
    try:
        res = client.campaigns.set_content(FORGOT_EMAIL_CAMPAIGN_ID, new_content)
        print("Template created successfully")
        print("Response:", res)
        print("Campaign ID:", res)
    except ApiClientError as error:
        print("Error creating campaign: ", error.text)


def customized_template_activate_account(link):
    html_code = f"""\<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<title>Forgot Email</title>
	</head>
	<body>
		<p>
			Welcome to ContactApp please click <a href={link}>here</a> to
			Reset Password
		</p>
	</body>
</html>
"""
    string_template = Template(html_code).safe_substitute()

    new_content = {"content": "Campaign message", "html": string_template}
    try:
        res = client.campaigns.set_content(FORGOT_EMAIL_CAMPAIGN_ID, new_content)
        print("Template created successfully")
        print("Response:", res)
        print("Campaign ID:", res)
    except ApiClientError as error:
        print("Error creating campaign: ", error.text)


def send_mail_account_activate(email):
    try:
        response = client.campaigns.send_test_email(
            CAMPAIGN_ID,
            {"test_emails": [email], "send_type": "html"},
        )
        print(response)
    except ApiClientError as error:
        print(f"Error: {error.text}")


def send_mail_for_password_reset(email):
    try:
        response = client.campaigns.send_test_email(
            FORGOT_EMAIL_CAMPAIGN_ID,
            {"test_emails": [email], "send_type": "html"},
        )
        print(response)
    except ApiClientError as error:
        print(f"Error: {error.text}")
