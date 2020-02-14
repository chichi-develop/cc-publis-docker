import Express from 'express'
import createError from 'http-errors'
import * as controller from './oracle'
import { User } from '../types/api'

export default (app: Express.Application) => {

  app.get('/ccdb/cstm/:columnName/:key', controller.cstmSearch)
  app.post('/ccdb/cstm', controller.cstmInsert)
  app.put('/ccdb/cstm', controller.cstmUpsert)

  app.get('/ccdb/csmm/:key', controller.csmmSearch)
  app.put('/ccdb/csmm', controller.csmmUpsert)
  app.delete('/ccdb/csmm/:key1/:key2', controller.csmmDelete)

  app.get('/ccdb/kiyk/:columnName/:key', controller.kiykSearch)
  app.get('/ccdb/kyzd/:key', controller.kyzdSearch)

  app.get('/ccdb/ctzh/:key', controller.ctzhSearch)
  app.get('/ccdb/kyzh/:key', controller.kyzhSearch)
  app.get('/ccdb/gycm', controller.gycmSearch)
  // app.get('/ccdb/gycm/:key1/:key2', controller.gycmSearch)

  // ______________________________________________________
  //
  // session.count 初期化 middleWare
  //
  // app.use((req, res, next) => {
  //   if (req.session !== undefined) {
  //     if (req.session.count === undefined || req.session.count === null) {
  //       req.session.count = 0
  //     }
  //   }
  //   next()
  // })
  // ______________________________________________________
  //
  // 画面表示用 ルート・ハンドラー
  //
  // app.get('/', (req, res, next) => {
  //   if (req.session) {
  //     if (req.session.count === undefined) return
  //     const data: { count: number } = { count: req.session.count }
  //     res.render('index.ejs', data)
  //     return
  //   }
  //   next(createError(401))
  // })
  // ______________________________________________________
  //
  // 「ping」ボタン押下時の リクエストハンドラー
  //
  // app.get('/ping', (req, res, next) => {
  //   if (req.session) {
  //     if (req.session.count !== undefined) {
  //       req.session.count++
  //       const data: Health = { message: 'pong', count: req.session.count }
  //       res.send(data)
  //       return
  //     }
  //   }
  //   next(createError(401))
  // })
}
