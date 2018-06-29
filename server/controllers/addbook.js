// 新增图书接口
// 1.获取豆瓣信息
// https://api.douban.com/v2/book/isbn
// 2.入库
const https = require('https')
const { mysql } = require('../qcloud')
module.exports = async ctx => {
  const { isbn, openid } = ctx.request.body
  if (isbn && openid) {
    // 防止重复插入数据
    // 查询表中已经有数据 直接return
    const findRes = await mysql('books').select().where('isbn', isbn)
    if(findRes.length){
      ctx.state = {
        code: -1,
        data: {
          msg: '图书已存在'
        }
      }
      return
    }
    let url = `https://api.douban.com/v2/book/isbn/${isbn}`
    const bookInfo = await getJSON(url)
    const rate = bookInfo.rating.average
    const { title, image, alt, publisher, summary, price } = bookInfo
    const tags = bookInfo.tags
      .map(v => {
        return `${v.title} ${v.count}`
      })
      .join(',')
    const author = bookInfo.author.join(',')
    // 向msql插入数据
    try {
      await mysql('books').insert({
        isbn,
        openid,
        rate,
        title,
        image,
        alt,
        publisher,
        summary,
        price,
        tags,
        author
      })
      // 返回的数据
      ctx.state.data = {
        title,
        isbn,
        openid,
        rate,
        image,
        alt,
        publisher,
        summary,
        price,
        tags,
        author,
        msg: 'success'
      }
    } catch (e) {
      ctx.state = {
        code: -1,
        data: {
          msg: '新增失败：' + e.sqlMessage
        }
      }
    }
  }
}
function getJSON(url) {
  return new Promise((reslove, reject) => {
    https.get(url, res => {
      let urlData = ''
      res.on('data', data => {
        urlData += data
        console.log('略略', urlData)
      })
      res.on('end', data => {
        console.log('哈哈哈', data)
        const bookinfo = JSON.parse(urlData)
        if (bookinfo.title) {
          reslove(bookinfo)
        }
        reject(bookinfo)
      })
    })
  })
}
