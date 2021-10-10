const Cart = require("./services/cart");

let items = [];
let totlaAmount = 0;
let found;

Cart.list().then(response => {
    let data = response.data;
    let table = document.querySelector('#product-list')
    for (let item of data){
        table.innerHTML += `<tr data-id="${item.id}" style="border-style: solid; border-width: 2px; margin:10px">
            <td>${item.id}</td>
            <td data-image><img src="${item.image}" width="200" height="250"/></td>
            <td data-info>
                <div>
                    <h3>${item.title}</h3>
                    <p style="font-size: 14px">${item.description}</p>
                    <h6 style="color:green; font-size: 26px">${item.price} $  <button data-id="${item.id}" 
                    oneitem="${item}" price="${item.price}" title="${item.title}" class="btn btn-sm btn-success"
                     style="color:blue; background-color:white; border-color:blue;
                     margin-left: 160px">Add to Cart</button></h6>
                    
                </div>
            </td>
        </tr>`
    }

    addToCart()

})


function addToCart() {
    found = false
    let btns = document.querySelectorAll('button.btn-success')
    btns.forEach(function(btn) {
        btn.addEventListener('click', function(e) {
            e.preventDefault();

            let id = e.target.getAttribute('data-id')
            let price = e.target.getAttribute('price')
            let title = e.target.getAttribute('title')

            if (items.length == 0){
                items.push({id:id, price:price, title:title,amount:1})
            }
            else{

                for(var i=0; i<items.length; i++) {
                   
                    if(items[i].id == id) {
                        found = true
                        items[i].amount+=1
                        break;
                    }else{
                        found = false
                    }
                }
                
                if(!found){
                    items.push({id:id, price:price, title:title,amount:1})
                }
            }
            totalPrice()
            represent()
        })
    })
}




window.remove = function(idx, price) {
    items.forEach((item,id) => {
        if (item.id == idx) {
            items.splice(id, 1);
            totalPrice()
        }
    })
    document.querySelector(`#cart-list tr[data-id= "${idx}"]`).remove()
}




function totalPrice(){
    totlaAmount=0
    items.forEach((item,id) => {
        totlaAmount+=(parseFloat(item.price)*parseFloat(item.amount))
    })
    document.querySelector('#cart-Total').innerHTML = `${totlaAmount} $`
}




function represent(){
    
    let carttable = document.querySelector('#cart-list')
    carttable.innerHTML = ""

    for (let item of items){
        carttable.innerHTML += 
            `<tr data-id="${item.id}">
                <td data-info>
                    <p style="font-size: 15px;">${item.title}</p>
                </td>
                <td data-info>
                    <p>${item.price}</p>                   
                </td>
                <td data-info-amount>
                    <p>${item.amount}</p>                   
                </td>
                <td data-info>
                    <button data-id="${item.id}" price="${item.price}" 
                        title="${item.title} class="btn btn-sm btn-danger"
                        style="color:red;border:0px" 
                        onclick="remove(${item.id},${item.price})" >
                               x
                    </button>
                    
                </td>
                
            </tr>`
    }
}