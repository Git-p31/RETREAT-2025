document.addEventListener("DOMContentLoaded", function() {
    fetch('/api/get_data')
        .then(response => response.json())
        .then(data => {
            const tableBody = document.querySelector('#crm-table tbody');
            data.forEach(item => {
                const row = document.createElement('tr');

                row.innerHTML = `
                    <td>${item.id}</td>
                    <td>${item.fullName}</td>
                    <td>${item.email}</td>
                    <td>${item.phone}</td>
                    <td>${item.service}</td>
                    <td>${item.country}</td>
                    <td>${item.city}</td>
                    <td>${item.needTranslation}</td>
                    <td>${item.morningSessions}</td>
                    <td>${item.eveningSessions}</td>
                    <td>${item.totalPrice}</td>
                    <td>${item.paymentStatus}</td>
                `;

                tableBody.appendChild(row);
            });
        });
});
