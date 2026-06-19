// Get DOM elements
let lowStockList = document.getElementById("lowStockList");
let totalItemsSoldElem = document.getElementById("totalItemsSold");
let totalRevenueElem = document.getElementById("totalRevenue");

// Load data from LocalStorage
let products = JSON.parse(localStorage.getItem("products")) || [];
let sales = JSON.parse(localStorage.getItem("sales")) || [];

function generateReports() {
    // 1. Check for Low Stock (Quantity less than 5)
    lowStockList.innerHTML = "";
    let lowStockCount = 0;

    products.forEach(function (product) {
        if (parseInt(product.quantity) < 5) {
            lowStockList.innerHTML += `<li><strong>${product.name}</strong> is running low! Only ${product.quantity} left.</li>`;
            lowStockCount++;
        }
    });

    if (lowStockCount === 0) {
        lowStockList.innerHTML = "<li>All items are well stocked! ✅</li>";
    }

    // 2. Calculate Total Items Sold & Total Revenue
    let totalItemsSold = 0;
    let totalRevenue = 0;

    sales.forEach(function (sale) {
        totalItemsSold += parseInt(sale.quantitySold || 0);
        totalRevenue += parseFloat(sale.totalPrice || 0);
    });

    // Update HTML
    totalItemsSoldElem.innerText = totalItemsSold;
    totalRevenueElem.innerText = "$" + totalRevenue.toFixed(2);
}

// Run the function on page load
generateReports();