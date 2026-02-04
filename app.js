// Функция для входа в систему
function login(phone, password) {
    // Удаляем лишние пробелы, если они есть
    const cleanPhone = phone.trim();
    const cleanPass = password.trim();

    // ПРОВЕРКА ВАШЕГО НОМЕРА (ДИРЕКТОР)
    if (cleanPhone === "705163333" && cleanPass === "admin123") {
        const user = {
            name: "С.А.Б",
            role: "director",
            phone: "705163333"
        };
        // Сохраняем в память браузера
        localStorage.setItem('user', JSON.stringify(user));
        return true; // Вход разрешен
    }
    
    // Проверка остальных из "базы" (localStorage)
    let users = JSON.parse(localStorage.getItem('users_db') || '[]');
    let foundUser = users.find(u => u.phone === cleanPhone && u.pass === cleanPass);

    if (foundUser) {
        localStorage.setItem('user', JSON.stringify(foundUser));
        return true;
    } else {
        alert("Ошибка: Неверный номер или пароль");
        return false;
    }
}
