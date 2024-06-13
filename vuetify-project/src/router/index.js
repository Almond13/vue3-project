import {createWebHistory, createRouter} from 'vue-router'

import HomeView from '@/pages/Index.vue'
import AboutView from '@/pages/About.vue'
import AboutViewList from '@/pages/AboutList.vue'
import AboutViewDetail from '@/pages/AboutDetail.vue'
import Comments from "@/components/CommentWrap.vue";

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
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})
