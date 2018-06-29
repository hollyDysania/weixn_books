<template>
  <div>
    <div v-for="book in books" :key="book.id">
      {{book.title}}
    </div>
  </div>
</template>
<script>
import { get } from 'common/js/util'
export default {
  data () {
    return {
      books: []
    }
  },
  created () {
    this.getbooksList()
  },
  methods: {
    async getbooksList () {
      let bookList = await get('/weapp/booklist')
      console.log(bookList)
      this.books = bookList.list
    }
  }
}
</script>
<style>
</style>

