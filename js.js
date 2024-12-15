// Datos de ejemplo de inicio de sesión (puedes sustituirlo por una API)
const validUsername = 'admin';
const validPassword = '12345';

const loginPage = document.getElementById('loginPage');
const billingPage = document.getElementById('billingPage');
const loginForm = document.getElementById('loginForm');
const loginError = document.getElementById('loginError');

// Función de inicio de sesión
loginForm.addEventListener('submit', (event) => {
    event.preventDefault(); // Evitar que se recargue la página

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Validar las credenciales
    if (username === validUsername && password === validPassword) {
        // Mostrar la página de facturación y ocultar la de inicio de sesión
        loginPage.style.display = 'none';
        billingPage.style.display = 'block';
    } else {
        // Mostrar un mensaje de error si las credenciales son incorrectas
        loginError.style.display = 'block';
    }
});

// Función de Cerrar Sesión
const logoutButton = document.getElementById('logoutButton');
logoutButton.addEventListener('click', () => {
    // Volver a la página de inicio de sesión
    loginPage.style.display = 'block';
    billingPage.style.display = 'none';
    // Limpiar los campos de inicio de sesión
    loginForm.reset();
});

// Facturación
const billingForm = document.getElementById('billingForm');
const invoiceTable = document.getElementById('invoiceTable').querySelector('tbody');
const grandTotalElement = document.getElementById('grandTotal');
const invoiceOutput = document.getElementById('invoiceOutput');
const invoiceDetails = document.getElementById('invoiceDetails');
const themeSelector = document.getElementById('themeSelector');

let grandTotal = 0;
let items = [];

document.getElementById('addItem').addEventListener('click', () => {
    const itemName = document.getElementById('itemName').value.trim();
    const itemPrice = parseFloat(document.getElementById('itemPrice').value);
    const itemQuantity = parseInt(document.getElementById('itemQuantity').value);

    if (!itemName || isNaN(itemPrice) || isNaN(itemQuantity) || itemPrice <= 0 || itemQuantity <= 0) {
        alert('Por favor, completa todos los campos correctamente.');
        return;
    }

    const total = itemPrice * itemQuantity;
    grandTotal += total;

    const newRow = document.createElement('tr');
    newRow.innerHTML = `
        <td>${itemName}</td>
        <td>$${itemPrice.toFixed(2)}</td>
        <td>${itemQuantity}</td>
        <td>$${total.toFixed(2)}</td>
    `;

    invoiceTable.appendChild(newRow);
    grandTotalElement.textContent = grandTotal.toFixed(2);

    items.push({ itemName, itemPrice, itemQuantity, total });
    billingForm.reset();
});

// Función para limpiar la factura
document.getElementById('clearInvoice').addEventListener('click', () => {
    // Limpiar la tabla de productos
    invoiceTable.innerHTML = '';

    // Restablecer el total a 0
    grandTotal = 0;
    grandTotalElement.textContent = '0.00';

    // Limpiar el array de productos
    items = [];
});

// Generar factura
document.getElementById('generateInvoice').addEventListener('click', () => {
    if (items.length === 0) {
        alert('No se han agregado productos.');
        return;
    }

    let invoiceHTML = '<table><tr><th>Producto</th><th>Precio</th><th>Cantidad</th><th>Total</th></tr>';
    items.forEach(item => {
        invoiceHTML += `
            <tr>
                <td>${item.itemName}</td>
                <td>$${item.itemPrice.toFixed(2)}</td>
                <td>${item.itemQuantity}</td>
                <td>$${item.total.toFixed(2)}</td>
            </tr>
        `;
    });
    invoiceHTML += `</table><h3>Total: $${grandTotal.toFixed(2)}</h3>`;

    invoiceDetails.innerHTML = invoiceHTML;
    invoiceOutput.style.display = 'block';
});

document.getElementById('printInvoice').addEventListener('click', () => {
    const printContent = invoiceOutput.innerHTML;
    const newWindow = window.open();
    newWindow.document.write(printContent);
    newWindow.document.close();
    newWindow.print();
    newWindow.close();
});

// Cambiar tema
themeSelector.addEventListener('change', (event) => {
    document.body.className = event.target.value;
});