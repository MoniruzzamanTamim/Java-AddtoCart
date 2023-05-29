// add to cart remove
const adtocart = document.querySelector('.adtocart');
const closeCart = document.querySelector('#close-cart');
const buybtn = document.querySelector('.buybtn');
const shopingIcon = document.querySelector('#shopingIcon');

shopingIcon.addEventListener('click', () => {
  adtocart.classList.add('active');
});

closeCart.addEventListener('click', () => {
  adtocart.classList.remove('active');
});

// cart working js
if (document.readyState == 'loading') {
  document.addEventListener('DOMContentLoaded', ready);
} else {
  ready();
}

// making ready() function
function ready() {
  
  // remove item from cart
  var removecartButton = document.getElementsByClassName('cart-delete');
  console.log(removecartButton);
  for (var i = 0; i < removecartButton.length; i++) {
    var button = removecartButton[i];
    button.addEventListener('click', removeCartItem);
  }

  // quantityChanged
  var quantityInputs = document.getElementsByClassName('cart-quantity');
  for (var i = 0; i < quantityInputs.length; i++) {
    var input = quantityInputs[i];
    input.addEventListener('change', quantityChanged);
  }

  // add to cart
  var addCart = document.getElementsByClassName('addToCart');
  for (var i = 0; i < addCart.length; i++) {
    var button = addCart[i];
    button.addEventListener('click', addCartClicked);
  }

  // buy btn work

  document.getElementsByClassName('buyNowBtn')[0].addEventListener('click' , buyButtonClicked)
  

}

// remove item from cart
function removeCartItem(event) {
  var buttonClicked = event.target;
  buttonClicked.parentElement.remove();
  updateTotal();
}

// quantityChanged
function quantityChanged(event) {
  var input = event.target;
  if (isNaN(input.value) || input.value <= 0) {
    input.value = 1;
  }
  updateTotal();
}

// function update total
function updateTotal() {
  var cartContent = document.getElementsByClassName('cart-context')[0];
  var cartboxes = cartContent.getElementsByClassName('cart-box');
  var total = 0;
  for (var i = 0; i < cartboxes.length; i++) {
    var cartbox = cartboxes[i];
    var priceElement = cartbox.getElementsByClassName('cart-price')[0];
    var QuantityElement = cartbox.getElementsByClassName('cart-quantity')[0];
    var price = parseFloat(priceElement.innerText.replace('$', ''));
    var Quantity = QuantityElement.value;
    total = total + price * Quantity ;
  }
    // price jate . er por duta na hy
    total = Math.round(total *100) / 100;

    document.getElementsByClassName('total-price')[0].innerText = '$' + total;
  }   


// add to cart
function addCartClicked(event) {

  var button = event.target;
  var shopProducts = button.parentElement;
  var productTittle = shopProducts.getElementsByClassName('product-tittle')[0].innerText;
  var productPrice = shopProducts.getElementsByClassName('product-price')[0].innerText;
  var productImage = shopProducts.getElementsByClassName('product-img')[0].src;
  addProductCart(productTittle, productPrice, productImage);
  updateTotal();
}


function addProductCart(productTittle, productPrice, productImage) {
  var cartShopBox = document.createElement('div');
  cartShopBox.classList.add('cart-box');
  var cartItem = document.getElementsByClassName('cart-context')[0];

  var cartItemName = cartItem.getElementsByClassName('cart-tittle-box');
  for (var i = 0; i < cartItemName.length; i++) {
    if (cartItemName[i].innerText === productTittle) {
      alert('You Have Already Added This Item to the Cart');
      return;
    }
  }

  var cartContent = `
    <img src="${productImage}" alt="" class="cart-img">
    <div class="detail-box">
      <div class="cart-tittle-box">${productTittle}</div>
      <div class="cart-price">${productPrice}</div>
      <input type="number" value="1" class="cart-quantity">
    </div>
    <i class='bx bx-trash cart-delete'></i>
  `;

  cartShopBox.innerHTML = cartContent;
  cartItem.appendChild(cartShopBox);
  cartShopBox.getElementsByClassName('cart-delete')[0].addEventListener('click', removeCartItem);
  cartShopBox.getElementsByClassName('cart-quantity')[0].addEventListener('change', quantityChanged);

}




// buyButtonClicked working

function buyButtonClicked() {
  alert('Your Order Is placed');
  var cartContent = document.getElementsByClassName('cart-context')[0]
  while(cartContent.hasChildNodes()){
    cartContent.removeChild(cartContent.firstChild)
  }
  updateTotal();
}