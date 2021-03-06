module.exports = function (pool) {
  // insert reg number into database
  async function addReg (regNum) {
    let regSubString = regNum.substring(0, 3).trim()
    let townId = await pool.query('select id from towns_table where area =$1', [regSubString])
    let allReg = await pool.query('select * from registration_table where regcode =$1', [regNum])
    if (townId.rowCount > 0) {
      if (allReg.rowCount === 0) {
        // if (townId.rows > 0) {
        await pool.query('insert into registration_table(regcode, code_id) values ($1, $2)', [regNum, townId.rows[0].id])
        return {
          success: true
        }
      }
      return {
        success: false,
        startsWith: regSubString
      }
    }
    return {
      success: false,
      startsWith: regSubString
    }
  }

  async function dupli () {
    let map = await regDisplay()
    let duplicate = []
    for (const current of map) {
      duplicate.push(current.regcode)
    }
    return duplicate
  }

  // checking the reg table for the insert of the reg num
  async function regDisplay () {
    let display = await pool.query('select * from registration_table')
    return display.rows
  }
  // the addTown function inserts a location and area into the towns table i.e loca = Cape Town area = CA
  async function addTown (regCode, area) {
    area = area.toUpperCase()

    let foundTown = await pool.query(`select * from towns_table where loca='${regCode}'`)
    if (foundTown.rowCount > 0) {
      return false
    }
    await pool.query('insert into towns_table(loca, area) values($1, $2)', [regCode, area])
    return true
  }

  // the townDisplay function retrives all entries in the towns_table
  async function townDisplay () {
    let displayTable = await pool.query('select loca, area from towns_table')
    return displayTable.rows
  }
  // the townDisplay function retrives all entries in the towns_table
  async function displayOfTownsTable () {
    let displayTable = await pool.query('select * from towns_table')
    return displayTable.rows
  }
  // the filterTownByID function filters towns by the id of towns_table and references it in the registration_table i.e ID = 1 loca = Cape Town area = CA || code_id = 1 regcode = CA 123-456
  async function filterTownByID (town) {

    if (town === 'all') {
      let all = await regDisplay()
      return all
    }
    // substring
    let townsCode = await pool.query('select id from towns_table where area =$1', [town])

    // for loop goes here
    let regCode = await pool.query('select * from registration_table where code_id =$1', [townsCode.rows[0].id])
    return regCode.rows
  }

  async function populateDropDown () {
    let regList = [{
      townName: 'Cape Town',
      townTag: 'CA'
    }]

    for (let reg in regList) {
      await pool.query('insert into towns_table(loca, area) values($1, $2)', [reg.townName, reg.townTag])
    }
  }
  async function deleteEverything () {
    await pool.query('delete from registration_table')
    await pool.query('delete from towns_table')
  }

  return {
    addReg,
    regDisplay,
    addTown,
    townDisplay,
    displayOfTownsTable,
    filterTownByID,
    populateDropDown,
    deleteEverything,
    dupli

  }
}
