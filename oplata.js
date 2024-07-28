document.addEventListener("DOMContentLoaded", function() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    const fullName = urlParams.get('fullName');
    const email = urlParams.get('email');
    const phone = urlParams.get('phone');
    const service = urlParams.get('service');
    const country = urlParams.get('country');
    const city = urlParams.get('city');
    const needTranslation = urlParams.get('needTranslation');
    const morningSessions = urlParams.getAll('morningSession');
    const eveningSessions = urlParams.getAll('eveningSession');

    const morningSessionPrice = 100;
    const eveningSessionPrice = 50;
    const translationPrice = 20;

    const totalMorningSessions = morningSessions.length * morningSessionPrice;
    const totalEveningSessions = eveningSessions.length * eveningSessionPrice;
    const totalTranslation = needTranslation === 'yes' ? translationPrice : 0;

    const totalPrice = totalMorningSessions + totalEveningSessions + totalTranslation;

    let paymentDetailsHTML = `
        <p><strong>ФИО:</strong> ${fullName}</p>
        <p><strong>E-mail:</strong> ${email}</p>
        <p><strong>Телефон:</strong> ${phone}</p>
        <p><strong>Выбранное служение:</strong> ${service}</p>
        <p><strong>Страна:</strong> ${country}</p>
        <p><strong>Город:</strong> ${city}</p>
        <p><strong>Нужен ли перевод:</strong> ${needTranslation === 'yes' ? 'Да' : 'Нет'}</p>
        <p><strong>Выбранные сессии:</strong></p>
        <ul>
    `;

    morningSessions.forEach(sessionId => {
        paymentDetailsHTML += `<li>Утренняя сессия: ${sessionId}</li>`;
    });

    eveningSessions.forEach(sessionId => {
        paymentDetailsHTML += `<li>Вечерняя сессия: ${sessionId}</li>`;
    });

    paymentDetailsHTML += `</ul><p><strong>Сумма к оплате:</strong> ${totalPrice} грн</p>`;
    document.getElementById('paymentDetails').innerHTML = paymentDetailsHTML;

    const payButton = document.getElementById('payButton');
    payButton.innerText += ` (${totalPrice} грн)`;

    payButton.addEventListener('click', function() {
        const paymentOption = document.querySelector('input[name="paymentOption"]:checked').value;

        const crmData = { 
            fullName, email, phone, service, country, city, needTranslation, morningSessions, eveningSessions, totalPrice, paymentStatus: paymentOption === 'retreat' ? 'не оплачено' : 'оплачено' 
        };

        // Отправляем данные во второй файл
        sendToCRM(crmData);

        if (paymentOption === 'retreat') {
            generateQRCode(`ID: ${generateId()} - Оплата не выполнена`);
        } else {
            processPayment(fullName, totalPrice)
                .then(qrCode => {
                    displayQRCode(qrCode);
                    sendToCRM({ 
                        fullName, email, phone, service, country, city, needTranslation, morningSessions, eveningSessions, totalPrice, paymentStatus: 'оплачено' 
                    });
                })
                .catch(error => {
                    alert('Произошла ошибка при оплате. Пожалуйста, попробуйте снова.');
                });
        }
    });
});

function sendToCRM(data) {
    // Используем CustomEvent для передачи данных
    const event = new CustomEvent('crmData', { detail: data });
    document.dispatchEvent(event);
}

function processPayment(fullName, totalPrice) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(`QR code for ${fullName} - Total: ${totalPrice} грн`);
        }, 2000);
    });
}

function displayQRCode(qrCode) {
    const qrCodeContainer = document.getElementById('qrCodeContainer');
    qrCodeContainer.classList.remove('hidden');

    const qrCodeElement = document.getElementById('qrCode');
    qrCodeElement.innerHTML = '';

    const qr = new QRCode(qrCodeElement, {
        text: qrCode,
        width: 128,
        height: 128,
    });
}

function generateQRCode(text) {
    const qrCodeContainer = document.getElementById('qrCodeContainer');
    qrCodeContainer.classList.remove('hidden');

    const qrCodeElement = document.getElementById('qrCode');
    qrCodeElement.innerHTML = '';

    const qr = new QRCode(qrCodeElement, {
        text: text,
        width: 128,
        height: 128,
    });
}

function generateId() {
    return Math.floor(Math.random() * 1000000);
}
