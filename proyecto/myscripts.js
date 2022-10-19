// Esteban Pedro y Pirchio Giani Marcos
'use strict'
function updateCartInterface() {
   saveCartToLocalStorage()

   const cartItemsContainer = document.querySelector('#carrito')
   const cartAndPayButtonsContainer = document.createElement('div')
   cartAndPayButtonsContainer.classList.add('cart-pay-buttons')
   cartItemsContainer.innerHTML = ''

   const cartCounter = document.querySelector('#cart-counter')
   cartCounter.innerText = cart.length || ''



   for (const cartItem of cart) {
      const cartQuantityContainer = document.createElement('div')

      const cartItemContainer = document.createElement('div')
      cartItemContainer.classList.add('cart-container')
      console.log(cartItem)

      const productImageElement = document.createElement('img')
      productImageElement.src = 'images/' + cartItem.product.imagen
      productImageElement.classList.add('product-image')
      cartItemContainer.append(productImageElement)

      const productNameElement = document.createElement('div')
      productNameElement.innerText = cartItem.product.nombre
      productNameElement.classList.add('product-name-container')
      cartItemContainer.append(productNameElement)
      console.log(cartItem.product.name)



      const decreaseQtyBtnElement = document.createElement('button')
      decreaseQtyBtnElement.classList.add('tertiary-button')
      decreaseQtyBtnElement.innerText = '-'
      decreaseQtyBtnElement.classList.add('cart-qty-btn')
      decreaseQtyBtnElement.classList.add('qty-buttons')
      function onDecreaseQtyClick() {
         decreaseQuantity(cartItem.product)
         updateCartInterface()
      }
      decreaseQtyBtnElement.addEventListener('click', onDecreaseQtyClick)
      cartQuantityContainer.append(decreaseQtyBtnElement)


      const productQuantityElement = document.createElement('div')
      productQuantityElement.innerText = + cartItem.quantity
      productQuantityElement.classList.add('product-quantity-container')
      productQuantityElement.classList.add('quantity-number')
      cartQuantityContainer.append(productQuantityElement)


      const increaseQtyBtnElement = document.createElement('button')
      increaseQtyBtnElement.classList.add('tertiary-button')
      increaseQtyBtnElement.innerText = '+'
      increaseQtyBtnElement.classList.add('cart-qty-btn')
      increaseQtyBtnElement.classList.add('qty-buttons')
      function onIncreaseQtyClick() {
         increaseQuantity(cartItem.product)
         updateCartInterface()
      }
      increaseQtyBtnElement.addEventListener('click', onIncreaseQtyClick)
      cartQuantityContainer.append(increaseQtyBtnElement)


      cartQuantityContainer.classList.add('cart-quantity-container')
      cartItemContainer.append(cartQuantityContainer)



      const productPriceElement = document.createElement('div')
      productPriceElement.innerText = '$' + cartItem.product.precio * cartItem.quantity
      cartItemContainer.classList.add('product-price-container')
      cartItemContainer.append(productPriceElement)




      const trashCanBtnElement = document.createElement('button')
      trashCanBtnElement.classList.add('tertiary-button')
      trashCanBtnElement.innerText = '🗑️'
      trashCanBtnElement.classList.add('cart-trash-btn')
      function onRemoveProductClick() {
         removeFromCart(cartItem.product)
         updateCartInterface()
      }

      trashCanBtnElement.addEventListener('click', onRemoveProductClick)
      cartItemContainer.append(trashCanBtnElement)


      cartItemsContainer.append(cartItemContainer)


      cartItemsContainer.append(cartItemContainer)


   }

   const closeCartElement = document.createElement('button')
   closeCartElement.classList.add('secondary-button')
   closeCartElement.innerText = '◀'
   closeCartElement.addEventListener('click', toggleCartVisibility)
   cartAndPayButtonsContainer.append(closeCartElement)
   cartItemsContainer.append(cartAndPayButtonsContainer)

   if (cart.length) {

      const totalCartQuantElement = document.createElement('div')
      totalCartQuantElement.innerText = 'Cantidad: ' + getCartQuantity()
      totalCartQuantElement.classList.add('total-cart-price')
      cartItemsContainer.append(totalCartQuantElement)


      const totalCartProductElement = document.createElement('div')
      totalCartProductElement.innerText = 'Productos: ' + cart.length
      totalCartProductElement.classList.add('total-cart-price')
      cartItemsContainer.append(totalCartProductElement)




      const payBtnElement = document.createElement('button')
      payBtnElement.innerText = 'Pagar'
      cartAndPayButtonsContainer.append(payBtnElement)
      cartItemsContainer.append(cartAndPayButtonsContainer)


      const totalCartPriceElement = document.createElement('div')
      totalCartPriceElement.innerText = 'Total: $' + getCartTotal()
      totalCartPriceElement.classList.add('total-cart-price')
      cartItemsContainer.append(totalCartPriceElement)



      const removeAllButton = document.createElement('button')
      removeAllButton.innerText = 'Borrar'
      cartAndPayButtonsContainer.append(removeAllButton)
      cartItemsContainer.append(cartAndPayButtonsContainer)
      function onRemoveAllButton() {
         clearCart()
         updateCartInterface()
      }
      removeAllButton.addEventListener('click', onRemoveAllButton)

   }

}
function getCartQuantity() {
   let totalQuant = 0
   for (const cartItem of cart) {
      const totalProduct = cartItem.quantity
      totalQuant += totalProduct
   }
   return totalQuant
}

