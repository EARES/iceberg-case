import Vue from 'vue'
import VueRouter from 'vue-router'
import Dashboard from '../views/Dashboard.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Dashboard',
    component: Dashboard
  },
  {
    path: '/appts',
    name: 'Appointments',
    component: () => import(/* webpackChunkName: "appts" */ '../views/Appointments.vue')
  },
  {
    path: '/addappt',
    name: 'AddAppointment',
    component: () => import(/* webpackChunkName: "addappt" */ '../views/AddAppointment.vue')
  },
  {
    path: '/editappt/:id',
    name: 'EditAppointment',
    component: () => import(/* webpackChunkName: "editappt" */ '../views/EditAppointment.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
