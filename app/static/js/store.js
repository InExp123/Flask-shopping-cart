if (document.readyState == "loading") {
    document.addEventListener("DOMContentLoaded", ready);
} else {
    ready();
}

function ready() {
    let removeCartItemButtons = document.getElementsByClassName("btn-danger");
    for (let i = 0; i < removeCartItemButtons.length; i++) {
        let button = removeCartItemButtons[i];
        button.addEventListener("click", removeCartItem);
    }

    let quantityInput = document.getElementsByClassName("cart-quantity-input");
    for (let i = 0; i < quantityInput.length; i++) {
        let input = quantityInput[i];
        input.addEventListener("change", quantityUpdate);
    }

    let addToCart = document.getElementsByClassName("shop-item-button");
    for (let i = 0; i < addToCart.length; i++) {
        let newCartItem = addToCart[i];
        newCartItem.addEventListener("click", cartUpdate);
    }

    document.getElementsByClassName("btn-purchase")[0].addEventListener("click", purchase);
}

function purchase() {
    alert("Thank you for the purchase");
    let cartItems = document.getElementsByClassName("cart-items")[0];
    while (cartItems.hasChildNodes()) {
        cartItems.removeChild(cartItems.firstChild)
    }
}

function cartUpdate(event) {
    let cart = event.target;
    let cartElement = cart.parentElement.parentElement;
    let title = cartElement.getElementsByClassName("shop-item-title")[0]
        .innerHTML;
    let imgsrc = cartElement.getElementsByClassName("shop-item-image")[0].src;
    let price = cartElement.getElementsByClassName("shop-item-price")[0]
        .innerHTML;
    addNewCart(title, price, imgsrc);
}

function addNewCart(title, price, imgsrc) {
    let createRow = document.createElement("div");
    createRow.classList.add("cart-row");
    let totalCart = document.getElementsByClassName("cart-items")[0];
    totalCartTitles = totalCart.getElementsByClassName("cart-item-title");

    for (let i = 0; i < totalCartTitles.length; i++) {
        if (totalCartTitles[i].innerText === title) {
            alert("This item already added in the purchase cart");
            return;
        }
    }

    createRow.innerHTML = `
  <div class="cart-item cart-column">
  <img class="cart-item-image" src=${imgsrc} width="100" height="100" />
  <span class="cart-item-title">${title}</span>
</div>
<span class="cart-price cart-column">${price}</span>
<div class="cart-quantity cart-column">
  <input class="cart-quantity-input" type="number" value="1" />
  <button class="btn btn-danger" type="button">REMOVE</button>
</div>`;
    totalCart.append(createRow);
    updateCartTotal()
    createRow.getElementsByClassName("btn-danger")[0].addEventListener("click", removeCartItem);
    createRow.getElementsByClassName("cart-quantity-input")[0].addEventListener("change", quantityUpdate);
}

function quantityUpdate(event) {
    let quantity = event.target;
    if (isNaN(quantity.value) || quantity.value <= 0) {
        quantity.value = 1;
    }
    updateCartTotal();
}

function removeCartItem(event) {
    let buttonClicked = event.target;
    buttonClicked.parentElement.parentElement.remove();
    updateCartTotal();
}

function updateCartTotal() {
    let total = 0;
    let cartItemContainer = document.getElementsByClassName("cart-items")[0];
    let cartRows = cartItemContainer.getElementsByClassName("cart-row");

    for (let i = 0; i < cartRows.length; i++) {
        let value = parseFloat(
            cartRows[i]
                .getElementsByClassName("cart-price")[0]
                .innerHTML.replace("$", "")
        );
        let quantity = cartRows[i].getElementsByClassName("cart-quantity-input")[0]
            .value;
        total += value * quantity;
    }
    total = Math.round(total * 100) / 100;
    document.getElementsByClassName("cart-total-price")[0].innerHTML =
        "$" + total;
}
