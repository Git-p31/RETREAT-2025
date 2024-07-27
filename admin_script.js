document.addEventListener('DOMContentLoaded', function() {
    const userForm = document.getElementById('user-form');
    const userList = document.getElementById('user-list');
    let userId = 1;

    // Список стран
    var countries = [
        "Австралия", "Австрия", "Азербайджан", "Албания", "Алжир", "Ангола", "Андорра", "Антигуа и Барбуда",
        "Аргентина", "Армения", "Афганистан", "Багамские Острова", "Бангладеш", "Барбадос", "Бахрейн", "Беларусь",
        "Белиз", "Бельгия", "Бенин", "Болгария", "Боливия", "Босния и Герцеговина", "Ботсвана", "Бразилия",
        "Бруней", "Буркина-Фасо", "Бурунди", "Бутан", "Вануату", "Ватикан", "Великобритания", "Венгрия",
        "Венесуэла", "Вьетнам", "Габон", "Гаити", "Гайана", "Гамбия", "Гана", "Гватемала", "Гвинея", "Гвинея-Бисау",
        "Германия", "Гондурас", "Гренада", "Греция", "Грузия", "Дания", "Джибути", "Доминика", "Доминиканская Республика",
        "Египет", "Замбия", "Зимбабве", "Израиль", "Индия", "Индонезия", "Иордания", "Ирак", "Иран", "Ирландия",
        "Исландия", "Испания", "Италия", "Йемен", "Кабо-Верде", "Казахстан", "Камбоджа", "Камерун", "Канада",
        "Катар", "Кения", "Кипр", "Киргизия", "Кирибати", "Китай", "Колумбия", "Коморы", "Конго (Браззавиль)",
        "Конго (Киншаса)", "Коста-Рика", "Кот-д'Ивуар", "Куба", "Кувейт", "Лаос", "Латвия", "Лесото", "Либерия",
        "Ливан", "Ливия", "Литва", "Лихтенштейн", "Люксембург", "Маврикий", "Мавритания", "Мадагаскар", "Македония",
        "Малави", "Малайзия", "Мали", "Мальдивы", "Мальта", "Марокко", "Маршалловы Острова", "Мексика", "Микронезия",
        "Мозамбик", "Молдова", "Монако", "Монголия", "Мьянма", "Намибия", "Науру", "Непал", "Нигер", "Нигерия",
        "Нидерланды", "Никарагуа", "Новая Зеландия", "Норвегия", "ОАЭ", "Оман", "Пакистан", "Палау", "Панама",
        "Папуа – Новая Гвинея", "Парагвай", "Перу", "Польша", "Португалия", "Россия", "Руанда", "Румыния",
        "Сальвадор", "Самоа", "Сан-Марино", "Сан-Томе и Принсипи", "Саудовская Аравия", "Свазиленд", "Сейшельские Острова",
        "Сенегал", "Сент-Винсент и Гренадины", "Сент-Китс и Невис", "Сент-Люсия", "Сербия", "Сингапур", "Сирия",
        "Словакия", "Словения", "США", "Соломоновы Острова", "Сомали", "Судан", "Суринам", "Сьерра-Леоне",
        "Таджикистан", "Таиланд", "Танзания", "Тимор-Лесте", "Того", "Тонга", "Тринидад и Тобаго", "Тувалу", "Тунис",
        "Туркменистан", "Турция", "Уганда", "Узбекистан", "Украина", "Уругвай", "Фиджи", "Филиппины", "Финляндия",
        "Франция", "Хорватия", "ЦАР", "Чад", "Черногория", "Чехия", "Чили", "Швейцария", "Швеция", "Шри-Ланка",
        "Эквадор", "Экваториальная Гвинея", "Эритрея", "Эсватини", "Эстония", "Эфиопия", "ЮАР", "Южный Судан",
        "Ямайка", "Япония"
    ];

    // Обработчик события для добавления пользователя
    userForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        const firstName = document.getElementById('first-name').value;
        const lastName = document.getElementById('last-name').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const service = document.getElementById('service').value;
        const country = document.getElementById('country').value;
        const city = document.getElementById('city').value;
        const attendanceDate = getAttendanceDate(); // Теперь получаем дату из функции
        const morningSession = document.querySelector('input[name="morningSession"]:checked') ? 'Да' : 'Нет';
        const eveningSession = document.querySelector('input[name="eveningSession"]:checked') ? 'Да' : 'Нет';
        const translationNeeded = document.querySelector('input[name="translation"]:checked').value;

        addUser(firstName, lastName, email, phone, service, country, city, attendanceDate, morningSession, eveningSession, translationNeeded);
        userForm.reset();
    });

    // Функция для добавления пользователя в таблицу
    function addUser(firstName, lastName, email, phone, service, country, city, attendanceDate, morningSession, eveningSession, translationNeeded) {
        const userRow = document.createElement('tr');
        userRow.innerHTML = `
            <td>${userId}</td>
            <td>${firstName}</td>
            <td>${lastName}</td>
            <td>${email}</td>
            <td>${phone}</td>
            <td>${service}</td>
            <td>${country}</td>
            <td>${city}</td>
            <td>${attendanceDate}</td>
            <td>${morningSession}</td>
            <td>${eveningSession}</td>
            <td>${translationNeeded}</td>
            <td>
                <button class="edit-btn">Редактировать</button>
                <button class="delete-btn">Удалить</button>
            </td>
        `;
        userList.appendChild(userRow);

        userId++;
    }

    // Получение выбранной даты участия из таблицы
    function getAttendanceDate() {
        const dateInputs = document.querySelectorAll('input[type="checkbox"][name="morningSession"], input[type="checkbox"][name="eveningSession"]');
        let dates = [];
        dateInputs.forEach(input => {
            if (input.checked) {
                dates.push(input.value.split('-')[0]); // Получаем дату из значения чекбокса
            }
        });
        return dates.join(', '); // Возвращаем список выбранных дат
    }

    // Генерация списка стран при загрузке страницы
    displayCountries();

    // Функция для отображения списка стран
    function displayCountries() {
        var select = document.getElementById('country');
        countries.sort(); // Сортируем страны по алфавиту
        for (var i = 0; i < countries.length; i++) {
            var option = document.createElement('option');
            option.value = countries[i];
            option.textContent = countries[i];
            select.appendChild(option);
        }
    }

    // Обработчик события для редактирования и удаления пользователя
    userList.addEventListener('click', function(event) {
        const target = event.target;
        const row = target.parentElement.parentElement;
        const action = target.textContent;

        if (action === 'Редактировать') {
            // Логика для редактирования пользователя
            editUser(row);
        } else if (action === 'Удалить') {
            // Логика для удаления пользователя
            deleteUser(row);
        }
    });

    // Функция для редактирования пользователя
    function editUser(row) {
        // Получаем данные пользователя из строки таблицы
        const cells = row.querySelectorAll('td');
        const firstName = cells[1].textContent;
        const lastName = cells[2].textContent;
        const email = cells[3].textContent;
        const phone = cells[4].textContent;
        const service = cells[5].textContent;
        const country = cells[6].textContent;
        const city = cells[7].textContent;
        const attendanceDate = cells[8].textContent;
        const morningSession = cells[9].textContent;
        const eveningSession = cells[10].textContent;
        const translationNeeded = cells[11].textContent;

        // Заполняем форму данными пользователя для редактирования
        document.getElementById('first-name').value = firstName;
        document.getElementById('last-name').value = lastName;
        document.getElementById('email').value = email;
        document.getElementById('phone').value = phone;
        document.getElementById('service').value = service;
        document.getElementById('country').value = country;
        document.getElementById('city').value = city;
        // Разбиваем строку с датами на отдельные даты и отмечаем соответствующие чекбоксы
        const dates = attendanceDate.split(', ');
        dates.forEach(date => {
            const parts = date.split('-');
            if (parts[1] === 'утро') {
                document.querySelector(`input[name="morningSession"][value="${parts[0]}-утро"]`).checked = true;
            }
            if (parts[1] === 'вечер') {
                document.querySelector(`input[name="eveningSession"][value="${parts[0]}-вечер"]`).checked = true;
            }
        });
        document.querySelector(`input[name="translation"][value="${translationNeeded}"]`).checked = true;
    }

    // Функция для удаления пользователя
    function deleteUser(row) {
        row.remove();
    }
});
