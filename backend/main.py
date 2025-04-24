from flask import Flask, request, render_template, redirect, session, flash, Response
import psycopg
import pandas
import bcrypt
import uuid
import pyqrcode
import os
from flask_socketio import SocketIO, emit

from scaner import *


app = Flask(__name__)

socketio = SocketIO(app, cors_allowed_origins="*")

dbname = 'main'
dbuser = 'postgres'
dbpassword = '1'
dbhost = 'localhost'
dbport = 5432


@app.route('/')
def index():
    conn = psycopg.connect(dbname=dbname,user=dbuser,password=dbpassword,host=dbhost,port=dbport)
    cus = conn.cursor()
    cus.execute("SELECT * from volunters")
    vls = []
    for r in cus.fetchall():
        vls.append({'id':r[0],'FIO':r[1],'phone':r[2],'mail':r[4],'INN':r[5],'birhtdate':r[6],'achivment':r[7],'category':r[8],'avatar':r[9]})

    conn.close()

    return render_template('index.html', volunters=vls)

@app.route('/registration', methods=['POST', 'GET'])
def registration():
    if request.method == 'POST':
        conn = psycopg.connect(dbname=dbname,user=dbuser,password=dbpassword,host=dbhost,port=dbport)
        cus = conn.cursor()

        password = request.form['password']
        password_h = bcrypt.hashpw(password.encode(), bcrypt.gensalt()).decode()
        login = request.form['login']
        name = request.form['name']
        ur_adress = request.form['ur_adress']
        predst_fio = request.form['predst']
        inn = request.form['inn']
        contact = request.form['contact']

        cus.execute(f"insert into partners (name, ur_adress, predst, inn, contact, password, uniqe_name) values ('{name}','{ur_adress}','{predst_fio}','{inn}','{contact}','{password_h}', '{login}')")
       
        conn.commit()
        conn.close()

        return redirect('/login')

    return render_template('registration.html')

@app.route('/login', methods=['POST', 'GET'])
def login():

    if 'user' not in session or 'user_type' not in session:
        session['user'] = None
        session['user_type'] = None

    if session['user']:
        return redirect('/')
    
    if request.method == 'POST':
        conn = psycopg.connect(dbname=dbname,user=dbuser,password=dbpassword,host=dbhost,port=dbport)
        cus = conn.cursor()

        login = request.form['login']
        password = request.form['password']

        if request.form['type'] == 'volunter':
            cus.execute(f"select password, id from volunters where uniqe_name = '{login}'")  #or inn = '{login}' or phone = '{login}' or mail = '{login}'
            res = cus.fetchone()
            if not res:
                print('User not Found')
                return redirect(request.url)
            if bcrypt.checkpw(password.encode(), res[0].encode()):
                print('Вы вошли все ок')
                session['user'] = res[1]
                session['user_type'] = 'volunter'
                return redirect('/profile')
            else:
                print('Password none')

        if request.form['type'] == 'partner':
            cus.execute(f"select password, id from partners where uniqe_name = '{login}'")  #or inn = '{login}' or phone = '{login}' or mail = '{login}'
            res = cus.fetchone()
            if not res:
                print('User not Found')
                return redirect(request.url)
            if bcrypt.checkpw(password.encode(), res[0].encode()):
                print('Вы вошли все ок')
                session['user'] = res[1]
                session['user_type'] = 'partner'
                return redirect('/profile')
            else:
                print('Password none')
    
    return render_template('login.html')

@app.route('/logout')
def logout():
    if 'user' not in session or 'user_type' not in session:
        session['user'] = None
        session['user_type'] = None

    session['user'] = None
    session['user_type'] = None

