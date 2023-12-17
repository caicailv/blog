import imgLazy from 'markdown-it-img-lazy'
import imgStyle from './imgStyle'
console.log('abc');
export default {
  title: '菜菜驴',
  ignoreDeadLinks: true,
  description: 'Vite & Vue powered static site generator.',
  config(md) {
    md.use(imgStyle).use(imgLazy)
  },
  base:'/blog'
,
  vite:{
    base:'/blog'
  }
}
