/*
router for registration
 */

import React, {Component} from 'react'
import {
  NavBar,
  WingBlank,
  List,
  InputItem,
  WhiteSpace,
  Radio,
  Button
} from 'antd-mobile'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'

import {register} from '../../redux/actions'
import Logo from '../../components/logo/logo'

const ListItem = List.Item

class Register extends Component {
  state = {
    username: '',
    password: '',
    password2: '',
    type: 'laoban',  // dashen/laoban
  }

  // Click Register Call
  register = () => {
    //console.log(this.state)
    this.props.register(this.state)
  }

  // Process input data: update the corresponding state
  handleChange = (name, val) => {
    this.setState({
      [name]: val
    })
  }

  toLogin = () => {
    this.props.history.replace('/login')
  }

  render() {
    const {type} = this.state
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
            <InputItem placeholder='Please enter your username'  onChange={val => {this.handleChange('username', val)}}>Username:</InputItem>
            <WhiteSpace/>
            <InputItem placeholder='Please enter your password' type="password" onChange={val => {this.handleChange('password', val)}}>Password:</InputItem>
            <WhiteSpace/>
            <InputItem placeholder='Please confirm your password' type="password" onChange={val => {this.handleChange('password2', val)}}>Confirm:</InputItem>
            <WhiteSpace/>
            <ListItem>
              <span>User Type:</span>
              &nbsp;&nbsp;&nbsp;
              <Radio checked={type==='dashen'} onChange={() => this.handleChange('type', 'dashen')}>job seeker</Radio>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <Radio checked={type==='laoban'}  onClick={() => this.handleChange('type', 'laoban')}>recruiter</Radio>
            </ListItem>
            <WhiteSpace/>
            <Button type='primary' onClick={this.register}>register</Button>
            <WhiteSpace/>
            <Button onClick={this.toLogin}>already have account</Button>
          </List>
        </WingBlank>
      </div>
    )
  }
}

export default connect(
  state => ({user: state.user}),
  {register}
)(Register)