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

#GET para todas las tablas
@app.route('/', methods=['GET'])
@cross_origin()
def get_queues():
  db = Database()
  db.cursor.execute('SELECT * FROM %s' %(db.env))
  return jsonify(db.cursor.fetchall())

  #if request.method == 'POST':
    #data = request.get_json()
    #db = Database()
    #db.cursor.execute("INSERT INTO productos (nombre, precioVenta) VALUES ('%s', '%s')" %(data.get('nombre'), data.get('precioVenta')))
    #db.cursor.connection.commit()
    #return jsonify(db.cursor.fetchall())

@app.route('/<string:tableName>', methods=['POST'])
@cross_origin()
def postDB(tableName):
  #POST para tabla PRODUCTOS
  if tableName == 'productos':
    data = request.get_json()
    db = Database()
    db.cursor.execute("INSERT INTO productos (nombre, precioVenta) VALUES ('%s', '%s')" %(data.get('nombre'), data.get('precioVenta')))
    db.cursor.connection.commit()
    return jsonify(db.cursor.fetchall())
  # POST para tabla CLIENTES
  elif tableName == 'clientes':
    data = request.get_json()
    db = Database()
    db.cursor.execute("INSERT INTO clientes (nombre, telefono, correoElectronico) VALUES ('%s', '%s', '%s')" %(data.get('nombre'), data.get('precioVenta'), data.get('correoElectronico')))
    db.cursor.connection.commit()
    return jsonify(db.cursor.fetchall())
  elif tableName == 'proveedores':
    data = request.get_json()
    db = Database()
    db.cursor.execute("INSERT INTO proveedores (nombre, telefono, correoElectronico) VALUES ('%s', '%s', '%s')" %(data.get('nombre'), data.get('precioVenta'), data.get('correoElectronico')))
    db.cursor.connection.commit()
    return jsonify(db.cursor.fetchall())
  elif tableName == 'inventario':
    data = request.get_json()
    db = Database()
    db.cursor.execute("INSERT INTO inventario (idProducto, cantidad) VALUES ('%s', '%s')" %(data.get('nombre'), data.get('precioVenta')))
    db.cursor.connection.commit()
    return jsonify(db.cursor.fetchall())
  else :
    return 'Esta es la cadena {}'.format(tableName)

@app.route('/patch', methods=['PATCH'])
@cross_origin()
def updateDB():
  data = request.get_json()
  db = Database()
  db.cursor.execute("UPDATE %s SET nombre = '%s', precioVenta = '%s' WHERE id= %s" %(db.env, data.get('nombre'), data.get('precioVenta'), data.get('id')))
  db.cursor.connection.commit()
  return jsonify(db.cursor.fetchall())

@app.route('/delete', methods=['DELETE'])
@cross_origin()
def deleteDB():
  data = request.get_json()
  db = Database()
  db.cursor.execute("DELETE FROM %s WHERE id= %s" %(db.env, data.get('id')))
  db.cursor.connection.commit()
  return jsonify(db.cursor.fetchall())