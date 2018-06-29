const { mysql } = require('../qcloud')

module.exports =  async ctx => {
  console.log(ctx, 666)
  const books = await mysql('books').select("*")
  console.log(books)
  ctx.state.data ={ 
    list: books
  }
}
