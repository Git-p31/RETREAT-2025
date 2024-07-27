document.addEventListener("DOMContentLoaded", function() {
    // Получаем параметры из URL
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    // Извлекаем параметры из URL
    const fullName = urlParams.get('fullName');
    const email = urlParams.get('email');
    const phone = urlParams.get('phone');
    const service = urlParams.get('service');
    const country = urlParams.get('country');
    const city = urlParams.get('city');
    const needTranslation = urlParams.get('needTranslation');
    const morningSessions = urlParams.getAll('morningSession');
    const eveningSessions = urlParams.getAll('eveningSession');

    // Вычисляем сумму для утренних и вечерних сессий
    const morningSessionPrice = 100; // Цена за утреннюю сессию (гривны)
    const eveningSessionPrice = 50; // Цена за вечернюю сессию (гривны)
    const translationPrice = 20; // Цена за перевод (гривны)

    const totalMorningSessions = morningSessions.length * morningSessionPrice;
    const totalEveningSessions = eveningSessions.length * eveningSessionPrice;
    const totalTranslation = needTranslation === 'yes' ? translationPrice : 0;

    const totalPrice = totalMorningSessions + totalEveningSessions + totalTranslation;

    // Строим текст для отображения деталей оплаты
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

    // Вставляем детали оплаты на страницу
    document.getElementById('paymentDetails').innerHTML = paymentDetailsHTML;

    // Находим кнопку оплаты
    const payButton = document.getElementById('payButton');

    // Добавляем текст с суммой к кнопке оплаты
    payButton.innerText += ` (${totalPrice} грн)`;

    // Добавляем обработчик события для кнопки оплаты
    payButton.addEventListener('click', function() {
        // Здесь будет код для обработки оплаты, который вы хотите добавить
        // Например, перенаправление пользователя на страницу оплаты или другие действия
    });
});
