document.addEventListener("DOMContentLoaded", () => {
    const productForm = document.getElementById("productForm");

    if (productForm) {
        productForm.addEventListener("submit", (e) => {
            e.preventDefault();

            // Get input fields
            const name = document.getElementById("productName").value.trim();
            const price = parseFloat(document.getElementById("productPrice").value) || 0;
            const quantity = parseInt(document.getElementById("productQty").value) || 0;

            // Get existing products from localStorage
            let products = localStorage.getItem("inventoryProducts");
            products = products ? JSON.parse(products) : [];

            // Add new product object
            products.push({ name, price, quantity });

            // Save back to localStorage
            localStorage.setItem("inventoryProducts", JSON.stringify(products));

            alert("Product Added Successfully!");
            productForm.reset();
        });
    }
});