import Vue from 'vue'
import Router from 'vue-router'
import Home from './components/HomeComponent'
import AddEdit from './components/AddEditComponent'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: '/add',
            name: 'add',
            component: AddEdit
        },
        {
            path: '/edit',
            name: 'edit',
            component: AddEdit,
            props: true
        }
    ],
    mode: 'history'
})
