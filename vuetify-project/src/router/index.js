import {createWebHistory, createRouter} from 'vue-router'

import HomeView from '@/pages/Index.vue'
import AboutView from '@/pages/About.vue'
import AboutViewList from '@/pages/AboutList.vue'
import AboutViewDetail from '@/pages/AboutDetail.vue'
import Comments from "@/components/CommentWrap.vue";
import CategoryView from "@/pages/Category.vue";

const routes = [
  {path: '/', component: HomeView},
  {name: 'about', path: '/about', component: AboutView,
    redirect: {name: 'aboutList'},
    children: [
      {
        name: 'aboutList',
        path: ':page?',
        component: AboutViewList,
      },
      {
        name: 'aboutDetail',
        path: 'post/:id?',
        component: AboutViewDetail,
        children:[
          {
            name: 'comment',
            path: '',
            component: Comments
          }
        ]
      }
    ]
  },
  {name: 'category', path: '/category', component: CategoryView,
    redirect: {name: 'categoryList'},
    children: [
      {
        name: 'categoryList',
        path: ':page?',
        component: AboutViewList
      },
      {
        name: 'unclassifiedList',
        path: 'unclassified/:page?',
        component: AboutViewList
      },
      {
        name: 'testList',
        path: 'test/:page?',
        component: AboutViewList
      },
      {
        name: 'categoryDetail',
        path: 'post/:id?',
        component: AboutViewDetail,
        children:[
          {
            name: 'comment',
            path: '',
            component: Comments
          }
        ]
      }
    ]
  }
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})
