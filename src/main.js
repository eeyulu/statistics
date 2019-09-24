// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import VueRouter from 'vue-router'
import App from './App'
import Home from './components/HelloFromVux'
import LinkedPage from './components/LinkedPage'
import BasicData from './components/BasicData'
import InBed from './components/InBed'
import Hospitalized from './components/Hospitalized'
import LeaveHospital from './components/LeaveHospital'
import Emergency from './components/Emergency'
import Outpatient from './components/Outpatient'

import Critical from './components/Critical'
import NewCritical from './components/NewCritical'
import Operation from './components/Operation'
import OrderOperation from './components/OrderOperation'

import OperatSort from './components/OperatSort'
import OperatGrade from './components/OperatGrade'
import OperatFilter from './components/OperatFilter'

import CardTest from './components/CardTest'


Vue.use(VueRouter)

const routes = [{
  path: '/',
  component: BasicData
},
// {
//   path: '/basicData',
//   component: BasicData
// },
{
  path: '/inBed',
  component: InBed
},{
  path:'/Hospital',
  component:Hospitalized
},{
  path:'/leaveHospital',
  component:LeaveHospital
},{
  path:'/emergency',
  component:Emergency
},{
  path:'/outpatient',
  component:Outpatient
},{
  path:'/critical',
  component:Critical
},{
  path:'/newCritical',
  component:NewCritical
},{
  path:'/operation',
  component:Operation
},{
  path:'/orderOperation',
  component:OrderOperation
},{
  path:'/operatSort',
  component:OperatSort
},{
  path:'/operatGrade/:pattern',
  component:OperatGrade,  
},{
  path:'/operatFilter/:pattern',
  component:OperatFilter,  
}

,{
  path:'/cardTest',
  component:CardTest
}]

const router = new VueRouter({
  mode:'history',
  routes
})

FastClick.attach(document.body)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  router,
  render: h => h(App)
}).$mount('#app-box')
