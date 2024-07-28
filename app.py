from flask import Flask, request, jsonify, render_template
import pyodbc

app = Flask(__name__)

# Конфигурация подключения к Access Database
conn_str = (
    r'DRIVER={Microsoft Access Driver (*.mdb, *.accdb)};'
    r'DBQ=Database1.accdb;'
)
conn = pyodbc.connect(conn_str)
cursor = conn.cursor()

# Создание таблицы в Access Database
cursor.execute('''
    CREATE TABLE IF NOT EXISTS CRMData (
        id AUTOINCREMENT PRIMARY KEY,
        fullName TEXT,
        email TEXT,
        phone TEXT,
        service TEXT,
        country TEXT,
        city TEXT,
        needTranslation TEXT,
        morningSessions TEXT,
        eveningSessions TEXT,
        totalPrice DOUBLE,
        paymentStatus TEXT
    )
''')
conn.commit()

@app.route('/')
def index():
    return render_template('crm.html')

@app.route('/api/save_data', methods=['POST'])
def save_data():
    data = request.json
    cursor.execute('''
        INSERT INTO CRMData (fullName, email, phone, service, country, city, needTranslation, morningSessions, eveningSessions, totalPrice, paymentStatus)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ''', (
        data['fullName'], data['email'], data['phone'], data['service'], data['country'], data['city'],
        data['needTranslation'], ','.join(data['morningSessions']), ','.join(data['eveningSessions']),
        data['totalPrice'], data['paymentStatus']
    ))
    conn.commit()
    return jsonify({'status': 'success'})

@app.route('/api/get_data', methods=['GET'])
def get_data():
    cursor.execute('SELECT * FROM CRMData')
    rows = cursor.fetchall()
    data = []
    for row in rows:
        data.append({
            'id': row.id,
            'fullName': row.fullName,
            'email': row.email,
            'phone': row.phone,
            'service': row.service,
            'country': row.country,
            'city': row.city,
            'needTranslation': row.needTranslation,
            'morningSessions': row.morningSessions,
            'eveningSessions': row.eveningSessions,
            'totalPrice': row.totalPrice,
            'paymentStatus': row.paymentStatus
        })
    return jsonify(data)

if __name__ == '__main__':
    app.run(debug=True)
