module.exports = function (RegFunc) {
  // this function renders the home page
  async function home (req, res, next) {
    try {
      await RegFunc.regDisplay()
      await RegFunc.displayOfTownsTable()
      let display = await RegFunc.regDisplay()
      let showTown = await RegFunc.townDisplay()

      res.render('index', { display, showTown })
    } catch (error) {
      next()
    }
  }
  // this function accepts a registration input and renders it to the screen
  async function regCheckRoute (req, res, next) {
    try {
      let regInput = req.body.regInput
      regInput = regInput.toUpperCase()
      let status = await RegFunc.addReg(regInput)
      if (!status.success) {
        let map = await RegFunc.dupli()
        map.indexOf(regInput) > -1 ? req.flash('message', `This registration number has already been added`) : req.flash('message', `Please add a town and a registration code that starts with ${status.startsWith} for that corresponding town`)
      } else if (status.success) {
        req.flash('successful', `Your registration number for that corresponding town has been added`)
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
        let found = await RegFunc.addTown(townInput, locationCode)

        if (found) {
          req.flash('successfully', 'Successfully added')
        } else {
          req.flash('error', 'This registration code and location already exists')
        }
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

      // if (locationInput === 'all') {
      //   res.redirect('/')
      // } else {
      let display = await RegFunc.filterTownByID(locationInput)
      let showTown = await RegFunc.townDisplay()

      res.render('index', { display, locationInput, showTown })
      // }
    } catch (error) {
      next(error.stack)
    }
  }

  async function resetAll (req, res, next) {
    try {
      let townReset = await RegFunc.deleteEverything()
      req.flash('successful', 'Successfully deleted')
      res.redirect('/')
    } catch (error) {
      req.flash('error', 'Please reset the registration number plates before attempting to reset')
      res.redirect('/')
      next(error.stack)
    }
  }

  return {
    home,
    regCheckRoute,
    locationAdd,
    filterReg,
    resetAll
  }
}
