module.exports = function (pool) {
  // insert reg number into database
  async function addReg (regnum) {
    await pool.query('insert into registration_table(regcode) values ($1)', [regnum])
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
    let displayTable = await pool.query('select loca from towns_table')
    return displayTable.rows
  }

  return {
    addReg,
    regDisplay,
    addTown,
    townDisplay

  }
}
