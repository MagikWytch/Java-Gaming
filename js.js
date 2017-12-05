var cart = [];

function Item(name, source, price, count) {
    this.name = name;
    this.price = price;
    this.count = count;
    this.source = source;
}


function addCartItem(nameI, source, priceI, countI) {
    cart = cart || [];
    for (var item in cart) {
        if (cart[item].name === nameI) {
            if (countI == null) {
                countI = 1;
            }
            cart[item].count += countI;
            saveCart();
            return;
        }
    }

    var newItem = new Item(nameI, source, priceI, countI);
    cart.push(newItem);
    saveCart();
}


function removeOneItem(name) {
    for (var i = 0; i < cart.length; i++) {
        if (cart[i].name === name) {
            cart[i].count--;
            if (cart[i].count === 0) {
                cart.splice(i, 1);
            }
            break;
        }
    }
    saveCart();
}

function removeItemAllCounts(name) {

    for (var i = 0; i < cart.length; i++) {
        if (cart[i].name === name) {
            cart.splice(i, 1);
            break;
        }
    }
    saveCart();
}

function clearCart() {
    cart = [];
    saveCart();
}

function numberOfItems() {
    var total = 0;
    for (var i = 0; i < cart.length; i++) {
        total += cart[i].count;
    }
    return total;
}

function costOfCart() {
    var cost = 0;
    for (var i in cart) {
        cost += cart[i].price * cart[i].count;
    }
    return cost;
}

function saveCart() {
    localStorage.setItem("shoppingCart", JSON.stringify(cart));
    totalItemBtn();
}

function loadPage() {
    cart = JSON.parse(localStorage.getItem("shoppingCart"));
    totalItemBtn();
}


var addButton = $(".addBtn");

addButton.on('click', function (event) {
    event.preventDefault();
    var name = $(this).attr("data-name");
    var price = Number($(this).attr("data-price"));
    var source = $(this).attr("data-target");
    addCartItem(name, source, price, 1);

});

function displayCart() {


    for (var el in cart) {


        var output = "<tr class=\"listItem\">\n" +
            "                    <td><img class=\"prodImg\" src='" + cart[el].source + "'></td>\n" +
            "                    <td><h4 class=\"title\">" + cart[el].name + "</h4>\n" +
            "                        <p>(PC)</p></td>\n" +
            "                    <td><button class='add'>+</button><p class=\"count\">" + cart[el].count + "</p>\n" +
            "                        <button class='sub'>-</button></td>\n" +
            "                    <td><p class=\"price\">" + cart[el].price + "</p>\n" +
            "                        <p>SEK</p></td>\n" +
            "                    <td>\n" +
            "                        <section class=\"button add-button remBtn\">\n" +
            "                            <a href=\"\">X</a>\n" +
            "                        </section>\n" +
            "                    </td>\n" +
            "                </tr>";
        $('.table-body').append(output);
    }
    $('#total').text(costOfCart());

}


$(function () {

    $('#cartLogo').on('click', displayCart());

    $('.remBtn').on('click', function (event) {
        event.preventDefault();
        $(this).closest('.listItem').remove();
        removeItemAllCounts($(this).closest('.listItem').find('.title').text());
        $('#total').text(costOfCart());
    });


    $('#clearItems').on('click', function (event) {
        event.preventDefault();
        $('.listItem').remove();
        clearCart();
        $('#total').text(costOfCart());
    });


    $('.add').on('click', function () {

        var x = Number($(this).closest('td').find('.count').text());
        var y = $(this).closest('.listItem').find('.title');

        addCartItem(y.text());

        $(this).closest('td').find('.count').text(x + 1);

        $('#total').text(costOfCart());
    });


    $('.sub').on('click', function () {
        var x = Number($(this).closest('td').find('.count').text());
        var y = $(this).closest('.listItem').find('.title');

        if ($(this).closest('td').find('.count').text() === "1") {
            $(this).closest('.listItem').remove();
        }

        removeOneItem(y.text());

        $(this).closest('td').find('.count').text(x - 1);
        $('#total').text(costOfCart());

    });

});

function totalItemBtn() {
    var btn=$('#totalItems');
    if (!(cart.length===0)) {
        if (!(btn.text())) {
            var totalItems = "<button id='totalItems' disabled></button>";
            $('.headerCheckout').append(totalItems);
            btn = $('#totalItems');
        }
        btn.text(numberOfItems());
    }else{
        btn.remove();
    }
    btn.disabled=true;
}

loadPage();

