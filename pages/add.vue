<template>
  <section class="container">
    <h3 class="mb-4">本を追加する</h3>

    <b-form class="mb-5" @submit="searchBooks">
      <b-input-group>
        <b-form-input
          id="bookInput"
          v-model="query"
          placeholder="本のタイトル"
        ></b-form-input>
        <b-button slot="append" type="submit" variant="primary">検索</b-button>
      </b-input-group>
    </b-form>

    <ul class="list-unstyled">
      <b-media
        v-for="(item, index) in items"
        :key="index"
        no-body
        tag="li"
        class="mb-5"
      >
        <b-media-aside class="align-items-start">
          <b-img slot="aside" width="110" :src="getItemImage(item)" alt />
        </b-media-aside>
        <b-media-body class="ml-3">
          <h4 class="mt-0">{{ item.volumeInfo.title }}</h4>
          <p>{{ getDescription(item.volumeInfo.description) }}</p>
          <p>
            著者：
            <template v-for="author in item.volumeInfo.authors"
              >{{ author }} /</template
            >
            発売日：{{ item.volumeInfo.publishedDate }}
          </p>
          <b-button variant="primary" @click="addBook(item)"
            >本棚に追加</b-button
          >
          <b-button
            :href="`https://books.google.co.jp/books?id=${item.id}`"
            target="_blank"
            variant="success"
            >詳細を見る</b-button
          >
        </b-media-body>
      </b-media>
    </ul>
  </section>
</template>

<script>
import axios from 'axios'
import firebase from '~/plugins/firebase'

export default {
  data() {
    return {
      query: '',
      items: []
    }
  },

  methods: {
    getItemImage(item) {
      if (item.volumeInfo.imageLinks) {
        const images = item.volumeInfo.imageLinks
        return images.thumbnail ? images.thumbnail : images.smallThumbnail
      } else {
        return 'https://placehold.jp/150x150.png'
      }
    },

    getDescription(text) {
      if (text) {
        return text.length > 80 ? text.substr(0, 80) + '…' : text
      } else {
        return ''
      }
    },

    searchBooks(e) {
      e.preventDefault()

      const self = this

      axios
        .get('https://www.googleapis.com/books/v1/volumes', {
          params: {
            q: self.query
          }
        })
        .then(function(response) {
          self.items = response.data.items
        })
        .catch(function(error) {
          console.log(error)
        })
    },

    addBook(item) {
      const db = firebase.firestore()
      const book = {
        googleBooksId: item.id,
        title: item.volumeInfo.title,
        description: item.volumeInfo.description,
        authors: item.volumeInfo.authors,
        publishedDate: item.volumeInfo.publishedDate,
        infoLink: item.volumeInfo.infoLink
      }
      if (item.volumeInfo.imageLinks) {
        const images = item.volumeInfo.imageLinks
        book.imageUrl = images.thumbnail
          ? images.thumbnail
          : images.smallThumbnail
      } else {
        book.imageUrl = ''
      }

      db.collection('books')
        .add(book)
        .then(function(docRef) {
          console.log('Document written with ID: ', docRef.id)
        })
        .catch(function(error) {
          console.error('Error adding document: ', error)
        })
    }
  }
}
</script>

<style scoped></style>
