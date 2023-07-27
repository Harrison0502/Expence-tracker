const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const User = require('../models/user')

module.exports = app => {
  app.use(passport.initialize())
  app.use(passport.session())

  // 設定本地登入策略
  passport.use(new LocalStrategy({ usernameField: 'email', passReqToCallback: true }, (req, email, password, done) => {
    User.findOne({ email })
      .then(user => {
        if (!user) {
          return done(null, false, req.flash('warning_msg', '此 Email 尚未註冊。'))
        }
        if (user.password !== password) {
          return done(null, false, req.flash('warning_msg', 'Email 或密碼錯誤。'))
        }
        return done(null, user)
      })
      .catch(err => done(err, false))
  }))

  // 設定序列化與反序列化
  passport.serializeUser((user, done) => {
    done(null, user.id)
  })
  passport.deserializeUser((id, done) => {
    User.findById(id)
      .lean()//把資料庫物件轉換成 JavaScript 原生物件。
      .then(user => done(null, user))
      .catch(err => done(err, null))
  })
}