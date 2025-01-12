// document.addEventListener("DOMContentLoaded", function() {
//     const cartItemsContainer = document.getElementById("cart-items");
//     const cartTotalContainer = document.getElementById("cartTotal");
//     const totalAmountContainer = document.getElementById("totalAmount");
  
//     function updateCart() {
//       const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
  
//       let cartHtml = "";
//       let cartTotal = 0;
  
//       let uniqueProducts = {};
  
//       cartItems.forEach(item => {
//         const productId = item.productId;
//         const existingProduct = uniqueProducts[productId];
  
//         if (!existingProduct) {
//           uniqueProducts[productId] = true;
  
//           const quantity = item.quantity || 1;
//           const subtotal = item.price * quantity;
//           cartHtml += `
//             <tr>
//               <td><a href="#" class="remove-item" data-product-id="${productId}"><i class="fas fa-times"></i></a></td>
//               <td><img src="Images/MensWear/Model1.jpg" alt="Product Image"></td>
//               <td>${item.name}</td>
//               <td>${item.price.toLocaleString()}</td>
//               <td><input type="number" value="${quantity}" class="quantity" data-product-id="${productId}" min="1"></td>
//               <td class="subtotal">${subtotal.toLocaleString()}</td>
//             </tr>
//           `;
//           cartTotal += subtotal;
//         }
//       });
  
//       cartItemsContainer.innerHTML = cartHtml;
  
//       // Update cart total and total bill
//       cartTotalContainer.textContent = cartTotal.toLocaleString();
//       totalAmountContainer.textContent = cartTotal.toLocaleString();
  
//       localStorage.setItem("cartItems", JSON.stringify(cartItems));
//     }
  
//     cartItemsContainer.addEventListener("change", function(event) {
//       if (event.target.classList.contains("quantity")) {
//         const productId = event.target.dataset.productId;
//         const newQuantity = parseInt(event.target.value);
//         let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
  
//         const itemToUpdate = cartItems.find(item => item.productId === productId);
  
//         if (itemToUpdate) {
//           let updatedQuantity = Math.max(1, newQuantity);
  
//           itemToUpdate.quantity = updatedQuantity;
  
//           event.target.value = updatedQuantity;
  
//           const newSubtotal = itemToUpdate.price * updatedQuantity;
//           const subtotalElement = event.target.closest('tr').querySelector('.subtotal');
  
//           if (subtotalElement) {
//             subtotalElement.textContent = newSubtotal.toLocaleString();
//           } else {
//             console.error("Subtotal element not found!");
//           }
  
//           // Update cart total and total bill
//           let cartTotal = 0;
  
//           cartItems.forEach(item => {
//             const quantity = item.quantity || 1;
//             const subtotal = item.price * quantity;
//             cartTotal += subtotal;
//           });
  
//           cartTotalContainer.textContent = cartTotal.toLocaleString();
//           totalAmountContainer.textContent = cartTotal.toLocaleString();
  
//           localStorage.setItem("cartItems", JSON.stringify(cartItems));
//         }
//       }
//     });
  
//     updateCart();
// });



document.addEventListener("DOMContentLoaded", function() {
    const cartItemsContainer = document.getElementById("cart-items");
    const cartTotalContainer = document.getElementById("cartTotal");
    const totalAmountContainer = document.getElementById("totalAmount");

    function updateCart() {
        const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
        let cartTotal = 0;

        cartItemsContainer.innerHTML = '';

        cartItems.forEach(item => {
            const quantity = item.quantity || 1;
            const subtotal = item.price * quantity;
            cartTotal += subtotal;

            const row = document.createElement("tr");
            row.innerHTML = `
                <td><a href="#" class="remove-item" data-product-id="${item.productId}"><i class="fas fa-times"></i></a></td>
                <td><img src="Images/MensWear/Model1.jpg" alt="Product Image"></td>
                <td>${item.name}</td>
                <td>${item.price.toLocaleString()}</td>
                <td><input type="number" value="${quantity}" class="quantity" data-product-id="${item.productId}" min="1"></td>
                <td class="subtotal">${subtotal.toLocaleString()}</td>
            `;
            cartItemsContainer.appendChild(row);
        });

        cartTotalContainer.textContent = cartTotal.toLocaleString();
        totalAmountContainer.textContent = cartTotal.toLocaleString();
    }

    // Update quantity and subtotal when quantity changes
    const quantityInputs = document.querySelectorAll(".quantity");
    quantityInputs.forEach(input => {
        input.addEventListener("change", function(event) {
            const productId = event.target.dataset.productId;
            const newQuantity = parseInt(event.target.value);
            let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

            const itemToUpdate = cartItems.find(item => item.productId === productId);

            if (itemToUpdate) {
                const updatedQuantity = Math.max(1, newQuantity);
                itemToUpdate.quantity = updatedQuantity;

                // Update subtotal for the item
                const newSubtotal = itemToUpdate.price * updatedQuantity;
                event.target.closest('tr').querySelector('.subtotal').textContent = newSubtotal.toLocaleString();

                // Update cart total and total amount
                let cartTotal = 0;
                cartItems.forEach(item => {
                    const quantity = item.quantity || 1;
                    const subtotal = item.price * quantity;
                    cartTotal += subtotal;
                });

                cartTotalContainer.textContent = cartTotal.toLocaleString();
                totalAmountContainer.textContent = cartTotal.toLocaleString();

                localStorage.setItem("cartItems", JSON.stringify(cartItems));
            }
        });
    });

    updateCart();
});
