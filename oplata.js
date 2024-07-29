// oplata.js

document.addEventListener("DOMContentLoaded", function() {
    const payButton = document.getElementById("payButton");
    const paymentDetails = document.getElementById("paymentDetails");
    const qrCode = document.getElementById("qrCode");

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
        // Генерация QR-кода
        const qrData = `Имя: ${urlParams.get('fullName')}\nE-mail: ${urlParams.get('email')}\nТелефон: ${urlParams.get('phone')}\nСлужение: ${urlParams.get('service')}\nСтрана: ${urlParams.get('country')}\nГород: ${urlParams.get('city')}\nОбщая стоимость: ${totalAmount} гривен\nСтатус оплаты: Успешно`;
        
        $('#qrCode').qrcode({
            text: qrData,
            width: 200,
            height: 200
        });
        $('#qrCode').show();
        
        alert("Оплата успешно проведена!");
    });
});
