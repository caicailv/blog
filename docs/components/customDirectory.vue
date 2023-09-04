<template>
  <div>
    <h2>Contents:</h2>
    <ul>
      <li v-for="page in pages" :key="page.path">
        <router-link :to="page.path">{{ page.title }}</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  computed: {
    pages() {
      // const pageContext = import.meta('./pages', false, /\.md$/);
      console.log('import.meta',import.meta);
      // const pageContext = import.meta.gloEager('./pages', false, /\.md$/);

      return []
      // return pageContext.keys().map((path) => {
      //   const title = path.replace('./', '').replace('.md', '');
      //   return { title, path };
      // });
    },
  },
};
</script>