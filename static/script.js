function showMessage(message, type) {
    var messageDiv = document.getElementById('message');
    messageDiv.innerHTML = message;
    messageDiv.style.color = type === 'error' ? 'red' : 'green';
}

document.getElementById('passwordForm').addEventListener('submit', function(event) {
    event.preventDefault();

    var account = document.getElementById('account').value;
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;

    fetch('/store_password', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
            'account': account,
            'username': username,
            'password': password
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            showMessage(data.error, 'error');
        } else {
            showMessage(data.message, 'success');
            document.getElementById('username').value = '';
            document.getElementById('account').value = '';
            document.getElementById('password').value = '';
        }
    })
    .catch(error => {
        showMessage('Error storing password', 'error');
    });
});

function retrievePassword() {
    var account = document.getElementById('account').value;

    fetch('/retrieve_password', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
            'account': account
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            showMessage(data.error, 'error');
        } else {
            showMessage(`Account: ${data.account}<br>Username: ${data.username}<br>Password: ${data.password}`, 'success');
            document.getElementById('username').value = '';
            document.getElementById('account').value = '';
            document.getElementById('password').value = '';
        }
    })
    .catch(error => {
        showMessage('Error retrieving password', 'error');
        document.getElementById('username').value = '';
            document.getElementById('account').value = '';
            document.getElementById('password').value = '';
    });
}

function updatePassword() {
    var account = document.getElementById('account').value;
    var newPassword = document.getElementById('password').value;

    fetch('/update_password', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
            'account': account,
            'new_password': newPassword
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            showMessage(data.error, 'error');
        } else {
            showMessage(data.message, 'success');
            document.getElementById('username').value = '';
            document.getElementById('account').value = '';
            document.getElementById('password').value = '';
        }
    })
    .catch(error => {
        showMessage('Error updating password', 'error');
        document.getElementById('username').value = '';
            document.getElementById('account').value = '';
            document.getElementById('password').value = '';
    });
}

function deletePassword() {
    var account = document.getElementById('account').value;

    fetch('/delete_password', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
            'account': account
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            showMessage(data.error, 'error');
        } else {
            showMessage(data.message, 'success');
            document.getElementById('username').value = '';
            document.getElementById('account').value = '';
            document.getElementById('password').value = '';
        }
    })
    .catch(error => {
        showMessage('Error deleting password', 'error');
        document.getElementById('username').value = '';
            document.getElementById('account').value = '';
            document.getElementById('password').value = '';
    });
}
