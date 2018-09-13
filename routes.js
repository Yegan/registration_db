module.exports = function (regFunc) {
  // this function renders the home page
  async function home (req, res) {
    res.render('index')
  }
  // this function accepts a registration input and renders it to the screen
  async function regCheckRoute (req, res, next) {
    try {
      let regInput = req.body.regInput
      await regFunc.addReg(regInput)
      let display = await regFunc.regDisplay()
      res.render('index', { display })
    }
    catch (error) {
      next(error.stack)
    }
  }
// This function adds dynamic area codes to the dropdown menu
  async function locationAdd (req, res, next) {
    try {
      let townInput = req.body.location
      let locationCode = req.body.townInput2
      await regFunc.addTown(townInput,locationCode)
      let showTown = await regFunc.townDisplay()

      res.render('index', { showTown })
    } catch (error) {
      next(error.stack)
    }
  }
  return {
    home,
    regCheckRoute,
    locationAdd
  }
}
