import { menuArray } from "./data.js";

let price = [];
const form = document.getElementById('form-data');
const orderPreview = document.getElementById("order-preview");
const modal = document.getElementById("modal");


document.addEventListener("click", function(e){
    if (e.target.dataset.add){
       handleAddClick(e.target.dataset.add) 
    } else if (e.target.dataset.remove){
        handleRemoveClick(e.target.dataset.remove)
    } else if (e.target.id == 'order-btn'){
        handleOrderBtnClick(menuArray);
    } else if (e.target.id == 'pay-btn'){
        e.preventDefault();
        handlePaybtnClick();
    }
})



function handleAddClick(itemID){
    const item = menuArray.filter(function(item){
       return item.id == itemID;
   })[0]
   
   if (!item.isSelected){
       item.isSelected = true;
       renderOrder();
       price.push(item.price)
       calculateTotalPrice()
   }
}

function calculateTotalPrice(){
    let priceSum = 0;
    let totalPrice = ``;
    const orderedItems = menuArray.filter(function(item){
        return item.isSelected;
    })
    orderedItems.forEach(function(item){
      priceSum += item.price
  })
  totalPrice = `$${priceSum}`;
  return totalPrice;
}


function renderOrder(){
    document.getElementById("order").innerHTML = getOrderHTML();
    orderPreview.style.display = "block";
    document.getElementById("total-price").textContent = calculateTotalPrice();
}

function getOrderHTML(){
    let orders = ``;
    const orderedItems = menuArray.filter(function(item){
        return item.isSelected;
    })
    orderedItems.forEach(function(item){
    orders +=
     `
     <div class="order-spacing">
        <div class="ordered-item">
            <h2>${item.name}</h2>
            <button class="remove-btn" type="button" data-remove="${item.id}">remove</button>
        </div>
        <p>$${item.price}</p>
     </div>   
    `;
    })
    return orders
}

function handleRemoveClick(itemID){
    const item = menuArray.filter(function(item){
        return item.id == itemID;
    })[0]

    if(item.isSelected){
        item.isSelected = false;
        price.pop();
        renderOrder();
    }
}    

function handleOrderBtnClick(arr){
    for (let i = 0; i < arr.length; i++ ){
    if (arr[i].isSelected){
    modal.style.display = 'block';
    } 
}
}

function handlePaybtnClick(){
    
    const formData = new FormData(form);
    const name = formData.get('name');

    let orderComplete = ``;
    orderComplete += 
    `
    <div class="order-is-complete">
        <p>Thanks, ${name}! Your order is on its way</p>
    </div>
    `;

    orderPreview.innerHTML = orderComplete;
    modal.style.opacity = "0";
}


function getMenuHTML(){
    let menuItems = ``;
    menuArray.forEach(function(item){
        menuItems += 
        `
        <div class="menu">
            <div class="menu-item">
                <p class="food-img">${item.emoji}</p>
                <div class="item-details">
                    <h2>${item.name}</h2>
                    <p>${item.ingredients}</p>
                    <h3>$${item.price}</h3>
                </div>
            </div>
            <button class="add-btn" type="button" data-add="${item.id}">+</button>
        </div>
        <hr>
        `;
    })
    return menuItems;
}

function renderMenu() {
    document.getElementById("menu").innerHTML = getMenuHTML()
}

renderMenu();