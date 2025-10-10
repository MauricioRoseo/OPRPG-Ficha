export default class Middleware {
    static logger(req, res, next) {
      console.log(`${new Date().toLocaleString()} ${req.method} ${req.url}`)
      next()
    }
  
    static errorHandler(error, req, res, next) {
      console.error(error)
  
      if (error?.type === "entity.parse.failed" && error.message.includes("JSON")) {
        return res.status(400).json({
          message: "JSON inválido, verifique a formatação dos dados!",
        })
      }
  
      return res.status(500).json({
        message: "Erro inesperado, tente novamente mais tarde.",
      })
    }
  }
  