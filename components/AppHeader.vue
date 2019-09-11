<template>
  <b-navbar class="mb-4" toggleable="md" type="dark" variant="info">
    <router-link to="/">
      <b-navbar-brand>BookShelf</b-navbar-brand>
    </router-link>

    <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

    <b-collapse is-nav id="nav_collapse">
      <b-navbar-nav>
        <b-nav-item :to="{ path: '/search' }">本を検索する</b-nav-item>
        <b-nav-item :to="{ path: '/add' }">本を追加する</b-nav-item>
        <!-- <b-nav-item href="#" disabled>Disabled</b-nav-item> -->
      </b-navbar-nav>

      <!-- Right aligned nav items -->
    </b-collapse>
  </b-navbar>
</template>

<script>
export default {
  data() {
    return {
      q: ''
    }
  },

  methods: {
    searchBook(e) {
      e.preventDefault()
      this.$router.push({ path: '/search', query: { q: this.q } })
    }
  }
}
</script>
