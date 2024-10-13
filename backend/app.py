from flask import Flask, request, jsonify
import jwt
import datetime
from flask_bcrypt import Bcrypt
import sqlite3
from flask_cors import CORS



app = Flask(__name__)
CORS(app)
bcrypt = Bcrypt(app)
app.config['SECRET_KEY'] = 'CnYHzHDj6ovNvtgUfzSvjOJYJzHmFUs9'  # Replace this with a strong key

# Initialize SQLite database
def init_db():
    conn = sqlite3.connect('database.db')
    conn.execute('''CREATE TABLE IF NOT EXISTS users
                    (id INTEGER PRIMARY KEY AUTOINCREMENT,
                    email TEXT UNIQUE NOT NULL,
                    password TEXT NOT NULL);''')
    conn.close()

init_db()

# Helper to query user by email
def get_user_by_email(email):
    conn = sqlite3.connect('database.db')
    cursor = conn.execute('SELECT * FROM users WHERE email = ?', (email,))
    user = cursor.fetchone()
    conn.close()
    return user

# Signup route
@app.route('/signup', methods=['POST'])
def signup():
    
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({"message": "email and password required"}), 400

    hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')

    try:
        conn = sqlite3.connect('database.db')
        conn.execute('INSERT INTO users (email, password) VALUES (?, ?)', (email, hashed_password))
        conn.commit()
        conn.close()
        return jsonify({"message": "User registered successfully!"}), 201
    except sqlite3.IntegrityError:
        print("email already exists")
        return jsonify({"message": "email already exists"}), 409
    except Exception as e:
        print(e)
        return jsonify({"message": "Something went wrong"}), 500

# Login route
@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    print(data)
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({"message": "email and password required"}), 400

    user = get_user_by_email(email)

    if not user or not bcrypt.check_password_hash(user[2], password):
        return jsonify({"message": "Invalid email or password"}), 401

    token = jwt.encode({
        'user_id': user[0],
        'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=1)
    }, app.config['SECRET_KEY'], algorithm='HS256')

    return jsonify({'token': token})

# health check
@app.route('/health', methods=['GET'])
def health():
    return jsonify({'message': 'Healthy!'})

# Protected route
@app.route('/protected', methods=['GET'])
def protected():
    token = request.headers.get('Authorization')

    if not token:
        return jsonify({'message': 'Token is missing'}), 403

    try:
        data = jwt.decode(token, app.config['SECRET_KEY'], algorithms=['HS256'])
        user_id = data['user_id']
        return jsonify({'message': f'Welcome User {user_id}!',
                        'flag' : True
                        })
    except jwt.ExpiredSignatureError:
        return jsonify({'message': 'Token expired',
                        'flag' : False
                        }), 401
    except jwt.InvalidTokenError:
        return jsonify({'message': 'Invalid token',
                        'flag' : False
                        }), 401

if __name__ == '__main__':
    app.run(debug=True)
