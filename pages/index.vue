<template>
  <section class="container">
    <h3 class="mb-4">本の一覧</h3>

    <ul class="list-unstyled">
      <b-media
        v-for="(item, index) in items"
        :key="index"
        no-body
        tag="li"
        class="mb-5"
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
      items: []
    }
  },

  mounted() {
    const db = firebase.firestore()
    db.collection('books')
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const item = doc.data()
          item.firebaseId = doc.id
          this.items.push(item)
        })
      })
  },

  methods: {
    getDescription(text) {
      if (text) {
        return text.length > 80 ? text.substr(0, 80) + '…' : text
      } else {
        return ''
      }
    },

    deleteBook(item, index) {
      const self = this
      const db = firebase.firestore()
      db.collection('books')
        .doc(item.firebaseId)
        .delete()
        .then(function() {
          self.items.splice(index, 1)
          // eslint-disable-next-line no-console
          console.log('Document successfully deleted!')
        })
        .catch(function(error) {
          // eslint-disable-next-line no-console
          console.error('Error removing document: ', error)
        })
    }
  }
}
</script>
