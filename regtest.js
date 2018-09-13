'use strict'
const assert = require('assert')
const regFunc = require('./regfunc.js')
const postgres = require('pg')
const Pool = postgres.Pool

const connectionString = process.env.DATABASE_URL || 'postgres://coder:pg123@localhost:5432/reg_data'

const pool = new Pool({
  connectionString
})

describe('Registration Web App', function () {
  beforeEach(async function () {
    await pool.query('delete from registration_table')
  })
// Testing the entries of registration numbers into the database table
  it('The function should add a registration number and the area code of that registration number', async function () {
    let regFuncIn = regFunc(pool)

    await regFuncIn.addReg('CA 123-456')
    await regFuncIn.addReg('CY 123-987')
    let display = await regFuncIn.regDisplay()
    //  looping through a list to get the registration
    let regList = []
    let reg = ''
    for (reg of display) {
      regList.push({ regcode: reg.regcode })
    }

    assert.deepEqual(regList, [{
      regcode: 'CA 123-456'
    },
    {
      regcode: 'CY 123-987'
    }])
  })

  

// Testing the entries of registration codes and towns that match those codes in the database table
  it('The function should add the registration code along with the matching location i.e CA Cape Town', async function () {
    let regFuncIn = regFunc(pool)

    await regFuncIn.addTown('')
    await regFuncIn.addTown('')
    let townDisplay = await regFuncIn.townDisplay()
    //  looping through a list to get the registration
    let regList = []
    let town = ''
    for (town of townDisplay) {
      regList.push({ regcode: town.regcode })
    }

    assert.deepEqual(regList, [{
      : ''
    },
    {
      : ''
    }])
  })

  after(async function () {
    await pool.end()
})

})
