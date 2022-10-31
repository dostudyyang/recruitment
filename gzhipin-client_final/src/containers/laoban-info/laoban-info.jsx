/*
the main page for boss fill in information
 */
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {NavBar, InputItem, TextareaItem, Button} from 'antd-mobile'
import HeaderSelector from '../../components/header-selector/header-selector'

import {updateUser} from '../../redux/actions'


class LaobanInfo extends Component {

  state = {
    header: '',
    post: '',
    info: '',
    company: '',
    salary: '',
  }

  // update header state
  setHeader = (header) => {
    this.setState({
      header
    })
  }

  handleChange = (name, value) => {
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
    if(header) { // information is complete
      const path = type==='dashen' ? '/dashen' : '/laoban'
      return <Redirect to={path}/>
    }

    return (
      <div className="am-input-item" >
        <NavBar>recruitment information</NavBar>
        <HeaderSelector setHeader={this.setHeader}/>
        <InputItem placeholder='Please enter the job'  onChange={val => {this.handleChange('post', val)}}>job position:</InputItem>
        <InputItem placeholder='Please enter the company name' onChange={val => {this.handleChange('company', val)}}>Company name:</InputItem>
        <InputItem placeholder='Please enter the salary' onChange={val => {this.handleChange('salary', val)}}>Salary:</InputItem>

        <TextareaItem title="Requirement:"
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
)(LaobanInfo)