var cart = [];
var comments = [];
var personalDetails = {
    firstName: "",
    lastName: "",
    adress: "",
    city: "",
    zipCode: "",
    country: "",
    email: ""
};

var products = [
    {
        name: "Assassin's Creed",
        price: 599,
        source: "images/products-img/products-Assassins-Creed-Origins.jpg",
        info: "Assassin's Creed Origins is an action-adventure video game developed by Ubisoft Montreal and published by Ubisoft. It is the tenth major installment in the Assassin's Creed series and the successor to 2015's Assassin's Creed Syndicate. It was released worldwide for Microsoft Windows, PlayStation 4, and Xbox One on October 27, 2017."
    },
    {
        name: "Call Of Duty",
        price: 599,
        source: "images/products-img/products-Call-Of-Duty-WWII.png",
        info: "Call of Duty: WWII is a first-person shooter video game developed by Sledgehammer Games and published by Activision. It is the fourteenth main installment in the Call of Duty series and was released worldwide on November 3, 2017 for Microsoft Windows, PlayStation 4 and Xbox One."
    },
    {
        name: "Destiny 2",
        price: 499,
        source: "images/products-img/products-Destiny-2.png",
        info: "Destiny 2 is an online-only multiplayer first-person shooter video game developed by Bungie and published by Activision. It was released for PlayStation 4 and Xbox One on September 6, 2017, followed by a Microsoft Windows version the following month."
    },
    {
        name: "DOOM 4",
        price: 195,
        source: "images/products-img/products-DOOM-4.jpg",
        info: "Doom is a first-person shooter video game developed by id Software and published by Bethesda Softworks. A reboot of the Doom franchise, it is the fourth title in the main series and the first major installment since Doom 3 in 2004."
    },
    {
        name: "Fallout 4",
        price: 99,
        source: "images/products-img/products-Fallout_4.jpg",
        info: "Fallout 4 is an action role-playing video game developed by Bethesda Game Studios and published by Bethesda Softworks. It is the fifth major installment in the Fallout series, and was released worldwide on November 10, 2015, for Microsoft Windows, PlayStation 4 and Xbox One."
    },
    {
        name: "Grand Theft Auto V",
        price: 499,
        source: "images/products-img/products-Grand_Theft_Auto_v.jpg",
        info: "Grand Theft Auto V is an action-adventure video game developed by Rockstar North and published by Rockstar Games. It was released in September 2013 for PlayStation 3 and Xbox 360, in November 2014 for PlayStation 4 and Xbox One, and in April 2015 for Microsoft Windows."
    },
    {
        name: "Star Wars Battlefront II",
        price: 499,
        source: "images/products-img/products-Starwars-Battlefront-II.jpg",
        info: "Star Wars Battlefront II is an action shooter video game based on the Star Wars film franchise. It is the fourth major installment of the Star Wars: Battlefront series and seventh overall, and a sequel to the 2015 reboot of the series."
    }
];


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

function saveComment() {
    localStorage.setItem("commentStore", JSON.stringify(comments));
}

function displayComments() {

    for (var el in comments) {

        var output = "<p>" + comments[el] + "</p><hr>";

        $(".modalTextArea").append(output);
    }

}


var modularDiv = "<div id=\"myModal\" class=\"modal\">\n" +
    "\n" +
    "            <!-- Modal content -->\n" +
    "            <div class=\"modal-content\">\n" +
    "                <span class=\"close closeModal\">&times;</span>\n" +
    "                <p class=\"gameTitle\"></p>\n" +
    "                <p class=\"gamePrice\">Some text in the Modal..</p>\n" +
    "                <img class=\"gameImg\" src=\"\"> </img>\n" +
    "                <p class=\"gameInfo\">Some text in the Modal..</p>\n" +
    "                <div class = \"modalTextArea\">\n" +
    "                    <textarea id=\"commentArea\" rows=\"4\" cols=\"30\" maxlength=\"255\" placeholder=\"Enter your comment here\"></textarea>\n" +
    "                    <button  id=\"commentBtn\">Submit Comment</button>\n" +
    "                    <p><b>Comments:</b></p><hr>\n" +
    "\n" +
    "                </div>\n" +
    "\n" +
    "            </div>\n" +
    "\n" +
    "        </div>";

$('main').append(modularDiv);


$(function () {

    $(".shipping").on("click", function () {
        var cost = costOfCart() + $(this).data("price");
        $("#costWithShipping").text("Total kostnad: " + cost);

        var shippingName = $(this).val();
        $("#delivery2").text(shippingName);
    });


    $("#fieldFirstName").keyup(function () {
        personalDetails.firstName = $("#fieldFirstName").val();
    });

    $("#fieldLastName").keyup(function () {
        personalDetails.lastName = $("#fieldLastName").val();
    });

    $("#fieldAdress").keyup(function () {
        personalDetails.adress = $("#fieldAdress").val();
    });

    $("#fieldCity").keyup(function () {
        personalDetails.city = $("#fieldCity").val();
    });

    $("#fieldZipCode").keyup(function () {
        personalDetails.zipCode = $("#fieldZipCode").val();
    });

    $("#fieldCountry").keyup(function () {
        personalDetails.country = $("#fieldCountry").val();
    });
    $("#fieldEmail").keyup(function () {
        personalDetails.email = $("#fieldEmail").val();
    });


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

    $(".modalTrigger").on("click", function (e) {
            e.preventDefault();

            var finder = $(this).closest("li").find(".modalBox");

            var name = finder.attr("data-name");
            var price = Number(finder.attr("data-price"));
            var source = finder.attr("data-target");
            var gameInfo = finder.attr("data-gameInfo");

            //Lite kod för searchbaren!

            if ($(this).hasClass('button')) {
                console.log("klickat på search");
                var searchFor = $('#searchBar').val();
                for (var el in products) {
                    console.log("for el in products");
                    if (products[el].name === searchFor) {
                        console.log("hittat namnet: " + products[el].name);
                        name = products[el].name;
                        price = products[el].price;
                        source = products[el].source;
                        gameInfo = products[el].info;
                        console.log("priset är:  " + price + "taget från: " + products[el].price);
                    }
                }
            }
            //Kod för searchbaren slut!


            $(".gameTitle").text(name);
            $(".gamePrice").text(price + "kr");
            $(".gameImg").attr("src", source);
            $(".gameInfo").text(gameInfo);
            $("#myModal").show();

            displayComments();

        }
    );


    $(".closeModal").on("click", function () {
        $("#myModal").hide();
    });

    $("#commentBtn").on("click", function (e) {

        comments = comments || [];

        e.preventDefault();
        var commentValue = $("#commentArea");

        comments.push(commentValue.val());
        commentValue.val('').blur();
        saveComment();

    });


});

function totalItemBtn() {
    var btn = $('#totalItems');
    if (!(cart.length === 0)) {
        if (!(btn.text())) {
            var totalItems = "<button id='totalItems' disabled></button>";
            $('.headerCheckout').append(totalItems);
            btn = $('#totalItems');
        }
        btn.text(numberOfItems());
    } else {
        btn.remove();
    }
    btn.disabled = true;
}


function searchBar() {
}

// ******************************
//   Medusas Code for Order
// ******************************


// ******************************
//   Medusas Code for Checkout
// ******************************


loadPage();



