// script.js

function loadCountries() {
    fetch('countries.txt')
        .then(response => response.text())
        .then(data => {
            const countries = data.split('\n').map(country => country.trim()).filter(country => country !== '');
            displayCountries(countries);
        })
        .catch(error => console.error('Ошибка при загрузке списка стран:', error));
}

function loadCountryCodes() {
    fetch('countriesphone.txt')
        .then(response => response.text())
        .then(data => {
            const countryCodes = data.split('\n').map(line => {
                const [country, code] = line.split(',');
                return { country: country.trim(), code: code.trim() };
            }).filter(item => item.country && item.code);
            updateCountryCodes(countryCodes);
        })
        .catch(error => console.error('Ошибка при загрузке кодов стран:', error));
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

function updateCountryCodes(countryCodes) {
    var phoneInput = document.getElementById('phone');
    var countrySelect = document.getElementById('country');

    countrySelect.addEventListener('change', function() {
        const selectedCountry = countrySelect.value;
        const country = countryCodes.find(item => item.country === selectedCountry);
        if (country) {
            phoneInput.placeholder = `Телефон (${country.code})`;
        }
    });

    // Set initial placeholder based on the default selected country
    const defaultCountry = countrySelect.value || countryCodes[0]?.country; // Use the first country if none selected
    const country = countryCodes.find(item => item.country === defaultCountry);
    if (country) {
        phoneInput.placeholder = `Телефон (${country.code})`;
    }
}

document.addEventListener("DOMContentLoaded", function() {
    // Обработчик события на клик кнопки "Участвовать"
    document.getElementById('payButton').addEventListener('click', function(event) {
        event.preventDefault(); // Отменяем стандартное действие формы

        // Получаем параметры из формы
        const firstName = document.getElementById('firstName').value;
        const middleName = document.getElementById('middleName').value;
        const lastName = document.getElementById('lastName').value;
        const fullName = `${firstName} ${middleName ? middleName + ' ' : ''}${lastName}`;
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

    // Загрузка и отображение списка стран и кодов стран при загрузке страницы
    loadCountries();
    loadCountryCodes();
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
