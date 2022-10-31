/*
the main page for candidate fill in information
 */

import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {NavBar, InputItem, Button, TextareaItem} from 'antd-mobile'
import HeaderSelector from '../../components/header-selector/header-selector'
import {updateUser} from '../../redux/actions'

class DashenInfo extends Component {

  state = {
    header: '',
    post: '',
    info: '',
  }

  // 更新header状态
  setHeader = (header) => {
    this.setState({
      header
    })
  }

  handleChange = (name, value) => {
    // debugger
    this.setState({
      [name]: value
    })
  }

  save = () => {
    this.props.updateUser(this.state)
  }

  render () {
    // If the information is complete, it is automatically redirected to the corresponding main screen
    const {header, type} = this.props.user
    if(header) { // The information is complete
      const path = type==='dashen' ? '/dashen' : '/laoban'
      return <Redirect to={path}/>
    }

    return (
      <div>
        <NavBar>Candidate information</NavBar>
        <HeaderSelector setHeader={this.setHeader}/>
        <InputItem placeholder='Please enter the job position' onChange={val => {this.handleChange('post', val)}}>position:</InputItem>
        <TextareaItem title="Description:"
                      placeholder='Please enter your personal description'
                      rows={3} onChange={val => {this.handleChange('info', val)}}/>
        <Button type='primary' onClick={this.save}>Save</Button>
      </div>
    )
  }
}

export default connect(
  state => ({user: state.user}),
  {updateUser}
)(DashenInfo)