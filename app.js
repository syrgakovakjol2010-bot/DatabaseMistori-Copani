// База данных (в памяти браузера для начала)
let orders = JSON.parse(localStorage.getItem('orders_db') || '[]');
let staff = JSON.parse(localStorage.getItem('users_db') || '[]');

function login(phone, password) {
    const p = phone.trim();
    const pass = password.trim();

    if (p === "705163333" && pass === "admin123") {
        const user = { name: "С.А.Б", role: "director", phone: "705163333" };
        localStorage.setItem('user', JSON.stringify(user));
        return true;
    }

    let user = staff.find(u => u.phone === p && u.pass === pass);
    if (user) {
        localStorage.setItem('user', JSON.stringify(user));
        return true;
    }
    alert("Ошибка входа!");
    return false;
}

function renderDashboard() {
    const user = JSON.parse(localStorage.getItem('user'));
    const app = document.getElementById('app');
    
    // Считаем статистику
    const free = orders.filter(o => o.status === 'free').length;
    const work = orders.filter(o => o.status === 'process').length;
    const closed = orders.filter(o => o.status === 'closed').length;

    app.innerHTML = `
        <div class="sidebar">
            <h2 style="border-bottom: 2px solid white;">S.A.B. СТУДИЯ</h2>
            <p style="color: #00ff00;">● ${user.name} (${user.role})</p>
            <nav style="display:flex; flex-direction:column; gap:10px; margin-top:20px;">
                <button onclick="showOrders()">📋 ЗАКАЗЫ</button>
                <button onclick="showStaff()">👥 СОТРУДНИКИ</button>
                ${user.role === 'director' || user.role === 'manager' ? '<button onclick="showAddOrder()" style="border-color: #00ff00;">+ НОВЫЙ ЗАКАЗ</button>' : ''}
                <button onclick="logout()" style="margin-top:50px; border-color: red;">ВЫХОД</button>
            </nav>
        </div>
        <div class="main-content">
            <div class="stats">
                <div class="stat-card">Свободно <span id="s-free">${free}</span></div>
                <div class="stat-card">В работе <span id="s-work">${work}</span></div>
                <div class="stat-card">Закрыто <span id="s-closed">${closed}</span></div>
            </div>
            <div id="content-display">
                <h1>Добро пожаловать в систему управления</h1>
                <p>Выберите раздел слева для работы.</p>
            </div>
        </div>
    `;
}

// РАЗДЕЛ ЗАКАЗОВ
function showOrders() {
    const display = document.getElementById('content-display');
    display.innerHTML = '<h2>АКТУАЛЬНЫЕ ЗАКАЗЫ</h2>';
    
    orders.forEach((order, index) => {
        display.innerHTML += `
            <div class="order-card">
                <div class="order-header">
                    <strong>КЛИЕНТ: ${order.client}</strong>
                    <span>Срок: ${order.deadline}</span>
                </div>
                <p>${order.desc}</p>
                <p style="font-size: 0.8rem; color: gray;">Статус: ${order.status}</p>
                ${order.status === 'free' ? `<button class="btn-take" onclick="takeOrder(${index})">ВЗЯТЬ В РАБОТУ</button>` : ''}
            </div>
        `;
    });
}

// ДОБАВЛЕНИЕ ЗАКАЗА (ДЛЯ МЕНЕДЖЕРА/ДИРЕКТОРА)
function showAddOrder() {
    const display = document.getElementById('content-display');
    display.innerHTML = `
        <h2>ДОБАВИТЬ НОВЫЙ ЗАКАЗ</h2>
        <input type="text" id="o-client" placeholder="Имя клиента">
        <input type="text" id="o-phone" placeholder="Номер клиента">
        <textarea id="o-desc" placeholder="Описание проекта и референсы" style="width:100%; height:100px; background:black; color:white; border:1px solid white; margin:10px 0;"></textarea>
        <input type="date" id="o-date">
        <button onclick="saveOrder()" style="background:white; color:black; font-weight:bold; width:100%;">СОЗДАТЬ ЗАКАЗ</button>
    `;
}

function saveOrder() {
    const newOrder = {
        client: document.getElementById('o-client').value,
        phone: document.getElementById('o-phone').value,
        desc: document.getElementById('o-desc').value,
        deadline: document.getElementById('o-date').value,
        status: 'free',
        worker: null
    };
    orders.push(newOrder);
    localStorage.setItem('orders_db', JSON.stringify(orders));
    renderDashboard();
    showOrders();
}

// РАЗДЕЛ СОТРУДНИКОВ (ТОЛЬКО ДЛЯ ДИРЕКТОРА)
function showStaff() {
    const display = document.getElementById('content-display');
    const user = JSON.parse(localStorage.getItem('user'));
    
    display.innerHTML = '<h2>СПИСОК СОТРУДНИКОВ</h2>';
    
    staff.forEach((member, index) => {
        display.innerHTML += `
            <div class="order-card" style="display:flex; justify-content:space-between; align-items:center;">
                <div>
                    <strong>${member.name}</strong> (${member.role})<br>
                    <small>${member.phone}</small>
                </div>
                ${user.role === 'director' ? `<button onclick="fireStaff(${index})" style="color:red; border:1px solid red;">УВОЛИТЬ</button>` : ''}
            </div>
        `;
    });
}

function logout() {
    localStorage.removeItem('user');
    location.reload();
}
