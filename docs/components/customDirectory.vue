<template>
  <div>
    <ul>
      <li v-for="page in pages" :key="page.path" :class="`${page.path}`">
        <a :href="page.path">{{ page.title }}</a>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
const transformDate = (path: string) => {
  let time = path.replace('./../pages/', '').replace('.html', '').split('-')[0]
  let arr = time.split('.')
  time = arr.map(el => el.length < 2 ? '0' + el : el).join('-')
  return new Date(`20${time.split('.').reverse().join('-')}`)
}
export default {
  computed: {
    pages() {
      // @ts-ignore
      const pageContext = import.meta.glob(`../pages/*.md`, { as: 'raw', eager: true })
      return Object.keys(pageContext).map((path) => {
        const title = path.replace('../pages/', '').replace('.md', '');
        if (process.env.NODE_ENV === 'development') {
          return { title, path: `./../pages/${title}.html` };
        } else {
          return { title, path: `/blog/pages/${title}.html` };
        }
      })

        .sort((a, b) => {
          let dateA = transformDate(a.path)
          let dateB = transformDate(b.path)
          if (dateA < dateB) {
            return -1;
          } else if (dateA > dateB) {
            return 1;
          } else {
            return 0;
          }
        })
    },
  },
};
</script>