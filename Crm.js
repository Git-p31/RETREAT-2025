let currentId = 1;

document.addEventListener('crmData', function(event) {
    const data = event.detail;
    addRowToCRM(data);
});

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

function addRowToCRM(data) {
    const table = document.getElementById('crm-table').getElementsByTagName('tbody')[0];
    const newRow = table.insertRow();
    newRow.setAttribute('data-id', currentId);

    const idCell = newRow.insertCell(0);
    idCell.textContent = currentId;

    const values = [
        data.fullName,
        data.email,
        data.phone,
        data.service,
        data.country,
        data.city,
        data.needTranslation,
        data.morningSessions.join(', '),
        data.eveningSessions.join(', '),
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

function editRow(row) {
    const inputs = row.getElementsByTagName('input');
    for (const input of inputs) {
        input.disabled = !input.disabled;
    }
}

function deleteRow(row) {
    row.remove();
}

function deleteData(row) {
    const inputs = row.getElementsByTagName('input');
    for (const input of inputs) {
        input.value = '';
    }
}
