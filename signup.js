// signup.js

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('signupForm');
  const message = document.getElementById('message');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const fullname = form.fullname.value.trim();
    const email = form.email.value.trim();
    const password = form.password.value;
    const confirmPassword = form['confirm-password'].value;

    if (password !== confirmPassword) {
      message.style.color = 'red';
      message.textContent = 'Нууц үгүүд таарахгүй байна';
      return;
    }

    try {
      const res = await fetch('http://localhost:5000/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: email, // backend uses "username", so we send email there
          password
          // fullname is collected but not sent (unless backend is updated)
        })
      });

      const data = await res.json();

      if (res.ok) {
        message.style.color = 'green';
        message.textContent = 'Амжилттай бүртгэгдлээ! Та нэвтрэх хуудас руу шилжиж байна...';
        setTimeout(() => {
          window.location.href = './login.html';
        }, 2000);
      } else {
        message.style.color = 'red';
        message.textContent = data.message || 'Бүртгэл амжилтгүй боллоо';
      }

    } catch (error) {
      message.style.color = 'red';
      message.textContent = 'Сервертэй холбогдох үед алдаа гарлаа';
      console.error(error);
    }
  });
});
