document.addEventListener("DOMContentLoaded", () => {
    // Check if user session exists. If not, kick back to login page.
    const userRole = localStorage.getItem("currentUserRole");
    if (!userRole) {
        window.location.href = "login.html";
        return;
    }

    // ─── 1. CALCULATE PRODUCTS DATA ───
    let products = localStorage.getItem("inventoryProducts");
    products = products ? JSON.parse(products) : [];

    const totalTypes = products.length;
    let totalStockValue = 0;

    products.forEach(product => {
        const price = parseFloat(product.price) || 0;
        const qty = parseInt(product.quantity) || 0;
        totalStockValue += (price * qty);
    });

    // ─── 2. CALCULATE SALES DATA ───
    // Reads from "inventorySales" (Make sure your sales.html saves logs using this key name)
    let sales = localStorage.getItem("inventorySales");
    sales = sales ? JSON.parse(sales) : [];

    let totalSalesRevenue = 0;
    sales.forEach(sale => {
        const salePrice = parseFloat(sale.price) || 0;
        const saleQty = parseInt(sale.quantity) || 1;
        totalSalesRevenue += (salePrice * saleQty);
    });

    // ─── 3. UPDATE RENDER TEXT ON SCREEN ───
    const typesDisplay = document.getElementById("totalProductTypes");
    const valueDisplay = document.getElementById("totalStockValue");
    const salesDisplay = document.getElementById("totalSalesRevenue");

    if (typesDisplay) {
        typesDisplay.textContent = totalTypes;
    }
    if (valueDisplay) {
        valueDisplay.textContent = `$${totalStockValue.toFixed(2)}`;
    }
    if (salesDisplay) {
        salesDisplay.textContent = `$${totalSalesRevenue.toFixed(2)}`;
    }
});