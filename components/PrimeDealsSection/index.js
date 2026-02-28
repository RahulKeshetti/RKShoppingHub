import {Component} from 'react'
import ProductCard from '../ProductCard'
import {localProductsList} from '../../localProductsData'
import './index.css'

class PrimeDealsSection extends Component {
  state = { primeDeals: [] }

  componentDidMount() { this.getPrimeDeals() }

  getPrimeDeals = () => {
    const primeDealsList = localProductsList.filter(product => product.rating >= 4.7).slice(0, 3)
    this.setState({ primeDeals: primeDealsList })
  }

  render() {
    const {primeDeals} = this.state
    if (primeDeals.length === 0) { return null }

    return (
      <div className="prime-deals-container">
        <h1 className="primedeals-list-heading">Exclusive Prime Deals</h1>
        <ul className="products-list">
          {primeDeals.map(product => (<ProductCard productData={product} key={product.id} />))}
        </ul>
      </div>
    )
  }
}
export default PrimeDealsSection