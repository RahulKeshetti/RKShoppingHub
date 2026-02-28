import {Link} from 'react-router-dom'
import './index.css'

const SimilarProductItem = props => {
  const {productDetails} = props
  const {id, title, brand, imageUrl, rating, price} = productDetails

  return (
    <Link to={`/products/${id}`} className="similar-product-link">
      <li className="similar-product-item">
        <img src={imageUrl} className="similar-product-image" alt={`similar product ${title}`} />
        <p className="similar-product-title">{title}</p>
        <p className="similar-products-brand">by {brand}</p>
        <div className="similar-product-price-rating-container">
          <p className="similar-product-price">Rs {price}/-</p>
          <div className="similar-product-rating-container">
            <p className="similar-product-rating">{rating}</p>
            <p className="similar-product-star">★</p>
          </div>
        </div>
      </li>
    </Link>
  )
}

export default SimilarProductItem