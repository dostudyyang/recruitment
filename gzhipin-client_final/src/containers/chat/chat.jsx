/*
Routing component of conversation chat
 */

import React, {Component} from 'react'
import {NavBar, List, InputItem, Grid, Icon} from 'antd-mobile'
import {connect} from 'react-redux'
import QueueAnim from 'rc-queue-anim'

import {sendMsg, readMsg} from '../../redux/actions'


const Item = List.Item

class Chat extends Component {

  state = {
    content: '',
    isShow: false // Whether to display a list of emojis
  }

  // Callback before render() for the first time
  componentWillMount () {
    // Initialize emoji list data
    const emojis = ['😀', '😁', '🤣','😀', '😁', '🤣','😀', '😁', '🤣','😀', '😁', '🤣','😀'
      ,'😁', '🤣','😀', '😁', '🤣','😀', '😁', '🤣','😀', '😁', '🤣'
      ,'😁', '🤣','😀', '😁', '🤣','😀', '😁', '🤣','😀', '😁', '🤣'
      ,'😁', '🤣','😀', '😁', '🤣','😀', '😁', '🤣','😀', '😁', '🤣']
    this.emojis = emojis.map(emoji => ({text: emoji}))
  }

  componentDidMount() {
    // Initialize list
    window.scrollTo(0, document.body.scrollHeight)

  }

  componentDidUpdate () {
    // update list
    window.scrollTo(0, document.body.scrollHeight)
  }

  componentWillUnmount () { // before exit
    // 发请求更新消息的未读状态
    const from = this.props.match.params.userid
    const to = this.props.user._id
    this.props.readMsg(from, to)
  }

  toggleShow = () => {
    const isShow = !this.state.isShow
    this.setState({isShow})
    if(isShow) {
      // Asynchronously manually distribute the resize event, solve the emoji list display bug
      setTimeout(() => {
        window.dispatchEvent(new Event('resize'))
      }, 0)
    }
  }

  handleSend = () => {
    // collect data
    const from = this.props.user._id
    const to = this.props.match.params.userid
    const content = this.state.content.trim()
    // send request(send message)
    if(content) {
      this.props.sendMsg({from, to, content})
    }
    // clear input data
    this.setState({
      content: '',
      isShow: false
    })
  }
  render() {
    const {user} = this.props
    const {users, chatMsgs} = this.props.chat

    // compute current chatId
    const meId = user._id
    if(!users[meId]) { // If the data has not been obtained, do not display any data
      return null
    }
    const targetId = this.props.match.params.userid
    const chatId = [meId, targetId].sort().join('_')

    // Filter the chatMsgs
    const msgs = chatMsgs.filter(msg => msg.chat_id===chatId)

    // Get the header image object for the target user
    const targetHeader = users[targetId].header
    const targetIcon = targetHeader ? require(`../../assets/images/${targetHeader}.png`) : null

    return (
      <div id='chat-page'>
        <NavBar
          icon={<Icon type='left'/>}
          className='sticky-header'
          onLeftClick={()=> this.props.history.goBack()}
        >
          {users[targetId].username}
        </NavBar>
        <List style={{marginTop:50, marginBottom: 50}}>
          {/*alpha left right top bottom scale scaleBig scaleX scaleY*/}
          <QueueAnim type='left' delay={100}>
            {
              msgs.map(msg => {
                if(targetId===msg.from) {// send to me
                  return (
                    <Item
                      key={msg._id}
                      thumb={targetIcon}
                    >
                      {msg.content}
                    </Item>
                  )
                } else { // I sent to others
                  return (
                    <Item
                      key={msg._id}
                      className='chat-me'
                      extra='Me'
                    >
                      {msg.content}
                    </Item>
                  )
                }
              })
            }
          </QueueAnim>

        </List>

        <div className='am-tab-bar'>
          <InputItem
            placeholder="Please enter"
            value={this.state.content}
            onChange={val => this.setState({content: val})}
            onFocus={() => this.setState({isShow: false})}
            extra={
              <span>
                <span onClick={this.toggleShow} style={{marginRight:5}}>😊</span>
                <span onClick={this.handleSend}>send</span>
              </span>
            }
          />
          {this.state.isShow ? (
            <Grid
              data={this.emojis}
              columnNum={8}
              carouselMaxRow={4}
              isCarousel={true}
              onClick={(item) => {
                this.setState({content: this.state.content + item.text})
              }}
            />
          ) : null}

        </div>
      </div>
    )
  }
}

export default connect(
  state => ({user: state.user, chat: state.chat}),
  {sendMsg, readMsg}
)(Chat)