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

// Функция для отображения стран в выпадающем списке
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

document.addEventListener("DOMContentLoaded", function() {
    // Обработчик события на клик кнопки "Участвовать"
    document.getElementById('payButton').addEventListener('click', function(event) {
        event.preventDefault(); // Отменяем стандартное действие формы

        // Получаем параметры из формы
        const fullName = document.getElementById('firstName').value + ' ' + document.getElementById('lastName').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const service = document.getElementById('service').value;
        const country = document.getElementById('country').value;
        const city = document.getElementById('city').value;
        const morningSessions = getCheckedSessions('morningSession');
        const eveningSessions = getCheckedSessions('eveningSession');
        const needTranslation = document.getElementById('needTranslationYes').checked ? 'yes' : 'no';

        // Строим URL для перенаправления на oplata.html с параметрами
        let redirectURL = `oplata.html?fullName=${encodeURIComponent(fullName)}&email=${encodeURIComponent(email)}&phone=${encodeURIComponent(phone)}&service=${encodeURIComponent(service)}&country=${encodeURIComponent(country)}&city=${encodeURIComponent(city)}&needTranslation=${needTranslation}`;

        // Добавляем параметры выбранных сессий
        morningSessions.forEach(session => {
            redirectURL += `&morningSession=${encodeURIComponent(session)}`;
        });
        eveningSessions.forEach(session => {
            redirectURL += `&eveningSession=${encodeURIComponent(session)}`;
        });

        // Перенаправляем пользователя на oplata.html
        window.location.href = redirectURL;
    });
    
    // Отображение списка стран при загрузке страницы
    displayCountries();
});

// Функция для получения выбранных сессий
function getCheckedSessions(sessionType) {
    const sessions = document.querySelectorAll(`input[name="${sessionType}"]:checked`);
    const sessionValues = [];
    sessions.forEach(session => {
        sessionValues.push(session.value);
    });
    return sessionValues;
}
