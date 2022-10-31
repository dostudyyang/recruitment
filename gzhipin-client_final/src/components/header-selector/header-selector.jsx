/*
Select the UI component for the user's avatar
 */

import React, {Component} from 'react'
import {List, Grid} from 'antd-mobile'
import PropTypes from 'prop-types'

export default class HeaderSelector extends Component {

  static propTypes = {
    setHeader: PropTypes.func.isRequired
  }

  state = {
    icon: null //Image object, no value by default
  }

  constructor(props) {
    super(props)
    // Prepare the list data to display
    this.headerList = []
    for (let i = 0; i < 20; i++) {
      this.headerList.push({
        text: ''+(i+1),
        icon: require(`../../assets/images/头像${i+1}.png`)
      })
    }
  }

  handleClick = ({text, icon}) => {
    // Update the current component status
    this.setState({icon})
    // Call a function to update the parent component state
    this.props.setHeader(text)
  }

  render () {
    // The head interface
    const {icon} = this.state
    const listHeader = !icon ? 'Please select a head portrait' : (
      <div>
        Profile picture selected:<img src={icon}/>
      </div>
    )

    return (
      <List renderHeader={() => listHeader}>
        <Grid data={this.headerList}
              columnNum={5}
              onClick={this.handleClick}/>
      </List>
    )
  }
}