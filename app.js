// Основная логика входа
function login(phone, password) {
    const p = phone.trim();
    const pass = password.trim();

    // ВАШ ВХОД (ДИРЕКТОР)
    if (p === "705163333" && pass === "admin123") {
        const user = { name: "С.А.Б", role: "director", phone: "705163333" };
        localStorage.setItem('user', JSON.stringify(user));
        return true;
    }

    // Проверка остальных пользователей
    let db = JSON.parse(localStorage.getItem('users_db') || '[]');
    let user = db.find(u => u.phone === p && u.pass === pass);

    if (user) {
        localStorage.setItem('user', JSON.stringify(user));
        return true;
    } else {
        alert("Ошибка! Проверьте номер 705163333 и пароль admin123");
        return false;
    }
}

function register(name, phone, pass) {
    let db = JSON.parse(localStorage.getItem('users_db') || '[]');
    if (db.find(u => u.phone === phone) || phone === "705163333") {
        alert("Этот номер уже занят!");
    } else {
        db.push({name, phone, pass, role: 'programmer'});
        localStorage.setItem('users_db', JSON.stringify(db));
        alert("Успешно! Теперь входите.");
    }
}

function renderDashboard() {
    const user = JSON.parse(localStorage.getItem('user'));
    const app = document.getElementById('app');
    app.innerHTML = `
        <div class="sidebar">
            <h2>${user.name}</h2>
            <p style="color:gray">${user.role.toUpperCase()}</p>
            <nav style="display:flex; flex-direction:column; gap:10px; margin-top:20px;">
                <button>ЗАКАЗЫ</button>
                <button>СОТРУДНИКИ</button>
                ${user.role === 'director' ? '<button style="color:red">АДМИН ПАНЕЛЬ</button>' : ''}
            </nav>
        </div>
        <div class="main-content">
            <div class="stats">
                <div class="stat-card">Свободно <span>5</span></div>
                <div class="stat-card">В процессе <span>2</span></div>
                <div class="stat-card">Закрыто <span>12</span></div>
            </div>
            <h1>Добро пожаловать в систему, Директор!</h1>
        </div>
    `;
}
