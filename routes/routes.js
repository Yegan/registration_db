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
      if (townInput === undefined || locationCode === undefined || townInput === '' || locationCode === '') {
        req.flash('error', 'Please fill in a location and a registration code')
      } else {
        await regFunc.addTown(townInput, locationCode)
      }
      res.redirect('/')
    } catch (error) {
      next(error.stack)
    }
  }
  // filters all the registration numbers according the location/area selected from the dropdown menu
  async function filterReg (req, res, next) {
    try {
      let locationInput = req.params.tag

      if (locationInput === 'all') {
        res.redirect('/')
      } else {
        let display = await regFunc.filterTownByID(locationInput)
        let showTown = await regFunc.townDisplay()

        res.render('index', { display, locationInput, showTown })
      }
    } catch (error) {
      next(error.stack)
    }
  }

  async function resetReg (req, res, next) {
    try {
      let tableReset = await regFunc.deleteFromRegistration()
      res.redirect('/')
    } catch (error) {
      next(error.stack)
    }
  }

  async function resetTown (req, res, next) {
    try {
      let townReset = await regFunc.deleteFromTown()
      res.redirect('/')
    } catch (error) {
      next(error.stack)
    }
  }

  return {
    home,
    regCheckRoute,
    locationAdd,
    filterReg,
    resetReg,
    resetTown
  }
}
