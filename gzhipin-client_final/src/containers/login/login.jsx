/*
router for login
 */

import React, {Component} from 'react'
import {
  NavBar,
  WingBlank,
  List,
  InputItem,
  WhiteSpace,
  Button
} from 'antd-mobile'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'

import {login} from '../../redux/actions'

import Logo from '../../components/logo/logo'

const ListItem = List.Item

class Login extends Component {
  state = {
    username: '',
    password: '',
  }

  login = () => {
    this.props.login(this.state)
  }

  // process input data: update the corresponding state
  handleChange = (name, val) => {
    // updata state
    this.setState({
      [name]: val  // The attribute name is not name, but the value of the name variable
    })
  }

  toRegister = () => {
    this.props.history.replace('/register')
  }

  render() {

    const {msg, redirectTo} = this.props.user
    // If the redirectTo not null, you need to redirect to the specified route
    if(redirectTo) {
      return <Redirect to={redirectTo}/>
    }

    return (
      <div>
        <NavBar>York Recruitment</NavBar>
        <Logo/>
        <WingBlank>
          <List>
            {msg ? <div className='error-msg'>{msg}</div> : null}
            <WhiteSpace/>
            <InputItem placeholder='Please enter your username' onChange={val => {this.handleChange('username', val)}}>Username:</InputItem>
            <WhiteSpace/>
            <InputItem placeholder='Please enter your password' type="password" onChange={val => {this.handleChange('password', val)}}>Password:</InputItem>
            <WhiteSpace/>

            <Button type='primary' onClick={this.login}>Login</Button>
            <WhiteSpace/>
            <Button onClick={this.toRegister}>No Account</Button>
          </List>
        </WingBlank>
      </div>
    )
  }
}

export default connect(
  state => ({user: state.user}),
  {login}
)(Login)