function getCartTotal() {
   let totalPrice = 0
   for (const cartItem of cart) {
      const totalProduct = cartItem.product.precio * cartItem.quantity
      totalPrice += totalProduct
   }
   return totalPrice
}

function setCategory(categoryId) {
   if (activeCategory === categoryId)
      activeCategory = null
   else
      activeCategory = categoryId

   refreshProductsVisibility()
}

function showAllProducts() {
   const elementsToHide = document.querySelectorAll('.product-container')

   elementsToHide.forEach(function hideElement(element) {
      element.classList.remove('hide')
   })

   const buttons = document.querySelectorAll('.category-button')
   buttons.forEach(function (element) {
      element.classList.remove('quaternary-button')
   })
}

function refreshProductsVisibility() {
   showAllProducts()

   if (!activeCategory)
      return

   const elementsToHide = document.querySelectorAll(`.product-container:not([category="${activeCategory}"])`)

   elementsToHide.forEach(function hideElement(element) {
      element.classList.add('hide')
   })

   const activeButton = document.querySelector(`.category-button[category="${activeCategory}"]`)
   activeButton.classList.add('quaternary-button')
}

function createProducts(products) {
   const categoriesContainer = document.getElementById('categories')
   categoriesContainer.classList.add('categories-buttons')

   for (const category of categories) {
      const categoryButton = document.createElement('button')
      categoryButton.classList.add('category-button')
      categoryButton.setAttribute('category', category.id)
      categoryButton.innerText = category.title
      categoryButton.addEventListener('click', function onCategoryClick() {
         setCategory(category.id)
      })
      categoriesContainer.append(categoryButton)
   }



   for (const prod of products) {
      const div = document.createElement('div')
      const title = document.createElement('h3')
      const img = document.createElement('img')
      const p = document.createElement('p')
      const addToCartButton = document.createElement('button')
      const productLink = document.createElement('a')

      addToCartButton.setAttribute('data-id', prod.id)


      productLink.href = prod.url
      title.innerText = prod.nombre
      img.src = 'images/' + prod.imagen
      p.innerText = 'Precio: $' + prod.precio
      addToCartButton.innerText = 'Agregar al carrito'
      productLink.innerText = 'Mas informacion'

      div.classList.add('product-container')
      div.classList.add('col-xl-4')
      div.classList.add('col-lg-6')
      img.classList.add('img-content')
      productLink.classList.add('button')
      productLink.classList.add('button-spaced')
      addToCartButton.classList.add('button-spaced')
      productLink.classList.add('secondary-button')

      div.setAttribute('category', prod.category)

      // button.classList.add('btn-primary')

      div.append(title)
      div.append(img)
      div.append(p)

      prod.url && div.append(productLink)

      div.append(addToCartButton)

      // agrega al carrito al clickear (click, funcion de addToCart)
      function onAddToCartClick() {
         addToCart(prod)
         updateCartInterface()
      }

      addToCartButton.addEventListener('click', onAddToCartClick)
      divProductos.append(div)

   }
}

