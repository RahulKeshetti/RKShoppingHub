import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import loginImg from '../../assets/nxt-trendz-login-img.png'
import logoImg from '../../assets/nxt-trendz-logo-img.png'
import './index.css'

class LoginForm extends Component {
  state = { username: '', password: '', showSubmitError: false, errorMsg: '' }
  
  onChangeUsername = event => { this.setState({username: event.target.value}) }
  onChangePassword = event => { this.setState({password: event.target.value}) }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  submitForm = event => {
    event.preventDefault()
    
    // Set your custom username and password here
    const myCustomUsername = 'rahul'
    const myCustomPassword = 'rahul2832@'
    
    const {username, password} = this.state
    
    if (username === myCustomUsername && password === myCustomPassword) {
      this.onSubmitSuccess('offline_mock_token_123')
    } else {
      this.setState({showSubmitError: true, errorMsg: 'Invalid username or password'})
    }
  }

  render() {
    const {showSubmitError, errorMsg, username, password} = this.state
    if (Cookies.get('jwt_token') !== undefined) { return <Redirect to="/" /> }
    
    return (
      <div className="login-form-container">
        <img src={loginImg} className="login-img" alt="website login" />
        <form className="form-container" onSubmit={this.submitForm}>
          <img src={logoImg} className="login-website-logo-desktop-img" alt="website logo" />
          <div className="input-container">
            <label className="input-label" htmlFor="username">USERNAME</label>
            <input type="text" id="username" className="username-input-field" value={username} onChange={this.onChangeUsername} />
          </div>
          <div className="input-container">
            <label className="input-label" htmlFor="password">PASSWORD</label>
            <input type="password" id="password" className="password-input-field" value={password} onChange={this.onChangePassword} />
          </div>
          <button type="submit" className="login-button">Login</button>
          {showSubmitError && <p className="error-message">*{errorMsg}</p>}
        </form>
      </div>
    )
  }
}
export default LoginForm