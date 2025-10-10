class BaseController {
    static welcome(req, res) {
      return res.json({
        message: "Bem-vindo à API!",
      })
    }
  
    static notFound(req, res) {
      return res.status(404).json({
        message: "Rota não encontrada!",
      })
    }
  }
  
  export default BaseController
  