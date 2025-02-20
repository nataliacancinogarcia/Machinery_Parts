// Function cart products and pdf
function addToCartAndGo() {
    const quantities = document.querySelectorAll('.quantity-input');
    let selectedItems = JSON.parse(localStorage.getItem('selectedItems')) || [];
    
    quantities.forEach((input) => {
        const quantity = parseInt(input.value);
        if (quantity > 0) {
            const row = input.closest('tr');
            const itemData = Array.from(row.children).slice(0, -1).map(td => td.textContent);

            // Verify item
            const existingItem = selectedItems.find(item => item.articleNumber === itemData[1]);
            if (existingItem) {
                existingItem.quantity += quantity; 
            } else {
                selectedItems.push({
                    item: itemData[0],
                    articleNumber: itemData[1],
                    designation: itemData[2],
                    quantity: quantity
                });
            }
        }
    });

    // update localStorage
    localStorage.setItem('selectedItems', JSON.stringify(selectedItems));

    
    location.href = '../print.html';
}

// load print without products
function loadCartItems() {
    const selectedItems = JSON.parse(localStorage.getItem('selectedItems')) || [];
    const tableBody = document.getElementById('table-body');

    tableBody.innerHTML = ''; 

    if (selectedItems.length === 0) {
        // mesage 
        tableBody.innerHTML = '<tr><td colspan="5" style="text-align:center; color:red;">No hay productos en la lista de selección.</td></tr>';
        return;
    }

    selectedItems.forEach((item, index) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${item.item}</td>
            <td>${item.articleNumber}</td>
            <td>${item.designation}</td>
            <td>${item.quantity}</td>
            <td><button class="delete-btn" onclick="removeCartItem(${index})">Delete</button></td>
        `;
        tableBody.appendChild(tr);
    });
}

// delete products
function removeCartItem(index) {
    let selectedItems = JSON.parse(localStorage.getItem('selectedItems')) || [];
    selectedItems.splice(index, 1);
    localStorage.setItem('selectedItems', JSON.stringify(selectedItems));
    loadCartItems();
}


function clearCart() {
    if (confirm('¿Estás seguro de que deseas limpiar la lista de selección?')) {
        localStorage.removeItem('selectedItems');
        document.getElementById('table-body').innerHTML = '<tr><td colspan="5" style="text-align:center; color:red;">No hay productos en la lista de selección.</td></tr>';
    }
}


function Quote() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const company = document.getElementById('company').value;
    const location = document.getElementById('location').value;

    if (!name || !email || !company || !location) {
        alert('Todos los campos son obligatorios.');
        return;
    }

    const selectedItems = JSON.parse(localStorage.getItem('selectedItems')) || [];

    if (selectedItems.length === 0) {
        alert('No hay productos en la lista de selección.');
        return;
    }

    // PDF and upload to server
    generatePDF(name, email, company, location);


    localStorage.removeItem('selectedItems');
    document.getElementById('table-body').innerHTML = '<tr><td colspan="5" style="text-align:center; color:red;">No hay productos en la lista de selección.</td></tr>';
}

// load items
window.onload = loadCartItems;