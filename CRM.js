document.addEventListener('DOMContentLoaded', () => {
    const table = document.getElementById('crmTable');
    let currentRow = null;
  
    // Функция для редактирования ячеек
    const editCell = (cell) => {
      const field = cell.getAttribute('data-field');
      const originalValue = cell.textContent.trim();
  
      // Создание поля ввода
      const input = document.createElement('input');
      input.type = 'text';
      input.value = originalValue;
      input.className = 'edit-input';
      
      cell.innerHTML = '';
      cell.appendChild(input);
  
      // При потере фокуса сохраняем данные
      input.addEventListener('blur', () => {
        const newValue = input.value.trim();
        if (newValue !== originalValue) {
          cell.textContent = newValue;
          console.log(`Сохранено ${field}: ${newValue}`);
        } else {
          cell.textContent = originalValue;
        }
      });
  
      // При нажатии клавиши Enter также сохраняем данные
      input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
          input.blur();
        }
      });
    };
  
    // Функция для редактирования всей строки
    const editRow = (row) => {
      const cells = row.querySelectorAll('.editable');
      cells.forEach(cell => editCell(cell));
  
      // Показать кнопку "Сохранить"
      row.querySelector('.save-btn').style.display = 'inline-block';
      currentRow = row;
    };
  
    // Сохранение изменений строки
    const saveRow = (row) => {
      const cells = row.querySelectorAll('.editable');
      cells.forEach(cell => {
        const input = cell.querySelector('.edit-input');
        if (input) {
          cell.textContent = input.value.trim();
        }
      });
      
      // Скрыть кнопку "Сохранить"
      row.querySelector('.save-btn').style.display = 'none';
      currentRow = null;
  
      // Здесь можно отправить данные на сервер
      console.log('Изменения сохранены');
    };
  
    // Обработка клика на ячейку
    table.addEventListener('click', (e) => {
      const target = e.target;
      if (target.classList.contains('editable')) {
        editCell(target);
      }
    });
  
    // Обработка кнопки "Редактировать"
    table.addEventListener('click', (e) => {
      if (e.target.classList.contains('edit-btn')) {
        const row = e.target.closest('tr');
        editRow(row);
      }
    });
  
    // Обработка кнопки "Сохранить"
    table.addEventListener('click', (e) => {
      if (e.target.classList.contains('save-btn')) {
        const row = e.target.closest('tr');
        saveRow(row);
      }
    });
  });
  