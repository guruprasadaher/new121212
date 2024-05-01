import webbrowser
from flask import Flask, render_template, request, jsonify
from cryptography.fernet import Fernet

app = Flask(__name__)

# Generate a key for encryption
def generate_key():
    return Fernet.generate_key()

# Encrypt password
def encrypt_password(password, key):
    cipher_suite = Fernet(key)
    return cipher_suite.encrypt(password.encode())

# Decrypt password
def decrypt_password(encrypted_password, key):
    cipher_suite = Fernet(key)
    return cipher_suite.decrypt(encrypted_password).decode()

# Store passwords in memory (for simplicity)
passwords = {}
key = generate_key()

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/store_password', methods=['POST'])
def store_password():
    data = request.form
    account = data.get('account')
    username = data.get('username')
    password = data.get('password')

    encrypted_password = encrypt_password(password, key)
    passwords[account] = {'username': username, 'password': encrypted_password}
    return jsonify({'message': 'Password stored successfully!'})

@app.route('/retrieve_password', methods=['POST'])
def retrieve_password():
    data = request.form
    account = data.get('account')

    if account in passwords:
        username = passwords[account]['username']
        encrypted_password = passwords[account]['password']
        decrypted_password = decrypt_password(encrypted_password, key)
        return jsonify({'account': account, 'username': username, 'password': decrypted_password})
    else:
        return jsonify({'error': 'Account not found!'})

@app.route('/delete_password', methods=['POST'])
def delete_password():
    data = request.form
    account = data.get('account')

    if account in passwords:
        del passwords[account]
        return jsonify({'message': f'Password for account {account} deleted successfully!'})
    else:
        return jsonify({'error': 'Account not found!'})

@app.route('/update_password', methods=['POST'])
def update_password():
    data = request.form
    account = data.get('account')
    new_password = data.get('new_password')

    if account in passwords:
        encrypted_password = encrypt_password(new_password, key)
        passwords[account]['password'] = encrypted_password
        return jsonify({'message': f'Password for account {account} updated successfully!'})
    else:
        return jsonify({'error': 'Account not found!'})

if __name__ == "__main__":
    # Open default web browser
    webbrowser.open("http://127.0.0.1:5000/")
    app.run(debug=True)
    
