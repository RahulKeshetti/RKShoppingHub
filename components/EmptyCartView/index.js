import {Link} from 'react-router-dom'
import emptyCartImg from '../../assets/nxt-trendz-empty-cart-img.png'
import './index.css'

const EmptyCartView = () => (
  <div className="cart-empty-view-container">
    <img src={emptyCartImg} className="cart-empty-img" alt="cart empty" />
    <h1 className="cart-empty-heading">Your Cart Is Empty</h1>
    <Link to="/products">
      <button type="button" className="shop-now-btn">Shop Now</button>
    </Link>
  </div>
)

export default EmptyCartView