@app.route('/profile', methods=['POST', 'GET'])
def profile():

    if 'user' not in session or 'user_type' not in session or not session['user'] or not session['user_type']:
        session['user'] = None
        session['user_type'] = None
        return redirect('/')

    if session['user_type'] == 'volunter':
        user_id = session['user']
        conn = psycopg.connect(dbname=dbname,user=dbuser,password=dbpassword,host=dbhost,port=dbport)
        cus = conn.cursor()
        cus.execute(f"select * from volunters where id = '{user_id}'")
        r = cus.fetchone()
        user = {'id':r[0],'FIO':r[1],'phone':r[2],'mail':r[4],'INN':r[5],'birhtdate':r[6],'achivment':r[7],'category':r[8],'avatar':r[9]}

        cus.execute(f"select * from used_bonuses where by_user = '{user_id}'")

        history = []
        for b in cus.fetchall():
            cus.execute(f"select name, partner_id, bonus from bonuses where id = '{b[1]}'")
            bonus = cus.fetchone()
            cus.execute(f"select name, logo, uniqe_name from partner where id = '{bonus[1]}'")
            partner = cus.fetchone()
            partnr = {'name':partner[0], 'logo':partner[1], 'uniqe_name':partner[2]}
            bon = {'name':bonus[0], 'partner':partnr, 'bonus':bonus[2]}
            history.append({'id':b[0],'bonus':bon, 'uses':b[3], 'use_time':b[4]})


        cus.execute(f"select * from bonuses where v_category like '%{user['category']}%'  order by v_category")

        av_bonuses = []
        for b2 in cus.fetchall():
            cus.execute(f"select name, logo, uniqe_name from partner where id = '{bonus[1]}'")
            partner = cus.fetchone()
            partnr = {'name':partner[0], 'logo':partner[1], 'uniqe_name':partner[2]}
            av_bonuses.append({'name':bonus[0], 'partner':partnr, 'bonus':bonus[2]})

        return render_template('profile_volunter.html', user=user, history=history, bonuses=av_bonuses) 

    elif session['user_type'] == 'partner':
        user_id = session['user']
        conn = psycopg.connect(dbname=dbname,user=dbuser,password=dbpassword,host=dbhost,port=dbport)
        cus = conn.cursor()
        cus.execute(f"select * from partners where id = '{user_id}'")
        r = cus.fetchone()
        partner = {'id':r[0],'name':r[1],'ur_adress':r[2],'predst_fio':r[4],'INN':r[5],'contact':r[6],'password_h':r[7],'allowed_by':r[8],'logo_url':r[9]}
        
        cus.execute(f"select * from used_bonuses where partner_id = '{user_id}'")

        history = []
        for b in cus.fetchall():
            cus.execute(f"select name, bonus, v_category, v_achivments, uses from bonuses where id = '{b[1]}'")
            bonus = cus.fetchone()
            by_user = 0
            bon = {'name':bonus[0], 'bonus':bonus[1],'v_category':bonus[2], 'v_achivments':bonus[3], 'uses':bonus[4]}
            history.append({'id':b[0],'bonus':bon, 'uses':b[3], 'use_time':b[4], 'user':by_user})


        cus.execute(f"select * from bonuses where partner_id = '{user_id}'")

        par_bonuses = []
        for b2 in cus.fetchall():
            cus.execute(f"select name, logo, uniqe_name from partners where id = '{b2[2]}'")
            partner_b = cus.fetchone()
            partnr = {'name':partner_b[0], 'logo':partner_b[1], 'uniqe_name':partner_b[2]}
            par_bonuses.append({'name':b2[1], 'partner':partnr, 'bonus':b2[5]})
        

        if request.method == 'POST':
            form_bonus = request.form['bonus']
            form_categoris = request.form['categoris']
            #form_achivments = request.form['achivments']
            form_uses = request.form['uses']
            cus.execute(f"insert into bonuses (partner_id, v_category, bonus, uses) values ('{user_id}','{form_categoris}', '{form_bonus}', '{form_uses}')")

            conn.commit()
            conn.close()

        return render_template('profile_partner.html', partner=partner, history=history, par_bonuses= par_bonuses) 
        # создание бонуса



@app.route('/bonuses')
def bonuses():

    if 'user' not in session or 'user_type' not in session:
        session['user'] = None
        session['user_type'] = None

    if session['user']: logged = True

    conn = psycopg.connect(dbname=dbname,user=dbuser,password=dbpassword,host=dbhost,port=dbport)
    cus = conn.cursor()

    cus.execute(f"select * from bonuses order by v_category")

    bonuses = []
    for r in cus.fetchall():
        bonuses.append({'id':r[0],'name':r[1],'partner_id':r[2],'v_category':r[4],'v_achivments':r[5],'bonus':r[6],'uses':r[7]})

    user_bonuses = []
    if session['user'] and session['user_type'] == 'volunter':

        cus.execute(f"select category from volunters where id = '{session['user']}'")
        category = cus.fetchone()[0]

        cus.execute(f"select * from bonuses where v_category like '%{category}%'  order by v_category")

        for r in cus.fetchall():
            cus.execute(f"select name, logo, uniqe_name from partner where id = '{r[2]}'")
            partner = cus.fetchone()
            partnr = {'name':partner[0], 'logo':partner[1], 'uniqe_name':partner[2]}
            user_bonuses.append({'id':r[0],'name':r[1],'partner_id':partnr,'v_category':r[4],'v_achivments':r[5],'bonus':r[6],'uses':r[7]})


    return render_template('bonuses.html', user_type=session['user_type'], user_id=session['user'], bonuses=bonuses, user_bonuses = user_bonuses)



@app.route('/getbonus/<int:partner>/<int:bonus_id>/<int:user_id>')
def getbonus(partner, bonus_id, user_id):

    if 'user' not in session or 'user_type' not in session or not session['user']:
        session['user'] = None
        session['user_type'] = None
        return redirect('/') 

    if session['user'] != user_id:
        return redirect('/') 

    conn = psycopg.connect(dbname=dbname,user=dbuser,password=dbpassword,host=dbhost,port=dbport)
    cus = conn.cursor()

    cus.execute(f"select category from volunters where id = '{user_id}'")
    usr_category = cus.fetchone()[0]

    cus.execute(f"select v_category from bonuses where id = '{bonus_id}'")
    bonus_categoris = cus.fetchone()[0]

    if usr_category not in bonus_categoris.split(','):
        return redirect('/')

    qr = pyqrcode.create(f'bonusconfirm/{partner}/{bonus_id}/{user_id}')
    
    qrcode = f"static/{uuid.uuid4().hex[:5]}.png"

    qr.png(qrcode, scale=6)

    return render_template('qr_code.html', qrcode = qrcode)

