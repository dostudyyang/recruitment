/*
Router component of the main interface
 */

import React, {Component} from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import Cookies from 'js-cookie'  // 可以操作前端cookie的对象 set()/get()/remove()
import {NavBar} from 'antd-mobile'

import LaobanInfo from '../laoban-info/laoban-info'
import DashenInfo from '../dashen-info/dashen-info'
import Dashen from '../dashen/dashen'
import Laoban from '../laoban/laoban'
import Message from '../message/message'
import Personal from '../personal/personal'
import NotFound from '../../components/not-found/not-found'
import NavFooter from '../../components/nav-footer/nav-footer'
import Chat from '../chat/chat'


import {getRedirectTo} from '../../utils'
import {getUser} from '../../redux/actions'

class Main extends Component {

  // Add properties to the component object
  navList = [
    {
      path: '/laoban', // Routing path
      component: Laoban,
      title: 'Candidates List',
      icon: 'dashen',
      text: 'candidates',
    },
    {
      path: '/dashen', // Routing path
      component: Dashen,
      title: 'Recruiter List',
      icon: 'laoban',
      text: 'recruiter',
    },
    {
      path: '/message', // Routing path
      component: Message,
      title: 'Message List',
      icon: 'message',
      text: 'message',
    },
    {
      path: '/personal', // Routing path
      component: Personal,
      title: 'User Center',
      icon: 'personal',
      text: 'personal',
    }
  ]

  componentDidMount () {
    //登陆过(cookie中有userid), 但没有有登陆(redux管理的user中没有_id) 发请求获取对应的user
    const userid = Cookies.get('userid')
    const {_id} = this.props.user
    if(userid && !_id) {
      // 发送异步请求, 获取user
      // console.log('发送ajax请求获取user')
      this.props.getUser()
    }
  }

  render() {

    // 读取cookie中的userid
    const userid = Cookies.get('userid')
    // 如果没有, 自动重定向到登陆界面
    if(!userid) {
      return <Redirect to='/login'/>
    }
    // 如果有,读取redux中的user状态
    const {user, unReadCount} = this.props
    // 如果user有没有_id, 返回null(不做任何显示)
    // debugger
    if(!user._id) {
      return null
    } else {
      // 如果有_id, 显示对应的界面
      // 如果请求根路径, 根据user的type和header来计算出一个重定向的路由路径, 并自动重定向
      let path = this.props.location.pathname
      if(path==='/') {
        // 得到一个重定向的路由路径
        path = getRedirectTo(user.type, user.header)
        return <Redirect to= {path}/>
      }
    }

    const {navList} = this
    const path = this.props.location.pathname // 请求的路径
    const currentNav = navList.find(nav=> nav.path===path) // 得到当前的nav, 可能没有

    if(currentNav) {
      // 决定哪个路由需要隐藏
      if(user.type==='laoban') {
        // 隐藏数组的第2个
        navList[1].hide = true
      } else {
        // 隐藏数组的第1个
        navList[0].hide = true
      }
    }

    return (
      <div>
        {currentNav ? <NavBar className='sticky-header'>{currentNav.title}</NavBar> : null}
        <Switch>
          {
            navList.map(nav => <Route key={nav.path} path={nav.path} component={nav.component}/>)
          }
          <Route path='/laobaninfo' component={LaobanInfo}/>
          <Route path='/dasheninfo' component={DashenInfo}/>
          <Route path='/chat/:userid' component={Chat}/>

          <Route component={NotFound}/>
        </Switch>
        {currentNav ? <NavFooter navList={navList} unReadCount={unReadCount}/> : null}
      </div>
    )
  }
}

export default connect(
  state => ({user: state.user, unReadCount: state.chat.unReadCount}),
  {getUser}
)(Main)

/*
1. 实现自动登陆:
  1. componentDidMount()
    登陆过(cookie中有userid), 但没有有登陆(redux管理的user中没有_id) 发请求获取对应的user:
  2. render()
    1). 如果cookie中没有userid, 直接重定向到login
    2). 判断redux管理的user中是否有_id, 如果没有, 暂时不做任何显示
    3). 如果有, 说明当前已经登陆, 显示对应的界面
    4). 如果请求根路径: 根据user的type和header来计算出一个重定向的路由路径, 并自动重定向
 */