// cart calculations

if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded',initialized);
} else {
    initialized;
}

//add event listener function for removing products from the cart
function initialized() {
    var removeFromCart = document.getElementsByClassName('cart-product-remove')
    for (var i = 0; i < removeFromCart.length; i++) {
        var removeBtn = removeFromCart[i]
        removeBtn.addEventListener('click', removeItem)
    }
    //update the total number of products
    var itemQuantity = document.getElementsByClassName('cart-product-image-count');
    for (var i = 0; i < itemQuantity.length; i++) {
        var quantInputs = itemQuantity[i];
        quantInputs.addEventListener('change', quantityUpdates);

    }
    //add product to cart
    var addProduct = document.getElementsByClassName("cart-graphic-quick-add");
    for (var i = 0; i < addProduct.length; i++) {
        var addButton = addProduct[i];
        addButton.addEventListener('click', addItem)
        
    }
    var removeAll = document.getElementsByClassName('cart-remove-all')
    for (var i = 0; i < removeAll.length; i++) {
        var removeAllBtn = removeAll[0];
        removeAllBtn.addEventListener('click', removeAllItems)
    }
    var chipSelect = document.getElementsByClassName("store-chip")
    for (var i = 0; i < chipSelect.length; i++) {
        var chipChosen = chipSelect[i];
        chipChosen.addEventListener('click',chipChoose)
    }
}
//select sizes based on chip
function chipChoose(chooseEvent) {
    var chosenButton = chooseEvent.target;
    var selected = chosenButton.parentElement;
    console.log(selected, 'selected');
}

//add the actual function to add items to the cart
function addItem(addEvent) {
    var addButton = addEvent.target;
    var chosenItem = addButton.parentElement.parentElement;
    var productTitle = chosenItem.getElementsByClassName("product-label-title")[0].innerText;
    var productPrice = chosenItem.getElementsByClassName("product-label-price-and-atc-icon")[0].textContent;
    var productPic = chosenItem.getElementsByClassName("product-image")[0].src;
    //var productCounter = chosenItem.getElementsByClassName("cart-product-image-count")[0].innerHTML;
    //alert(productCounter);
    addToCart(productTitle,productPrice,productPic);/*,productCounter);*/
    updateTotal(productTitle);
}

/*function removeAllItems(removeAllEvent) {
    var cartModalContent = document.getElementsByClassName("cart-modal-content")[0];
    var cartProducts = cartModalContent.getElementsByClassName("cart-product-container");
    for (var i = 0; i < cartProducts.length; i++) {
        var removeAllClick = removeAllEvent.target;
        console.log(removeAllClick.parentElement, 'one parent')
        removeAllClick.parentElement.remove();
    }
    updateTotal();
}*/

function addToCart(productTitle,productPrice,productPic){
    var newItemContainer = document.createElement('div');
    newItemContainer.classList.add('cart-product-container');
    var cartProducts = document.getElementsByClassName('cart-modal-content')[0];
    var productNames = cartProducts.getElementsByClassName("cart-product-image-title");
    if (productTitle == 'FOSTER TEE') {
        var idName = 'foster-cost';
        var priceId = 'foster-tee-price';
        var itemCounter = 'foster-counter';
        var chipId = 'foster'
    } else if (productTitle == 'SAUCESTER TEE') {
        var idName = 'saucester-cost';
        var priceId = 'saucester-tee-price';
        var itemCounter = 'saucester-counter';
        var chipId = 'saucester'
    }
    for (var i = 0; i < productNames.length; i++) {
        if (productNames[i].innerText == productTitle) {
            alert('Item already exists in cart.')
            return;
        } else {
            /*alert('Item has been added to cart.')*/
        }
    }
    var cartContainerContent = `  
                                <img class="store-image-thin-border-inline-duplicate" src="${productPic}">
                                <div class="cart-product-descs">
                                    <h4  class="cart-product-image-title">${productTitle}</h4>
                                    <h5 id="${priceId}" class="cart-product-image-subtitle">${productPrice}</h5>
                                    <div class="chip-block">
                                        <div id="${chipId}-small" class="store-chip">S</div>
                                        <div id="${chipId}-medium" class="store-chip">M</div>
                                        <div id="${chipId}-large" class="store-chip">L</div>
                                        <div id="${chipId}-extra-large" class="store-chip">XL</div>
                                        <div id="${chipId}-dbl-extra-large" class="store-chip">2XL</div>
                                    </div>
                                </div>
                                <input id="${itemCounter}" type="number" class="cart-product-image-count" value="1" min="1" max="50">
                                <div class="cart-product-configurables">
                                    <div id="${idName}" class="cart-prices-amount">${productPrice}</div>
                                    <br>
                                    <div class="cart-product-remove">Remove</div>
                                </div>
                                `
    newItemContainer.innerHTML = cartContainerContent;
    cartProducts.append(newItemContainer);
    newItemContainer.getElementsByClassName("cart-product-remove")[0].addEventListener('click',removeItem)
    newItemContainer.getElementsByClassName("cart-product-image-count")[0].addEventListener('change',quantityUpdates)
/**/}
 
