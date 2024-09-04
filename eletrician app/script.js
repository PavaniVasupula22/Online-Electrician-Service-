// Script for handling form submissions (generic handling)
document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const formData = new FormData(form);
        const data = {};
        formData.forEach((value, key) => {
            data[key] = value;
        });

        const url = form.id === 'signupForm' ? '/api/signup' :
                    form.id === 'loginForm' ? '/api/login' :
                    form.id === 'paymentForm' ? '/api/payment' : null;

        if (url) {
            fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })
            .then(response => response.json())
            .then(data => {
                document.getElementById(form.id + 'Message').innerText = data.message;
            })
            .catch(error => {
                console.error('Error:', error);
            });
        }
    });
});
