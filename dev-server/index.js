/** 详细模块的功能及使用方法，需要查看Node官方文档 **/
const http = require('http')
const path = require('path')
const url = require('url')
const fs = require('fs')
const cp = require('child_process')
const mine = require('./mime')
const config = require('./config')

const server = http.createServer(function (req, res) {
  const pathname = url.parse(req.url).pathname
  let realPath = path.join(__dirname, '../src', pathname)
  let pathExt = path.extname(pathname).slice(1)

  // 对应本地的文件路径
  if (pathname === '/') {
    realPath = path.join(__dirname, '../public/html/index.html')
  } else if (pathExt === 'html' || pathExt === 'js' || pathExt === 'css') {
    realPath = path.join(__dirname, '../public', pathExt, pathname)
  } else if (pathname.indexOf('static') > -1) {
    realPath = path.join(__dirname, '..', pathname)
  }
  let ext = path.extname(realPath)
  ext = ext ? ext.slice(1) : 'unknow'
  fs.exists(realPath, (exists) => {
    if (!exists) {
      res.writeHead(404, {
        'Content-Type': 'text/plain'
      })
      res.write(`This request URL ${pathname} was not found on this server.`)
      res.end()
    } else {
      fs.readFile(realPath, 'binary', function (err, file) {
        if (err) {
          res.writeHead(500, {
            'Content-Type': 'text/plain'
          })
          res.end(err.toString())
        } else {
          const contentType = mine[ext] || 'text/plain'
          res.writeHead(200, {
            'Content-Type': contentType
          })
          res.write(file, 'binary')
          res.end()
        }
      })
    }
  })
})

server.listen(config.port, () => {
  console.log('Server runing at: ', `http://localhost:${config.port}`)
  cp.exec(`open http://localhost:${config.port}`)
})
