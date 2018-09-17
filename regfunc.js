module.exports = function (pool) {
  // insert reg number into database
  async function addReg (regNum) {
    let regSubString = regNum.substring(0, 3).trim()
    let townId = await pool.query('select id from towns_table where area =$1', [regSubString])
    if (townId.rows.length > 0) {
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

  // checking the reg table for the insert of the reg num
  async function regDisplay () {
    let display = await pool.query('select * from registration_table')
    return display.rows
  }
  // the addTown function inserts a location and area into the towns table i.e loca = Cape Town area = CA
  async function addTown (regCode, area) {
    await pool.query('insert into towns_table(loca, area) values($1, $2)', [regCode, area])
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
    // substring
    let townsCode = await pool.query('select id from towns_table where area =$1', [town])

    // for loop goes here
    let regCode = await pool.query('select * from registration_table where code_id =$1', [townsCode.rows[0].id])

    return regCode
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

  return {
    addReg,
    regDisplay,
    addTown,
    townDisplay,
    displayOfTownsTable,
    filterTownByID,
    populateDropDown

  }
}
