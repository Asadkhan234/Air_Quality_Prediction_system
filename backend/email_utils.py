import os
import smtplib

from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

from dotenv import load_dotenv

load_dotenv()

EMAIL_ADDRESS = os.getenv("EMAIL_ADDRESS")
EMAIL_PASSWORD = os.getenv("EMAIL_PASSWORD")


def send_otp_email(email, otp):

    subject = "Air Quality AI - Password Reset OTP"

    body = f"""
Hello,

Your OTP is:

{otp}

This OTP will expire in 10 minutes.

Regards,
Air Quality AI Team
"""

    message = MIMEMultipart()

    message["From"] = EMAIL_ADDRESS
    message["To"] = email
    message["Subject"] = subject

    message.attach(MIMEText(body, "plain"))

    try:

        server = smtplib.SMTP("smtp.gmail.com", 587)

        server.starttls()

        server.login(
            EMAIL_ADDRESS,
            EMAIL_PASSWORD
        )

        server.sendmail(
            EMAIL_ADDRESS,
            email,
            message.as_string()
        )

        server.quit()

        print("✅ OTP Email Sent Successfully")

    except Exception as e:

        print("❌ Email Error:")
        print(e)