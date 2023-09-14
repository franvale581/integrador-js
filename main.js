
//Product Section
const ProductsContainer = document.querySelector(".products-container");
const BtnLoad = document.querySelector(".btn-load");
const CategoriesContainer = document.querySelector(".categories");
const CategoriesList = document.querySelectorAll(".category");
const successModal = document.querySelector(".add-modal");
//Cart Section
const cartBtn = document.querySelector(".cart-toggle");
const cartMenu = document.querySelector(".cart");
const overlay = document.querySelector(".overlay");
const productsCart = document.querySelector(".cart-container");
const buyBtn = document.querySelector(".btn-buy");
const deleteBtn = document.querySelector(".btn-delete");
const total = document.querySelector(".total");
const cartBubble = document.querySelector(".cart-bubble");
//menu section
const menuBtn = document.querySelector(".menu-label");
const barsMenu = document.querySelector(".nav-links");


//funcion que crea el template con los datos del producto
const createProductTemplate = (product) => {
    const { id, name, autor, precio, bookImg} = product;
    return`
    <div class="product">
                    <div class="product-img">
                        <img src=${bookImg} alt=${name}>
                    </div>
                    <div class="product-info">
                        <h4>${name}</h4>
                        <div class="product-info-mid">
                            <span>Autor:</span>
                            <p>${autor}</p>
                        </div>
                        <div class="product-info-bottom">
                            <span>Precio:</span>
                            <p> $${precio}</p>
                        </div>
                    </div>
                    <div class="product-btn-container">
                        <button data-id='${id}'
                        data-name='${name}'
                        data-precio='${precio}'
                        data-bookImg='${bookImg}' class="btn-add">Añadir</button>    
                    </div>
                    
                </div>

    `;
};


//funcion para mostrar productos al iniciar la pagina
const renderProducts = (productsList) => {
    ProductsContainer.innerHTML += productsList
        .map(createProductTemplate)
        .join("");
};

const isLastIndexOf = () => {
    return appState.currentProductsIndex === appState.productsLimit -1;
}


//funcion para mostrar mas productos a traves del boton ver mas
const showMoreProducts = () => {
    appState.currentProductsIndex += 1;
    let { products, currentProductsIndex } = appState;
    renderProducts(products[currentProductsIndex]);
    if (isLastIndexOf()) {
        BtnLoad.classList.add("hidden")};
    };
    
const setShowMoreVisibility = () => {
    if (!appState.activeFilter) {
        BtnLoad.classList.remove("hidden")
        return
    }
    BtnLoad.classList.add("hidden")
};

//funcion para aplicar el filtrado por categorias, en este caso por autor

const applyFilter = ({ target }) => {
    if (!isInactiveFilterBtn(target)) return;
    changeFilterState(target);
    ProductsContainer.innerHTML = '';
    if (appState.activeFilter) {
        renderFilteredProducts();
        appState.currentProductsIndex = 0;
        return;
    }
    renderProducts(appState.products[0]);
};

const isInactiveFilterBtn = (element) => {
    return (
        element.classList.contains("category") &&
        !element.classList.contains("active")
    );
};

const renderFilteredProducts = () => {
    const filteredProducts = productsData.filter(
        (product) => product.category === appState.activeFilter
    );
    renderProducts(filteredProducts);
};

const changeFilterState = (btn) => {
    appState.activeFilter = btn.dataset.category;
    changeBtnActiveFilter(appState.activeFilter);
    setShowMoreVisibility();
};

const changeBtnActiveFilter = (selectedCategory) => {
    const categories = [...CategoriesList];
    categories.forEach((categoryBtn) => {
        if (categoryBtn.dataset.category !== selectedCategory) {
            categoryBtn.classList.remove("active");
            return;
        }
        categoryBtn.classList.add("active");
    });
};



//---///////---///////---Carrito---///////---///////---//

let cart = JSON.parse(localStorage.getItem("cart")) || [];

const saveCart = () => {
    localStorage.setItem("cart", JSON.stringify(cart));
};


const renderCart = () => {
    if (!cart.length) {
        productsCart.innerHTML = `
        <p class="empty-msg">No hay libros en tu carrito, ¿Qué esperas?</p>
        `;
        return;
    }
    productsCart.innerHTML = cart.map(createCartProductTemplate).join("");
};

const createCartProductTemplate = (cartProduct) => {
    const { id, name, precio, quantity } = cartProduct;
    return `
    <div class="cart-item">
      <div class="item-info">
        <h3 class="item-title">${name}</h3>
        <div class="item-price-container">
            <p class="item-bid">Precio: </p>
            <span class="item-price">$${precio}</span>
        </div>
      </div>
      <div class="item-handler">
        <span class="quantity-handler down" data-id=${id}>-</span>
        <span class="item-quantity">${quantity}</span>
        <span class="quantity-handler up" data-id=${id}>+</span>
      </div>
    </div>
    `;
};

  const toggleCart = () => {
    cartMenu.classList.toggle("open-cart");
    if (barsMenu.classList.contains("open-menu")) {
        barsMenu.classList.remove("open-menu");
        return;
    }

    overlay.classList.toggle("show-overlay");
};  

//total de productos
const showCartTotal = () => {

    total.innerHTML = `$${getCartTotal().toFixed(2)}`;
};

//esta funcion nos permite obtener el total sumado de los productos
const getCartTotal = () => {
    return cart.reduce((acc, cur) => acc + Number(cur.precio) * cur.quantity, 0)
};


