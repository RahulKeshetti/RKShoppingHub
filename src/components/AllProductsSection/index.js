import {Component} from 'react'
import FiltersGroup from '../FiltersGroup'
import ProductCard from '../ProductCard'
import ProductsHeader from '../ProductsHeader'
import {localProductsList} from '../../localProductsData'
import productsErrorViewImage from '../../assets/nxt-trendz-products-error-view.png'
import './index.css'

const categoryOptions = [
  {name: 'Clothing', categoryId: 'Clothing'},
  {name: 'Electronics', categoryId: 'Electronics'},
  {name: 'Appliances', categoryId: 'Appliances'},
  {name: 'Toys', categoryId: 'Toys'},
  {name: 'Grocery', categoryId: 'Grocery'},
]

const sortbyOptions = [
  {optionId: 'PRICE_HIGH', displayText: 'Price (High-Low)'},
  {optionId: 'PRICE_LOW', displayText: 'Price (Low-High)'},
]

// Note: I am leaving these 4 star images as online URLs because they are tiny default UI elements.
const ratingsList = [
  {ratingId: '4', imageUrl: 'https://assets.ccbp.in/frontend/react-js/rating-four-stars-img.png'},
  {ratingId: '3', imageUrl: 'https://assets.ccbp.in/frontend/react-js/rating-three-stars-img.png'},
  {ratingId: '2', imageUrl: 'https://assets.ccbp.in/frontend/react-js/rating-two-stars-img.png'},
  {ratingId: '1', imageUrl: 'https://assets.ccbp.in/frontend/react-js/rating-one-star-img.png'},
]

class AllProductsSection extends Component {
  state = {
    productsList: [],
    activeOptionId: sortbyOptions[0].optionId,
    activeCategoryId: '',
    searchInput: '',
    activeRatingId: '',
  }

  componentDidMount() {
    this.getProducts()
  }

  getProducts = () => {
    const {activeOptionId, activeCategoryId, searchInput, activeRatingId} = this.state
    let filteredProducts = localProductsList

    if (searchInput !== '') {
      filteredProducts = filteredProducts.filter(product =>
        product.title.toLowerCase().includes(searchInput.toLowerCase()),
      )
    }

    if (activeCategoryId !== '') {
      filteredProducts = filteredProducts.filter(
        product => product.category === activeCategoryId,
      )
    }

    if (activeRatingId !== '') {
      filteredProducts = filteredProducts.filter(
        product => product.rating >= activeRatingId,
      )
    }

    if (activeOptionId === 'PRICE_HIGH') {
      filteredProducts.sort((a, b) => b.price - a.price)
    } else {
      filteredProducts.sort((a, b) => a.price - b.price)
    }

    this.setState({productsList: filteredProducts})
  }

  changeSortby = activeOptionId => {
    this.setState({activeOptionId}, this.getProducts)
  }

  clearFilters = () => {
    this.setState(
      {
        searchInput: '',
        activeCategoryId: '',
        activeRatingId: '',
      },
      this.getProducts,
    )
  }

  changeRating = activeRatingId => {
    this.setState({activeRatingId}, this.getProducts)
  }

  changeCategory = activeCategoryId => {
    this.setState({activeCategoryId}, this.getProducts)
  }

  enterSearchInput = () => {
    this.getProducts()
  }

  changeSearchInput = searchInput => {
    this.setState({searchInput})
  }

  renderProductsListView = () => {
    const {productsList, activeOptionId} = this.state
    const shouldShowProductsList = productsList.length > 0

    return shouldShowProductsList ? (
      <div className="all-products-container">
        <ProductsHeader
          activeOptionId={activeOptionId}
          sortbyOptions={sortbyOptions}
          changeSortby={this.changeSortby}
        />
        <ul className="products-list">
          {productsList.map(product => (
            <ProductCard productData={product} key={product.id} />
          ))}
        </ul>
      </div>
    ) : (
      <div className="no-products-view">
        <img
          src={productsErrorViewImage}
          className="no-products-img"
          alt="no products"
        />
        <h1 className="no-products-heading">No Products Found</h1>
        <p className="no-products-description">
          We could not find any products. Try other filters.
        </p>
      </div>
    )
  }

  render() {
    const {activeCategoryId, searchInput, activeRatingId} = this.state

    return (
      <div className="all-products-section">
        <FiltersGroup
          searchInput={searchInput}
          changeSearchInput={this.changeSearchInput}
          enterSearchInput={this.enterSearchInput}
          activeCategoryId={activeCategoryId}
          activeRatingId={activeRatingId}
          categoryOptions={categoryOptions}
          ratingsList={ratingsList}
          changeCategory={this.changeCategory}
          changeRating={this.changeRating}
          clearFilters={this.clearFilters}
        />
        {this.renderProductsListView()}
      </div>
    )
  }
}

export default AllProductsSection