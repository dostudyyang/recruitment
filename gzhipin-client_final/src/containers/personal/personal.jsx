/*
用户个人中心路由组件
 */

import React from 'react'
import {Result, List, WhiteSpace, Button, Modal} from 'antd-mobile'
import {connect} from 'react-redux'
import Cookies from 'js-cookie'
import {resetUser} from '../../redux/actions'

const Item = List.Item
const Brief = Item.Brief

class Personal extends React.Component {

  logout = () => {
    // alert('-----')
    Modal.alert('Exit the login', 'Do you confirm Exit the login?', [
      {text: 'Cancel'},
      {
        text: 'Confirm',
        onPress: ()=> {

          // 干掉cookie中userid
          Cookies.remove('userid')
          // 干掉redux管理user
          this.props.resetUser()
        }
      }
    ])
  }

  render() {
    const {username, info, header, company, post, salary} = this.props.user
    return (
      <div style={{marginBottom:50, marginTop:50}}>
        <Result
          img={<img src={require(`../../assets/images/头像${header}.png`)} style={{width: 50}} alt="header"/>}
          title={username}
          message={company}
        />

        <List renderHeader={() => 'Related information'}>
          <Item multipleLine>
            <Brief>Position: {post}</Brief>
            <Brief>Description: {info}</Brief>
            {salary ? <Brief>Salary: {salary}</Brief> : null}
          </Item>
        </List>
        <WhiteSpace/>
        <List>
          <Button type='warning' onClick={this.logout}>Exit</Button>
        </List>
      </div>
    )
  }
}

export default connect(
  state => ({user: state.user}),
  {resetUser}
)(Personal)