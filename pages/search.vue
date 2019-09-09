<template>
  <section class="container">
    <h3 class="mb-4">本を検索する</h3>
    <b-form class="mb-5" @submit="searchBookshelf">
      <b-input-group>
        <b-form-input
          id="bookInput"
          v-model="query"
          placeholder="本のタイトル"
        ></b-form-input>
        <b-button slot="append" type="submit" variant="primary">検索</b-button>
      </b-input-group>
    </b-form>

    <p v-if="items.length > 0">
      「{{ query }}」の検索結果：{{ items.length }}件
    </p>

    <ul class="list-unstyled">
      <b-media
        v-for="(item, index) in items"
        :key="index"
        tag="li"
        class="mb-5"
        no-body
      >
        <b-media-aside class="align-items-start">
          <b-img slot="aside" width="110" :src="item.imageUrl" alt="" />
        </b-media-aside>
        <b-media-body class="ml-3">
          <h4 class="mt-0">{{ item.title }}</h4>
          <p>{{ getDescription(item.description) }}</p>
          <p>
            著者：<template v-for="author in item.authors"
              >{{ author }} /
            </template>
            発売日：{{ item.publishedDate }}
          </p>
          <b-button
            :href="`https://books.google.co.jp/books?id=${item.googleBooksId}`"
            target="_blank"
            variant="success"
            >詳細を見る</b-button
          >
          <b-button variant="danger" @click="deleteBook(item, index)"
            >削除</b-button
          >
        </b-media-body>
      </b-media>
    </ul>
  </section>
</template>

<script>
import firebase from '~/plugins/firebase'

export default {
  data() {
    return {
      query: '',
      items: []
    }
  },

  methods: {
    getDescription(text) {
      if (text) {
        return text.length > 80 ? text.substr(0, 80) + '…' : text
      } else {
        return ''
      }
    },

    searchBookshelf(e) {
      e.preventDefault()

      this.items = []
      const db = firebase.firestore()

      db.collection('books')
        .where('title', '==', this.query)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            const item = doc.data()
            item.firebaseId = doc.id
            this.items.push(item)
          })
        })
    }
  }
}
</script>
