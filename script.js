// Функция для загрузки стран из текстового файла и отображения их в выпадающем списке
function loadCountries() {
    fetch('countries.txt')
        .then(response => response.text())
        .then(data => {
            const countries = data.split('\n').map(country => country.trim()).filter(country => country !== '');
            displayCountries(countries);
        })
        .catch(error => console.error('Ошибка при загрузке списка стран:', error));
}

// Функция для отображения стран в выпадающем списке
function displayCountries(countries) {
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
        const pinCode = document.getElementById('pinCode').value;

        // Строим URL для перенаправления на oplata.html с параметрами
        let redirectURL = `oplata.html?fullName=${encodeURIComponent(fullName)}&email=${encodeURIComponent(email)}&phone=${encodeURIComponent(phone)}&service=${encodeURIComponent(service)}&country=${encodeURIComponent(country)}&city=${encodeURIComponent(city)}&needTranslation=${needTranslation}&pinCode=${encodeURIComponent(pinCode)}`;

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
    
    // Загрузка и отображение списка стран при загрузке страницы
    loadCountries();
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


document.addEventListener("DOMContentLoaded", function() {
    // Обработчик события на клик кнопки "Ввести пин-код"
    document.getElementById('pinButton').addEventListener('click', function() {
        document.getElementById('pinContainer').classList.remove('hidden');
    });

    // Обработчик события на клик кнопки "Подтвердить"
    document.getElementById('submitPin').addEventListener('click', function() {
        const pinCode = document.getElementById('pinCode').value;
        
        // Здесь вы можете добавить логику проверки пин-кода
        
        // Если пин-код верный, перенаправляем пользователя на Crm.html
        if (pinCode === "1995") {
            window.location.href = "Crm.html";
        } else {
            alert("Неверный пин-код. Попробуйте снова.");
        }
    });
});
