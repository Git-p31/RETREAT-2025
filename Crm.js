let currentId = 1;

function addRow() {
    const table = document.getElementById('crm-table').getElementsByTagName('tbody')[0];
    const newRow = table.insertRow();
    newRow.setAttribute('data-id', currentId);

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

    const idCell = newRow.insertCell(0);
    idCell.textContent = currentId;

    // Заполняем ячейки данными
    const values = [
        data.fullName,
        data.email,
        data.phone,
        data.service,
        data.country,
        data.city,
        data.needTranslation,
        data.morningSessions.join(', '), // объединяем сессии в строку
        data.eveningSessions.join(', '), // объединяем сессии в строку
        data.paymentStatus
    ];

    values.forEach((value, index) => {
        const cell = newRow.insertCell(index + 1);
        const input = document.createElement('input');
        input.type = 'text';
        input.value = value;
        input.disabled = true;
        cell.appendChild(input);
    });

    const actionsCell = newRow.insertCell(values.length + 1);
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
            morningSessions: ['Утренняя сессия 1', 'Утренняя сессия 2'],
            eveningSessions: ['Вечерняя сессия 1'],
            paymentStatus: paymentOption === 'retreat' ? 'не оплачено' : 'оплачено'
        };

        addRowToCRM(data);
    });
});
