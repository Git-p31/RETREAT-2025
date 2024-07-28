let currentId = 1;

function addRow() {
    const table = document.getElementById('crm-table').getElementsByTagName('tbody')[0];
    const newRow = table.insertRow();
    newRow.setAttribute('data-id', currentId);

    // Добавляем ячейку для ID
    const idCell = newRow.insertCell(0);
    idCell.textContent = currentId;

    const fields = ['Имя фамилия', 'E-mail', 'Телефон', 'Служение', 'Страна', 'Город', 'День участия', 'Нужен ли перевод', 'Оплата'];
    fields.forEach((field, index) => {
        const cell = newRow.insertCell(index + 1);
        const input = document.createElement('input');
        input.type = 'text';
        input.placeholder = field;
        cell.appendChild(input);
    });

    // Добавляем ячейку для статуса оплаты
    const statusCell = newRow.insertCell(fields.length + 1);
    statusCell.textContent = 'не оплачено';

    const actionsCell = newRow.insertCell(fields.length + 2);
    const editButton = document.createElement('button');
    editButton.textContent = 'Редактировать';
    editButton.onclick = () => editRow(newRow);
    actionsCell.appendChild(editButton);

    const deleteRowButton = document.createElement('button');
    deleteRowButton.textContent = 'Удалить строку';
    deleteRowButton.onclick = () => deleteRow(newRow);
    actionsCell.appendChild(deleteRowButton);

    const deleteDataButton = document.createElement('button');
    deleteDataButton.textContent = 'Удалить данные';
    deleteDataButton.onclick = () => deleteData(newRow);
    actionsCell.appendChild(deleteDataButton);

    currentId++;
}

function editRow(row) {
    const inputs = row.getElementsByTagName('input');
    for (const input of inputs) {
        input.disabled = !input.disabled;
    }
}

function deleteRow(row) {
    row.parentNode.removeChild(row);
}

function deleteData(row) {
    const inputs = row.getElementsByTagName('input');
    for (const input of inputs) {
        input.value = '';
    }
}

function addRowToCRM(data) {
    const table = document.getElementById('crm-table').getElementsByTagName('tbody')[0];
    const newRow = table.insertRow();
    newRow.setAttribute('data-id', currentId);

    // Добавляем ячейку для ID
    const idCell = newRow.insertCell(0);
    idCell.textContent = currentId;

    // Заполняем ячейки данными
    Object.values(data).forEach((value, index) => {
        const cell = newRow.insertCell(index + 1);
        const input = document.createElement('input');
        input.type = 'text';
        input.value = value;
        input.disabled = true;
        cell.appendChild(input);
    });

    // Добавляем ячейку для статуса оплаты
    const statusCell = newRow.insertCell(10);
    statusCell.textContent = data.paymentStatus;

    const actionsCell = newRow.insertCell(11);
    const editButton = document.createElement('button');
    editButton.textContent = 'Редактировать';
    editButton.onclick = () => editRow(newRow);
    actionsCell.appendChild(editButton);

    const deleteRowButton = document.createElement('button');
    deleteRowButton.textContent = 'Удалить строку';
    deleteRowButton.onclick = () => deleteRow(newRow);
    actionsCell.appendChild(deleteRowButton);

    const deleteDataButton = document.createElement('button');
    deleteDataButton.textContent = 'Удалить данные';
    deleteDataButton.onclick = () => deleteData(newRow);
    actionsCell.appendChild(deleteDataButton);

    currentId++;
}

document.addEventListener("DOMContentLoaded", function() {
    const payButton = document.getElementById('payButton');
    payButton.addEventListener('click', function() {
        const paymentOption = document.querySelector('input[name="paymentOption"]:checked').value;
        const data = {
            fullName: 'Иван Иванов',
            email: 'ivan@example.com',
            phone: '1234567890',
            service: 'Техническая поддержка',
            country: 'Россия',
            city: 'Москва',
            needTranslation: 'Нет',
            morningSessions: 'Утренняя сессия',
            eveningSessions: 'Вечерняя сессия',
            paymentStatus: paymentOption === 'retreat' ? 'не оплачено' : 'оплачено'
        };

        addRowToCRM(data);

        if (paymentOption === 'retreat') {
            generateQRCode(`Оплата не произведена. ID: ${currentId}`);
        } else {
            // Логика онлайн оплаты и генерации QR кода
        }
    });
});

function generateQRCode(text) {
    const qrCodeContainer = document.getElementById('qrCodeContainer');
    const qrCode = document.getElementById('qrCode');
    qrCode.innerHTML = '';
    new QRCode(qrCode, {
        text: text,
        width: 128,
        height: 128
    });
    qrCodeContainer.classList.remove('hidden');
}
