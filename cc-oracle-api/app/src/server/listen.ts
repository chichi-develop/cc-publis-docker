import Express from 'express'
import { APP_PORT } from '../config/constants'

export default (app: Express.Application) => {
  app.listen(APP_PORT, () => {
    console.log(`Running on Port: ${APP_PORT}`)
  })
}
