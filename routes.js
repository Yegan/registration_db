module.exports = function (regFunc) {
  // this function renders the home page
  async function home (req, res) {
    res.render('index')
  }
  // this function inputs a registration
  async function regCheckRoute (req, res, next) {
    try {
      let regInput = req.body.regInput
      await regFunc.addReg(regInput)
      let display = await regFunc.regDisplay()

      console.log(display)
      res.render('index', { display })
    } 
    catch (error) {
      next(error.stack)
    }
  }

  return {
    home,
    regCheckRoute
  }
}
