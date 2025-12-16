import ImageSlider from "../components/imageSlider";

/**
 * Loads the current cart from local storage and returns it as an array.
 * If no cart exists in local storage, an empty cart is created and returned.
 * @returns {Array} - The current cart.
 */
export function loadCart() {
    let cartString = localStorage.getItem("cart");
    if (cartString === null) {
        localStorage.setItem("cart", "[]");
        cartString = "[]";
    }

    const cart = JSON.parse(cartString);

    return cart;
}




/**
 * Adds a product to the cart. If the product already exists in the cart, its quantity is incremented.
 * @param {Object} product - The product to add to the cart.
 * @param {Number} quantity - The quantity of the product to add.
 */
export function addToCart(product, quantity) {
    let cart = loadCart();
    const existingProductIndex = cart.findIndex(
        (item)=>{
        return item.productID === product.productID;   
        }
    )

    if (existingProductIndex == -1) {
        // Product does not exist in cart, add new entry
        if (quantity <= 1) {
            console.log("Quantity must be greater than 1");
        }
        const cartItem = {
            productID: product.productID,
            name: product.name,
            price: product.price,
            quantity: quantity,
            labelledPrice: product.labelledPrice,
            Images: product.images[0] // Assuming product has an 'images' array
        };
        cart.push(cartItem);
        }
    else {
        // Product already exists in cart, increment quantity
        const existingProduct = cart[existingProductIndex];
        const newQuantity = existingProduct.quantity + quantity;
        if (newQuantity < 1) {
            console.log("Quantity must be greater than 1");
            cart = cart.filter(
                (item)=>{
                return item.productID !== product.productID;   
                }
            )
        }else{
            existingProduct.quantity = newQuantity;
        }
    }


    localStorage.setItem("cart", JSON.stringify(cart));
}


/**
 * Returns the total cost of all items in the cart.
 * @returns {number} - The total cost of all items in the cart.
 */
export function getTotal() {
    const cart = loadCart();
    let total = 0;
    cart.forEach((item) => {
        total += item.price * item.quantity;
    });
    return total;
}