document.addEventListener("DOMContentLoaded", function() {
    const payButton = document.getElementById('payButton');
    payButton.addEventListener('click', function() {
        const crmData = { 
            fullName: "Имя Фамилия",
            email: "email@example.com",
            phone: "1234567890",
            service: "Служение",
            country: "Страна",
            city: "Город",
            needTranslation: "yes",
            morningSessions: ["Session1"],
            eveningSessions: ["Session2"],
            totalPrice: 100,
            paymentStatus: "оплачено"
        };

        fetch('/api/save_data', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(crmData)
        })
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success') {
                alert('Данные успешно сохранены!');
            }
        });
    });
});
