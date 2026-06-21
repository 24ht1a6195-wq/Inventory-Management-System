document.addEventListener("DOMContentLoaded", () => {
    const productSelect = document.getElementById("salesProductSelect");
    const salesForm = document.getElementById("salesForm");
    const salesTableBody = document.getElementById("salesHistoryTableBody");

    // Load available products from local storage array
    let products = localStorage.getItem("inventoryProducts");
    products = products ? JSON.parse(products) : [];

    // Load old sales transactions list from local storage
    let sales = localStorage.getItem("inventorySales");
    sales = sales ? JSON.parse(sales) : [];

    // ─── 1. POPULATE DROPDOWN SELECTION OPTIONALLY FROM STORAGE ───
    if (productSelect) {
        products.forEach((product, index) => {
            // Only show items that have at least 1 quantity in stock
            if (product.quantity > 0) {
                const option = document.createElement("option");
                option.value = index; // Store array index reference number
                option.textContent = `${product.name} (In Stock: ${product.quantity} | Price: $${product.price})`;
                productSelect.appendChild(option);
            }
        });
    }

    // ─── 2. RENDER SALES HISTORY LOG ───
    function renderSalesHistory() {
        if (!salesTableBody) return;
        salesTableBody.innerHTML = ""; // Reset grid content safely

        sales.forEach(sale => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${sale.name}</td>
                <td>${sale.quantity}</td>
                <td>$${(parseFloat(sale.price) * parseInt(sale.quantity)).toFixed(2)}</td>
            `;
            salesTableBody.appendChild(row);
        });
    }

    // ─── 3. SUBMIT NEW SALES TRANSACTION LOGIC ───
    if (salesForm) {
        salesForm.addEventListener("submit", (e) => {
            e.preventDefault();

            const selectedIndex = productSelect.value;
            const quantityToSell = parseInt(document.getElementById("salesQuantity").value) || 0;

            if (selectedIndex === "") {
                alert("Please select a valid product first!");
                return;
            }

            const targetProduct = products[selectedIndex];

            // Safety rule validation: Check if stock is sufficient
            if (quantityToSell > targetProduct.quantity) {
                alert(`Insufficient stock! You only have ${targetProduct.quantity} units left.`);
                return;
            }

            // Deduct sold quantity value from storage inventory array
            targetProduct.quantity -= quantityToSell;

            // Push transaction record item to sales log database array
            const saleRecord = {
                name: targetProduct.name,
                quantity: quantityToSell,
                price: targetProduct.price
            };
            sales.push(saleRecord);

            // Save both updated arrays back securely to LocalStorage
            localStorage.setItem("inventoryProducts", JSON.stringify(products));
            localStorage.setItem("inventorySales", JSON.stringify(sales));

            alert("Product Sold Successfully!");
            
            // Reload page elements to update values instantly
            window.location.reload();
        });
    }

    // Initialize historical render list on screen run
    renderSalesHistory();
});