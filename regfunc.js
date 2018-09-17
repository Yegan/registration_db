module.exports = function (pool) {
  // insert reg number into database
  async function addReg (regNum) {
    let regSubString = regNum.substring(0, 3).trim()
    let townId = await pool.query('select id from towns_table where area =$1', [regSubString])
    await pool.query('insert into registration_table(regcode, code_id) values ($1, $2)', [regNum, townId.rows[0].id])
  }

  // checking the reg table for the insert of the reg num
  async function regDisplay () {
    let display = await pool.query('select * from registration_table')
    return display.rows
  }

  async function addTown (regCode, area) {
    await pool.query('insert into towns_table(loca, area) values($1, $2)', [regCode, area])
  }

  async function townDisplay () {
    let displayTable = await pool.query('select loca, area from towns_table')
    return displayTable.rows
  }

  async function displayOfTownsTable () {
    let displayTable = await pool.query('select * from towns_table')
    return displayTable.rows
  }

  async function filterTownByID (town) {
    // substring
    let townsCode = await pool.query('select id from towns_table where area =$1', [town])

    // for loop goes here
    let regCode = await pool.query('select * from registration_table where code_id =$1', [townsCode.rows[0].id])

    return regCode
  }

  return {
    addReg,
    regDisplay,
    addTown,
    townDisplay,
    displayOfTownsTable,
    filterTownByID

  }
}
