import {Component} from 'react'
import {Link} from 'react-router-dom'
import {BsPlusSquare, BsDashSquare} from 'react-icons/bs'
import CartContext from '../../context/CartContext'
import Header from '../Header'
import SimilarProductItem from '../SimilarProductItem'
import {localProductsList} from '../../localProductsData'
import errorViewImg from '../../assets/nxt-trendz-products-error-view.png'
import './index.css'

class ProductItemDetails extends Component {
  state = { productData: {}, similarProductsData: [], apiStatus: 'SUCCESS', quantity: 1 }

  componentDidMount() { this.getProductData() }

  // This method detects when the URL ID changes and forces the data to update
  componentDidUpdate(prevProps) {
    if (prevProps.match.params.id !== this.props.match.params.id) {
      this.getProductData()
      window.scrollTo(0, 0) // Automatically scrolls back to the top of the page
    }
  }

  getProductData = () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const productDetails = localProductsList.find(product => product.id === id)

    if (productDetails) {
      const similarProducts = localProductsList.filter(product => product.category === productDetails.category && product.id !== id).slice(0, 3)
      this.setState({
        productData: { ...productDetails, description: 'High quality product with premium features.', availability: 'In Stock', totalReviews: 120 },
        similarProductsData: similarProducts,
        apiStatus: 'SUCCESS',
        quantity: 1 // Resets quantity to 1 when a new product loads
      })
    } else {
      this.setState({apiStatus: 'FAILURE'})
    }
  }

  onDecrementQuantity = () => {
    const {quantity} = this.state
    if (quantity > 1) { this.setState(prevState => ({quantity: prevState.quantity - 1})) }
  }
  onIncrementQuantity = () => { this.setState(prevState => ({quantity: prevState.quantity + 1})) }

  renderFailureView = () => (
    <div className="product-details-error-view-container">
      <img alt="error view" src={errorViewImg} className="error-view-image" />
      <h1 className="product-not-found-heading">Product Not Found</h1>
      <Link to="/products"><button type="button" className="button">Continue Shopping</button></Link>
    </div>
  )

  renderProductDetailsView = () => (
    <CartContext.Consumer>
      {value => {
        const {productData, quantity, similarProductsData} = this.state
        const {title, brand, imageUrl, rating, price, description, availability, totalReviews} = productData
        const {addCartItem} = value
        const onClickAddToCart = () => { addCartItem({...productData, quantity}) }

        return (
          <div className="product-details-success-view">
            <div className="product-details-container">
              <img src={imageUrl} alt="product" className="product-image" />
              <div className="product">
                <h1 className="product-name">{title}</h1>
                <p className="price-details">Rs {price}/-</p>
                <div className="rating-and-reviews-count">
                  <div className="rating-container"><p className="rating">{rating}</p><p className="star">★</p></div>
                  <p className="reviews-count">{totalReviews} Reviews</p>
                </div>
                <p className="product-description">{description}</p>
                <div className="label-value-container"><p className="label">Available:</p><p className="value">{availability}</p></div>
                <div className="label-value-container"><p className="label">Brand:</p><p className="value">{brand}</p></div>
                <hr className="horizontal-line" />
                <div className="quantity-container">
                  <button type="button" className="quantity-controller-button" onClick={this.onDecrementQuantity}><BsDashSquare className="quantity-controller-icon" /></button>
                  <p className="quantity">{quantity}</p>
                  <button type="button" className="quantity-controller-button" onClick={this.onIncrementQuantity}><BsPlusSquare className="quantity-controller-icon" /></button>
                </div>
                <button type="button" className="button add-to-cart-btn" onClick={onClickAddToCart}>ADD TO CART</button>
              </div>
            </div>
            <h1 className="similar-products-heading">Similar Products</h1>
            <ul className="similar-products-list">
              {similarProductsData.map(eachSimilarProduct => (<SimilarProductItem productDetails={eachSimilarProduct} key={eachSimilarProduct.id} />))}
            </ul>
          </div>
        )
      }}
    </CartContext.Consumer>
  )

  render() {
    const {apiStatus} = this.state
    return (
      <>
        <Header />
        <div className="product-item-details-container">
          {apiStatus === 'SUCCESS' ? this.renderProductDetailsView() : this.renderFailureView()}
        </div>
      </>
    )
  }
}
export default ProductItemDetails