//add the actual function to update quantity and use as template
function subtotalUpdate(amount, quantity, overall, title) {
    var cartModalContent = document.getElementsByClassName("cart-modal-content")[0];
    var cartProducts = cartModalContent.getElementsByClassName("cart-product-container");
    var removeStatus = false;
    if (title == '[object HTMLHeadingElement]') {
        title = document.getElementsByClassName("cart-product-image-title")[1].textContent;
    }
    if (title == 'FOSTER TEE') {
        idName = 'foster-cost'
    } else if (title == 'SAUCESTER TEE') {
        idName = 'saucester-cost'
    } else {
        removeStatus = true
        /* also add conditions for other products here*/
    }

    //update subtotals only
    if (overall != true) {
        for (var i = 0; i < cartProducts.length; i++) {
            var subTotal = 0;
            var priceElement = amount;
            //console.log(priceElement + " price Element");
            var quantElement = quantity;
            //console.log(quantElement + " quant Element");
            var subTotal = quantElement * priceElement;
            var subTotal = Math.round(subTotal * 100) / 100;
            //console.log(subTotal + " subtotal");
            //var removeStatus = document.getElementById(idName).innerText.value;

            //console.log(removeStatus + " this is the value of the removeStatus variable")
            //console.log(document.getElementById(idName).innerHTML + "this is the inner html");
            if (removeStatus != true) {
                //console.log(idName, 'chose document idName');
                document.getElementById(idName).innerText= "$" + subTotal + ".00";
            } else {
                //console.log('chose subtotal');
                subTotal = 0;
            }
        }
    //update overall total
    } else {
        completeTotal(amount, quantity);
    }
    
}

//determine the complete item totals
function completeTotal(allItemAmount,allItemCount) {
     //add string for correct number of items
     var itemString="";
     if (allItemCount == 1) {
         itemString=" item";
     } else {
         itemString=" items";
     }
    document.getElementsByClassName('cart-checkout-items')[0].innerText = allItemCount + itemString;
    document.getElementsByClassName('cart-checkout-total-amount')[0].innerText = '$' + allItemAmount +".00";
    document.getElementsByClassName('cart-graphic-counter')[0].innerText = allItemCount;
}

//add the actual function to remove products from the cart
function removeItem(removeEvent) {
    var removeClick = removeEvent.target;
  
    removeClick.parentElement.parentElement.remove();
    updateTotal();
}

//update the total number of individual products
function quantityUpdates(quantEvent) {
    updateTotal();
}

//update total cost and number of items with input
function updateTotal(title)  {
    var cartModalContent = document.getElementsByClassName("cart-modal-content")[0];
    var itemCnt = 0.0;
    var itemTtl = 0.0;
    var cartProducts = cartModalContent.getElementsByClassName("cart-product-container");
    for (var i = 0; i < cartProducts.length; i++) {
        var cartTotal = 0;
        var cartProductBox = cartProducts[i];
        if (title != undefined) {
            var itemName=title;
        } else {
            var itemName = cartProductBox.getElementsByTagName("h4")[0].textContent;
        }
        var price = cartProductBox.getElementsByClassName("cart-product-image-subtitle")[0];
        if (price != undefined) {
            var totalPrice = parseFloat(price.innerText.replace("$",""));
        } else {
            var totalPrice = 0;
        }
        var quant = cartProductBox.getElementsByClassName("cart-product-image-count")[0];
        if  (quant == undefined && price == undefined) {
            var totalQuantity = 0;
        }
        else if (quant != undefined) {
            var totalQuantity = quant.value;
        } else {
            var totalQuantity = 1;
        }
        cartTotal = cartTotal + (totalPrice * totalQuantity);
        cartTotal = Math.round(cartTotal * 100) / 100;

        itemCnt += parseFloat(totalQuantity);
        itemTtl += parseFloat(cartTotal);
        var globalTotal = false;
        subtotalUpdate(totalPrice, totalQuantity, globalTotal, itemName);
        
    }
    globalTotal = true;
    subtotalUpdate(itemTtl, itemCnt, globalTotal, itemName);
    
}
