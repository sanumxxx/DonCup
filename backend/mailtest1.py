# import smtplib

# server = smtplib.SMTP_SSL('smtp.yandex.ru:465')
# server.login('alextandr.lpt@yandex.ru', 'tskzvmavqcdheaxs')

# # server.starttls()

# server.sendmail("alextandr.lpt@yandex.ru","Rintsuki@yandex.ru","go to bed!")

# server.quit()



from flask import Flask
from flask_mail import Mail, Message

app = Flask(__name__)
app.config.update(
    MAIL_SERVER='smtp.timeweb.ru',
    MAIL_PORT=587,
    MAIL_USE_TLS=True,
    MAIL_USERNAME='olimp@fsp-zp.ru',
    MAIL_PASSWORD='donetsk_olimp'
)
mail = Mail(app)

@app.route('/send_mail')
def send_mail():
    msg = Message('Тема письма', 
                 sender='olimp@fsp-zp.ru',
                 recipients=['sanumxxx@yandex.ru'])
    msg.body = '123'
    mail.send(msg)
    return 'Письмо отправлено!'

if __name__ == '__main__':
  app.run(debug=True, port=80)