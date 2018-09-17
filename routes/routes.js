module.exports = function (regFunc) {
  // this function renders the home page
  async function home (req, res, next) {
    try {
      await regFunc.regDisplay()
      await regFunc.displayOfTownsTable()
      let display = await regFunc.regDisplay()
      let showTown = await regFunc.townDisplay()

      res.render('index', { display, showTown })
    } catch (error) {
      next()
    }
  }
  // this function accepts a registration input and renders it to the screen
  async function regCheckRoute (req, res, next) {
    try {
      let regInput = req.body.regInput
      let status = await regFunc.addReg(regInput)
      if (!status.success) {
        req.flash('message', `Please add a town and a registration code that starts with ${status.startsWith} for that corresponding town`)
      }
      res.redirect('/')
    } catch (error) {
      next(error.stack)
    }
  }

  // This function adds dynamic area codes to the dropdown menu
  async function locationAdd (req, res, next) {
    try {
      let townInput = req.body.location
      let locationCode = req.body.townInput2
      await regFunc.addTown(townInput, locationCode)

      res.redirect('/')
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
