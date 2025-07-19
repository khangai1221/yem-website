// login.js

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('loginForm');
  const message = document.getElementById('message');

  form.addEventListener('submit', async (e) => {
    e.preventDefault(); // Stop default form submission

    // Get the input values
    const email = form.email.value.trim();
    const password = form.password.value;

    try {
      // Send POST request to backend signin endpoint
      const res = await fetch('http://localhost:5000/api/auth/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: email, password }) // backend expects username
      });

      const data = await res.json();

      if (res.ok) {
        // On success: save token in localStorage and redirect user
        localStorage.setItem('token', data.token);
        message.style.color = 'green';
        message.textContent = 'Амжилттай нэвтэрлээ!';

        setTimeout(() => {
          window.location.href = './index.html'; // Redirect after 1.5 sec
        }, 1500);

      } else {
        // On failure: show error message
        message.style.color = 'red';
        message.textContent = data.message || 'Нэвтрэхэд алдаа гарлаа';
      }
    } catch (error) {
      message.style.color = 'red';
      message.textContent = 'Сервертэй холбогдох үед алдаа гарлаа';
      console.error(error);
    }
  });
});
