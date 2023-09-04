<template>
  <div>
    <ul>
      <li v-for="page in pages" :key="page.path">
        <a :href="page.path">{{ page.title }}</a>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
export default {
  computed: {
    pages() {
      // @ts-ignore
      const pageContext = import.meta.glob(`../pages/*.md`, { as: 'raw', eager: true })
      return Object.keys(pageContext).map((path) => {
        const title = path.replace('../pages/', '').replace('.md', '');
        return { title, path: `./../pages/${title}.html` };
      });
    },
  },
};
</script>