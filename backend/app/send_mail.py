import smtplib
from mail_template import html_code
from email.message import EmailMessage
import ssl

sender = "cntctpp@gmail.com"
sender_password = "sszt uzkz xbwa uady"


# def send_mail(address):
#     with smtplib.SMTP("smtp.gmail.com") as connection:
#         connection.starttls()
#         connection.login(user=sender, password=sender_password)
#         connection.sendmail(
#             from_addr=sender,
#             to_addrs=address,
#             msg="Subject:It works\n\nTell me something... it still works",
#         )


# body = """Activate account"
subject = "it's me Lee"
body = """It works.."""
receiver = "otee@zitechng.com"
em = EmailMessage()
em["From"] = sender
em["To"] = receiver
em["Subject"] = "Account Activation"
em.set_content(body)

context = ssl.create_default_context()


def send_mail(receiver):
    with smtplib.SMTP_SSL("smtp.gmail.com", 465, context=context) as smtp:
        smtp.login(sender, sender_password)
        smtp.sendmail(sender, receiver, em.as_string())