@app.route('/scan')
def scan():
    if 'user' not in session or 'user_type' not in session or not session['user']:
        session['user'] = None
        session['user_type'] = None
        return redirect('/') 
    if session['user_type'] != 'partner':
        return redirect('/') 
    
    return render_template('scan.html')

@app.route('/bonusconfirm/<int:partner_id>/<int:bonus_id>/<int:user_id>')
def confirm(partner_id, bonus_id, user_id):
    if 'user' not in session or 'user_type' not in session:
        session['user'] = None
        session['user_type'] = None
        return redirect('/') 
    
    if session['user_type'] != 'partner' or session['user'] != partner_id:
        return redirect('/') 
    

    conn = psycopg.connect(dbname=dbname,user=dbuser,password=dbpassword,host=dbhost,port=dbport)
    cus = conn.cursor()
    
    cus.execute(f"select category from volunters where id = '{user_id}'")
    usr_category = cus.fetchone()[0]

    cus.execute(f"select v_category from bonuses where id = '{bonus_id}'")
    bonus_categoris = cus.fetchone()[0]

    if usr_category not in bonus_categoris.split(','):
        confirm = False
    else:
        confirm = True

    return render_template('confirm_bonus.html', confirm=confirm)

def generate_frames(camera):
    while True:
        image = camera.get_frame()

        result = QRScanner.read_qr_code(image)
        if len(result) == 0:
            socketio.emit(
                "scan_result",
                {"status": "scan", "message": "Please scan your QR Code"},
            ) 

        for barcode in result:
            myData = barcode.data.decode("utf-8")
            
            QRScanner.add_box_to_qr_code(image, barcode)
            print(myData)
            if myData and str(myData).startswith('/bonusconfirm'):
                socketio.emit(
                    "scan_result",
                    {"status": "OK", "link": str(myData)},
                ) 
                break
                
        

        frame = QRScanner.encode(image)


        yield (b"--frame\r\n" + b"Content-Type: image/jpeg\r\n\r\n" + frame + b"\r\n")


@app.route("/video")
def video():
    return Response(
        generate_frames(Camera()), mimetype="multipart/x-mixed-replace; boundary=frame"
    )


@app.route('/partners')
def partners():
    conn = psycopg.connect(dbname=dbname,user=dbuser,password=dbpassword,host=dbhost,port=dbport)
    cus = conn.cursor()
    cus.execute("SELECT * from volunters")
    prtnrs = []
    for r in cus.fetchall():
        prtnrs.append({'id':r[0],'name':r[1],'ur_adress':r[2],'predst_fio':r[4],'INN':r[5],'contact':r[6],'password_h':r[7],'allowed_by':r[8],'logo_url':r[9]})

    return render_template('partners.html', partners = prtnrs)

@app.route('/partners/<name>')
def partner(name):
    conn = psycopg.connect(dbname=dbname,user=dbuser,password=dbpassword,host=dbhost,port=dbport)
    cus = conn.cursor()
    cus.execute(f"SELECT * from partners where uniqe_name = '{name}'")
    r = cus.fetchone()
    prtnr = {'id':r[0],'name':r[1],'ur_adress':r[2],'predst_fio':r[4],'INN':r[5],'contact':r[6],'password_h':r[7],'allowed_by':r[8],'logo_url':r[9]}

    return render_template('partner.html', partner = prtnr)

@app.route('/admin', methods=['POST','GET'])
def admin():
    if request.method == 'POST':
        conn = psycopg.connect(dbname=dbname,user=dbuser,password=dbpassword,host=dbhost,port=dbport)
        cus = conn.cursor()
        csv_file = request.files['CSV']
        if csv_file.filename.split('.')[-1].lower() != 'csv':
            return redirect(request.url)
        frame = pandas.read_csv(csv_file)
        cus.execute('delete from volunters')
        for index, row in frame.iterrows():
            if not row['ФИО'] or not row['Номер телефона'] or not row['Электронная почта'] or not row['ИНН'] or not row['Дата рождения'] or not row['Достижения']:
                continue
            if index < 50: category = 1
            elif index < 100: category = 2
            elif index < 150: category = 3
            randstr = uuid.uuid4().hex
            password = randstr[:8]
            uniqe_name = randstr[8:14]
            print(password, uniqe_name)
            password_h = bcrypt.hashpw(password.encode(), bcrypt.gensalt()).decode()
            cus.execute(f"insert into volunters (id,fio,phone,mail,inn,birthdate,achivment,category, password, uniqe_name) values ('{index+1}','{row['ФИО']}', '{row['Номер телефона']}', '{row['Электронная почта']}', '{row['ИНН']}', '{row['Дата рождения']}', '{row['Достижения']}', '{category}', '{password_h}', '{uniqe_name}')")
        conn.commit()
        conn.close()
    return render_template('admin.html')

if __name__ == '__main__':
  app.secret_key = os.urandom(24).hex()
  app.run(debug=True, port=80)