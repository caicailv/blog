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


        // return { title, path: `./../pages/${title}.html` };
      })

        //       const sortedData = data.sort((a, b) => {
        //   const dateA = new Date(`20${a.split('-')[0]}`);
        //   const dateB = new Date(`20${b.split('-')[0]}`);

        //   return dateA - dateB;
        // });
        .sort((a: any, b: any) => {
          const dateA = Date.parse(new Date(`20${a.path.split('-')[0]}`));
          const dateB = Date.parse(new Date(`20${b.path.split('-')[0]}`));
          return dateA - dateB;
        })
    },
  },
};
</script>