//funcion para agregar los productos al carrito desde el boton añadir
const addProduct = (e) => {
    if (!e.target.classList.contains("btn-add")) { return };

    const product = createProductData(e.target.dataset);

    if (isExistingCartProduct(product)) {
        addUnitToProduct(product);
        //mostrar un feedback
        showSuccessModal("Se agregó una unidad del producto al carrito");
    } else {
        //creamos el producto en el carrito y dar feedback al usuario
        createCartProduct(product);
        showSuccessModal("El producto se ha agregado al carrito")
    };

    updateCartState();

};

const createCartProduct = (product) => {
    cart = [...cart, { ...product, quantity: 1 }];
};



const isExistingCartProduct = (product) => {
    return cart.find((item) => item.id === product.id);
};

const createProductData = (product) => {
    const { id, name,  precio, bookImg } = product;
    return { id, name, precio, bookImg };
};

const addUnitToProduct = (product) => {
    cart = cart.map((cartProduct) =>
        cartProduct.id === product.id
            ? { ...cartProduct, quantity: cartProduct.quantity + 1 }
            : cartProduct
    );
};

const showSuccessModal = (msg) => {
    successModal.classList.add("active-modal");
    successModal.textContent = msg;
    setTimeout(() => {
        successModal.classList.remove("active-modal")
    }, 1500);
};

const renderCartBubble = () => {
    cartBubble.textContent = cart.reduce((acc, cur) => {
        return acc + cur.quantity;
    }, 0);
};

const updateCartState = () => {
    saveCart();
    renderCart();
    showCartTotal();
    disableBtn(buyBtn);
    disableBtn(deleteBtn);
    renderCartBubble();
};

const disableBtn = (btn) => {
    if (!cart.length) {
        btn.classList.add("disabled");
    } else {
        btn.classList.remove("disabled");
    }
};


const handlePlusBtnEvent = (id) => {
    const existingCartProduct = cart.find((item) => item.id === id);
    addUnitToProduct(existingCartProduct);
  };


const handleMinusBtnEvent = (id) => {
    const existingCartProduct = cart.find((item) => item.id === id);
  
    if (existingCartProduct.quantity === 1) {
      if (window.confirm("¿Desea Eliminar el producto del carrito?")) {
        removeProductFromCart(existingCartProduct);
      }
      return;
    }
    
    substractProductUnit(existingCartProduct);
  };


const substractProductUnit = (existingProduct) => {
    cart = cart.map((product) => {
      return product.id === existingProduct.id
        ? { ...product, quantity: Number(product.quantity) - 1 }
        : product;
    });
  };


const removeProductFromCart = (existingProduct) => {
    cart = cart.filter((product) => product.id !== existingProduct.id);
    updateCartState();
  };

  const handleQuantity = (e) => {
    if (e.target.classList.contains("down")) {
      handleMinusBtnEvent(e.target.dataset.id);
    } else if (e.target.classList.contains("up")) {
      handlePlusBtnEvent(e.target.dataset.id);
    }
    //Para todos los casos
    updateCartState();
  };
  

const resetCartItems = () => {
    cart = [];
    updateCartState();
  };

  const completeCartAction = (confirmMsg, successMsg) => {
    if (!cart.length) return;
    if (window.confirm(confirmMsg)) {
      resetCartItems();
      alert(successMsg);
    }
  };

const completeBuy = () => {
    completeCartAction("¿Desea completar la compra?", "¡Gracias por elegirnos!");
  };
  

const deleteCart = () => {
    completeCartAction(
      "¿Desea vaciar el carrito?",
      "No hay productos en el carrito"
    );
  };

 
//---///////---///////---Carrito---///////---///////---//

//funcion para cerrar al scrollear
const closeOnScroll = () => {
    if (
        !barsMenu.classList.contains("open-menu") &&
        !cartMenu.classList.contains("open-cart")
    ) {
        return
    };
    barsMenu.classList.remove("open-menu");
    cartMenu.classList.remove("open-cart");
    overlay.classList.remove("show-overlay");
};

//funcion para cerrar al clickear fuera del menu
const closeOnClick = (e) => {
    //chequeo que sea un click en el link
    if (!e.target.classList.contains("navbar-link")) {
        return
    };

    barsMenu.classList.remove("open-menu");
    overlay.classList.remove("show-overlay");
};


//funcion para cerrar el menu o el carrito al clickear en el overlay
const closeOnOverlayClick = () => {
    barsMenu.classList.remove("open-menu");
    cartMenu.classList.remove("open-cart");
    overlay.classList.remove("show-overlay");
}

//---///////---///////---Menu---///////---///////---//

const toggleMenu = () => {
    barsMenu.classList.toggle("open-menu");
    if (cartMenu.classList.contains("open-cart")) {
        cartMenu.classList.remove("open-cart");
        return;
    }
    overlay.classList.toggle("show-overlay");
};

//---///////---///////---Menu---///////---///////---//


//metodo llamado para inicializar el objeto creado
const init = () => {
    renderProducts(appState.products[0]);
    BtnLoad.addEventListener("click", showMoreProducts);
    CategoriesContainer.addEventListener("click", applyFilter);
    barsMenu.addEventListener("click", closeOnClick);
    overlay.addEventListener("click", closeOnOverlayClick);
    window.addEventListener("scroll", closeOnScroll);
    document.addEventListener("DOMContentLoaded", renderCart);
    document.addEventListener("DOMContentLoaded", showCartTotal);
    ProductsContainer.addEventListener("click", addProduct);
    productsCart.addEventListener("click", handleQuantity);
    buyBtn.addEventListener("click", completeBuy);
    deleteBtn.addEventListener("click", deleteCart);
    disableBtn(buyBtn);
    disableBtn(deleteBtn);
    renderCartBubble(cart);
    cartBtn.addEventListener("click", toggleCart);
    menuBtn.addEventListener("click", toggleMenu);
};

init();