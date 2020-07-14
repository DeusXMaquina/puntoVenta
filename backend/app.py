from flask import Flask, jsonify, request
from flaskext.mysql import MySQL
from flask_cors import CORS, cross_origin
from flask_restful import reqparse

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS']= 'Content-Type'
app.config['MYSQL_DATABASE_USER'] = 'root'
app.config['MYSQL_DATABASE_PASSWORD'] = 'admin'
app.config['MYSQL_DATABASE_DB'] = 'puntoventa'
app.config['MYSQL_DATABASE_HOST'] = 'localhost'

class Database:
  def __init__(self):
    mysql = MySQL()
    mysql.init_app(app)
    conn = mysql.connect()
    self.cursor = conn.cursor()
    parser = reqparse.RequestParser()
    parser.add_argument('listas', required=True, location='headers')
    self.env = request.headers.get('listas')

@app.route('/', methods=['GET', 'POST', 'UPDATE', 'DELETE'])
@cross_origin()
def get_queues():
  
  if request.method == 'GET':
    db = Database()
    db.cursor.execute('SELECT * FROM ' + db.env)
    return jsonify(db.cursor.fetchall())

  if request.method == 'POST':
    data = request.get_json()
    db = Database()
    db.cursor.execute("INSERT INTO productos (nombre, precioVenta) VALUES ('%s', '%s')" %(data.get('nombre'), data.get('precioVenta')))
    db.cursor.connection.commit()
    return jsonify(db.cursor.fetchall())

@app.route('/p/<string:cadena>')
def show_cadena(cadena):
  return 'Esta es la cadena {}'.format(cadena)