function saveCartToLocalStorage() {
   localStorage.setItem('cartInfo', JSON.stringify(cart))
}


function isProductInCart(product) {
   for (const cartItem of cart) {
      if (product.id === cartItem.product.id) {
         return true
      }
   }
   return false
}

function addToCart(product) {

   console.log(cart)
   const cartItem = {
      product: product,
      quantity: 1
   }
   if (!isProductInCart(product)) {
      cart.push(cartItem)
      // alert("Producto añadido con exito.")
   } else {
      increaseQuantity(product)
   }


}

function removeFromCart(product) {
   for (let i = 0; i <= cart.length; i++) {
      const cartItem = cart[i]
      if (cartItem.product.id === product.id) {
         cart.splice(i, 1)
         break
      }
   }
}

function clearCart() {
   cart.splice(0, cart.length)
   console.log("aaa", cart)
}

function increaseQuantity(product) {
   for (let i = 0; i <= cart.length; i++) {
      const cartItem = cart[i]
      if (cartItem.product.id === product.id) {
         cartItem.quantity += 1
         break
      }
   }
}
function decreaseQuantity(product) {
   console.log(product)
   for (let i = 0; i < cart.length; i++) {
      const cartItem = cart[i]
      console.log(cartItem)
      if (cartItem.product.id === product.id) {
         cartItem.quantity -= 1
         if (cartItem.quantity === 0) {
            removeFromCart(product)
         }
         break
      }
   }
}

function toggleCartVisibility() {
   document.querySelector('#carrito').classList.toggle('cart-close')
}
// -------------------------------------


const categories = [
   {
      id: 0,
      title: 'Todo'
   },
   {
      id: 1,
      title: 'Gaming'
   },

   {
      id: 2,
      title: 'Utilidad'
   },
   {
      id: 3,
      title: 'Audio'
   },
]

const products = [
   {
      id: 1,
      nombre: 'Mouse',
      precio: 14000,
      imagen: 'mouse img.jpg',
      url: 'products/mouse.html',
      category: 1
   },
   {
      id: 2,
      nombre: 'Teclado',
      precio: 16000,
      imagen: 'keyboard img.jpg',
      url: 'products/keyboard.html',
      category: 1
   },
   {
      id: 3,
      nombre: 'Auriculares',
      precio: 20000,
      imagen: 'auris img.jpg',
      url: 'products/headset.html',
      category: 3
   },
   {
      id: 4,
      nombre: 'Joystick ps4',
      precio: 8800,
      imagen: 'joystickps4.jpg',
      url: 'products/joystick.html',
      category: 1
   },
   {
      id: 5,
      nombre: 'Microfono',
      precio: 20700,
      imagen: 'microfono.jpg',
      url: 'products/microphone.html',
      category: 3
   },
   {
      id: 6,
      nombre: 'Mousepad',
      precio: 9200,
      imagen: 'mousepad2.jfif',
      url: 'products/mousepad.html',
      category: 2
   },
]


const cart = JSON.parse(localStorage.getItem('cartInfo') || null) || []
let activeCategory = null
const divProductos = document.querySelector('#perifericos .interact-content')
const divCarrito = document.querySelector('#carrito')


// ------------------------------------
document.querySelector('#toggle-cart-button').addEventListener('click', toggleCartVisibility)
createProducts(products)
updateCartInterface()
