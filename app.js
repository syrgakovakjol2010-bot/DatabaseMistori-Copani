// Конфигурация пользователей (начальная база)
// В будущем эти данные будут подтягиваться из Firebase
let currentUser = null;

// Функция для входа в систему
async function login(phone, password) {
    // 1. Проверка: заносим ваш номер как главного директора
    if (phone === "705163333" && password === "admin123") {
        currentUser = {
            name: "С.А.Б",
            role: "director",
            phone: "705163333"
        };
        localStorage.setItem('user', JSON.stringify(currentUser));
        renderDashboard();
        return;
    }
    
    // Здесь будет логика проверки остальных сотрудников из базы данных
    alert("Ошибка: Неверный номер или пароль");
}

// Функция отрисовки интерфейса в зависимости от роли
function renderDashboard() {
    const app = document.getElementById('app');
    const user = JSON.parse(localStorage.getItem('user'));

    if (!user) return;

    // Очищаем экран и создаем структуру
    app.innerHTML = `
        <div class="sidebar">
            <h2>${user.name}</h2>
            <p>Роль: ${user.role.toUpperCase()}</p>
            <nav>
                <button onclick="showOrders()">Заказы</button>
                <button onclick="showStaff()">Сотрудники</button>
                ${(user.role === 'director' || user.role === 'deputy') ? '<button onclick="showAdmin()">Админ-панель</button>' : ''}
            </nav>
        </div>
        <div class="main-content">
            <header class="stats">
                <div class="stat-card">Свободно: <span id="free-count">0</span></div>
                <div class="stat-card">В процессе: <span id="process-count">0</span></div>
                <div class="stat-card">Закрыто: <span id="closed-count">0</span></div>
            </header>
            <div id="content-area">
                </div>
        </div>
    `;
    
    loadOrders(); // По умолчанию показываем заказы
}

// Логика заказов (для программистов и менеджеров)
function loadOrders() {
    const area = document.getElementById('content-area');
    area.innerHTML = `
        <h2 class="title">Актуальные заказы</h2>
        <div id="orders-list"></div>
    `;
    // Тут будет цикл, который берет заказы из базы данных
}

// Функция добавления заказа (доступна Менеджеру и Директору)
function addOrder(clientData) {
    // При добавлении проверяем наличие всех полей: имя, описание, дедлайн, фото
    console.log("Заказ добавлен в базу:", clientData);
}

// Функция выдачи выговора (только для Менеджера и выше)
function issueReprimand(employeeId) {
    if (currentUser.role === 'manager' || currentUser.role === 'director') {
        console.log(`Сотруднику ${employeeId} выдан выговор`);
    }
}

