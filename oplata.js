// oplata.js

document.addEventListener("DOMContentLoaded", function() {
    const payButton = document.getElementById("payButton");
    const paymentDetails = document.getElementById("paymentDetails");

    // Расчет общей суммы
    const morningSessionPrice = 100;
    const eveningSessionPrice = 50;
    const translatorPrice = 20;

    // Получение параметров из URL
    const urlParams = new URLSearchParams(window.location.search);

    // Получаем данные из URL и отображаем
    let detailsHTML = '<h2>Ваши данные:</h2>';
    detailsHTML += `<p><strong>Имя:</strong> ${urlParams.get('fullName')}</p>`;
    detailsHTML += `<p><strong>E-mail:</strong> ${urlParams.get('email')}</p>`;
    detailsHTML += `<p><strong>Телефон:</strong> ${urlParams.get('phone')}</p>`;
    detailsHTML += `<p><strong>Служение:</strong> ${urlParams.get('service')}</p>`;
    detailsHTML += `<p><strong>Страна:</strong> ${urlParams.get('country')}</p>`;
    detailsHTML += `<p><strong>Город:</strong> ${urlParams.get('city')}</p>`;

    // Получаем выбранные сессии
    const morningSessions = urlParams.getAll('morningSession');
    const eveningSessions = urlParams.getAll('eveningSession');
    
    // Расчет стоимости
    let totalAmount = 0;
    totalAmount += morningSessions.length * morningSessionPrice;
    totalAmount += eveningSessions.length * eveningSessionPrice;
    if (urlParams.get('needTranslation') === 'yes') {
        totalAmount += translatorPrice;
    }

    detailsHTML += `<p><strong>Общая стоимость:</strong> ${totalAmount} гривен</p>`;

    // Отображение данных
    paymentDetails.innerHTML = detailsHTML;

    payButton.addEventListener("click", function() {
        // Имитация успешной оплаты
        alert("Оплата успешно проведена!");
    });
});
