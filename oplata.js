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

        if (paymentOption === 'retreat') {
            sendToCRM({ 
                fullName, email, phone, service, country, city, needTranslation, morningSessions, eveningSessions, totalPrice, paymentStatus: 'не оплачено' 
            });
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
    // Функция для отправки данных в CRM
    console.log('Отправка данных в CRM:', data);
    addRowToCRM(data);
}

function processPayment(fullName, totalPrice) {
    // Функция для обработки платежа и получения QR-кода
    return new Promise((resolve, reject) => {
        // Имитация успешного платежа и получения QR-кода
        setTimeout(() => {
            resolve('QR_CODE_PLACEHOLDER');
        }, 2000);
    });
}

function displayQRCode(qrCode) {
    // Функция для отображения QR-кода
    alert(`Ваш QR-код: ${qrCode}`);
}
