import {useState} from 'react'
import CartContext from '../../context/CartContext'
import './index.css'

const CartSummary = () => {
  const [showPopup, setShowPopup] = useState(false)

  const onClickCheckout = () => {
    setShowPopup(true)
  }

  const closePopup = removeAllCartItems => {
    setShowPopup(false)
    removeAllCartItems()
  }

  return (
    <CartContext.Consumer>
      {value => {
        const {cartList, removeAllCartItems} = value
        let total = 0
        cartList.forEach(eachCartItem => {
          total += eachCartItem.price * eachCartItem.quantity
        })

        return (
          <>
            <div className="cart-summary-container">
              <h1 className="order-total-value">
                <span className="order-total-label">Order Total:</span> Rs {total}/-
              </h1>
              <p className="total-items">{cartList.length} Items in cart</p>
              <button type="button" className="checkout-button" onClick={onClickCheckout}>
                Checkout
              </button>
            </div>

            {showPopup && (
              <div className="popup-overlay">
                <div className="popup-content">
                  <div className="success-icon">✓</div>
                  <h2 className="payment-success-heading">Payment Successful!</h2>
                  <p className="payment-success-text">
                    Your order has been placed successfully.
                  </p>
                  <button
                    type="button"
                    className="continue-shopping-btn"
                    onClick={() => closePopup(removeAllCartItems)}
                  >
                    Continue Shopping
                  </button>
                </div>
              </div>
            )}
          </>
        )
      }}
    </CartContext.Consumer>
  )
}

export default CartSummary