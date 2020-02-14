import Express from 'express'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import cors from 'cors'

export default (app: Express.Application) => {
  app.use(bodyParser.urlencoded({ extended: true }))
  app.use(bodyParser.json())
  app.use(cookieParser())
  app.use(cors())
  app.use(function (req, res, next) {
    // var utf8uri = new RegExp(
    //   "%[0-7][0-9A-F]|" +
    //   "%C[2-9A-F]%[89AB][0-9A-F]|%D[0-9A-F]%[89AB][0-9A-F]|" +
    //   "%E[0-F](?:%[89AB][0-9A-F]){2}|" +
    //   "%F[0-7](?:%[89AB][0-9A-F]){3}|" +
    //   "%F[89AB](?:%[89AB][0-9A-F]){4}|" +
    //   "%F[CD](?:%[89AB][0-9A-F]){5}", "ig");
    // let s = req.path.replace(utf8uri, function (whole) {
    //   return decodeURIComponent(whole);
    // });

    let s = req.path.replace(/%(?:25)+([0-9A-F][0-9A-F])/g, function (whole, m1) {
      return decodeURIComponent("%" + m1);
    });

    // decodeURIComponent(req.path)
    next()
  })
}
