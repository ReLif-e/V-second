import Layout from '@/layout'

export default {
  path: '/employees',
  component: Layout,
  children: [
    {
      path: '',
      name: 'employees',
      component: () => import('@/views/employees/employees.vue'),
      meta: { title: '员工', icon: 'people' }
    },
    {
      path: 'detail/:id',
      name: 'detail',
      component: () => import('@/views/employees/detail.vue'),
      meta: { title: '员工', icon: 'people' },
      hidden: true

    }
  ]

}
