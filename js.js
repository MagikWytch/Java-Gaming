var cart=[];
function Item(source,name,price,count){
    this.name=name;
    this.price=price;
    this.count=count;
    this.source=source;
}
function  addCartItem(source,nameI,priceI,countI) {
    for (var item in cart){
        if (cart[item].name===nameI){
            cart[item].count+=countI;
            saveCart();
            return;
        }

    }
    var newItem=new Item(source,nameI,priceI,countI);
    cart.push(newItem);
    saveCart();
}
function removeOneItem(name) {
    for (var i=0;i<cart.length;i++) {
        if (cart[i].name === name ) {
            cart[i].count --;
            if(cart[i].count===0){
                cart.splice(i,1);
            }
            break;
        }
    }
    saveCart();
}
function removeItemAllCounts(name) {

    for (var i=0;i<cart.length;i++) {
        if (cart[i].name === name) {
            cart.splice(i, 1);
            break;
        }
    }
    saveCart();
}

function clearCart(){
    cart=[];
}

function numberOfItems() {
    var total=0;
    for(var i=0; i<cart.length; i++){
        total+=cart[i].count;
    }
    return total;
}
function costOfCart() {
    var cost=0;
    for (var i in cart){
        cost+=cart[i].price;
    }
    return cost;
}

function saveCart() {
    localStorage.setItem("shoppingCart",JSON.stringify(cart));

}
function loadCart() {
   cart=JSON.parse(localStorage.getItem("shoppingCart"));
   console.log(cart);
   for (var i in cart){

       $("#photo").after("<img class='itemphoto' src=cart[i].source><br/>") ;
   }



 // $(".itemphoto").css("src","images/products-img/products-Call-Of-Duty-WWII.png");

  //$("#antal").text(copyCart[1].source).css("color","red");

}


var addButton=$(".button");
addButton.click(function(event){
    event.preventDefault();
    var name=$(this).attr("data-name");
    var price=Number($(this).attr("data-price"));
    var source=$(this).attr("data-target");
    addCartItem(source,name,price,1);


});

function displayCart() {
    var output="";
    for (var na in cart){

        output+="<li>"+"<h3>"+cart[na].name+"</h3>"+cart[na].price+"amount  "+" count  "+cart[na].count+"</li>";

    }


}

console.log(cart);


