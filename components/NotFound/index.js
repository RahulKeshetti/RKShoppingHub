import notFoundImg from '../../assets/not-found-blog-img.png'
import './index.css'

const NotFound = () => (
  <div className="not-found-container">
    <img src={notFoundImg} alt="not found" className="not-found-img" />
    <h1 className="not-found-heading">Page Not Found</h1>
  </div>
)

export default NotFound