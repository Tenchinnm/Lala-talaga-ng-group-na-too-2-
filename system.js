const cartIcon = document.querySelector("#cart");
const cart = document.querySelector(".cart");
const cartClose = document.querySelector("#cartclose");

cartIcon.addEventListener("click", () => cart.classList.add("active"));
cartClose.addEventListener("click", () => cart.classList.remove("active"));

const addCartButton = document.querySelectorAll(".add-cart");

addCartButton.forEach(button => {
    button.addEventListener("click", event => {
        const productBox = event.target.closest(".box");
        addToCart(productBox);
    });
});

const cartContent = document.querySelector(".cartcontent");
const addToCart = productBox => {
    const productImgSrc = productBox.querySelector("img").src;
    const productTitle = productBox.querySelector(".title").textContent;
    const productPrice = productBox.querySelector(".price").textContent;

    const cartItems = cartContent.querySelectorAll(".producttitle");
    for (let item of cartItems) {
        if (item.textContent === productTitle) {
            alert("This item already in the cart.");
            return;
        }
    }

    const cartBox = document.createElement("div");
    cartBox.classList.add("cartbox");
    cartBox.innerHTML = `
    <img src="${productImgSrc}" class="cartimg">
                <div class="cartdetail">
                    <div class="producttitle">${productTitle}</div>
                    <span class="cartprice">${productPrice}</span>
                    <div class="quantity">
                        <button id="decrement">-</button>
                        <span class="number">1</span>
                        <button id="increment">+</button>
                    </div>
                </div>
                <i class="ri-delete-bin-5-line cartremove"></i>
    ` ;

    cartContent.appendChild(cartBox);

    cartBox.querySelector(".cartremove").addEventListener("click", () => {
        cartBox.remove();

        UpdatedCartCount(-1);

        UpdatedTotalPrice();

    });

    cartBox.querySelector(".quantity").addEventListener("click", event => {
        const numberElement = cartBox.querySelector(".number");
        const decrementButton = cartBox.querySelector("#decrement");
        let quantity = numberElement.textContent;

        if (event.target.id === "decrement" && quantity > 1) {
            quantity--;
            if (quantity === 1) {
                decrementButton.style.color = "#999";

            }
        } else if (event.target.id === "increment") {
            quantity++;
            decrementButton.style.color = "#333";
        }

        numberElement.textContent = quantity

        UpdatedTotalPrice();

        

    });

    UpdatedCartCount(1);

    UpdatedTotalPrice();

};

const UpdatedTotalPrice = () => {
    const totalPriceElement = document.querySelector(".totalprice");
    const cartBoxes = cartContent.querySelectorAll(".cartbox");
    let total = 0;
    cartBoxes.forEach(cartBox => {
        const priceElement = cartBox.querySelector(".cartprice");
        const quantiyElement = cartBox.querySelector(".number");
        const price = priceElement.textContent.replace("₱", "");
        const quantity = quantiyElement.textContent;
        total += price * quantity;
    });
    totalPriceElement.textContent =  `₱${total}`
};


let cartItemCount = 0;
const UpdatedCartCount = change => {
    const cartItemCountBadge = document.querySelector(".itemcount");
    cartItemCount += change;
    if (cartItemCount > 0) {
        cartItemCountBadge.style.visibility = "visible";
        cartItemCountBadge.textContent = cartItemCount;
    } else {
        cartItemCountBadge.style.visibility = "hidden";
        cartItemCountBadge.textContent = "";
    }
};

const BuyNowButton = document.querySelector(".buttonbuy");
BuyNowButton.addEventListener("click", () => {
    const cartBoxes = cartContent.querySelectorAll(".cartbox");
    if (cartBoxes.length === 0) {
        alert("Your cart is empty. Please add items to your cart before purchasing ");
        return;
    }

    cartBoxes.forEach(cartBox => cartBox.remove());

    cartItemCount = 0;
    UpdatedCartCount(0);

    UpdatedTotalPrice();

    alert("Thank you for your purchase. We are getting your order ready for delivery.")
})