'use strict'
const assert = require('assert')
const regFunc = require('../regfunc.js')
const postgres = require('pg')
const Pool = postgres.Pool

const connectionString = process.env.DATABASE_URL || 'postgres://coder:pg123@localhost:5432/reg_data'

const pool = new Pool({
  connectionString
})

describe('Registration Web App', function () {
  beforeEach(async function () {
    await pool.query('delete from registration_table')
    await pool.query('insert into towns_table(loca, area) values($1,$2)', ['Cape Town', 'CA'])
    await pool.query('insert into towns_table(loca, area) values($1,$2)', ['Belville', 'CY'])
  })
  // Testing the entries of registration numbers into the database table based on the area of that registration number
  it('The function should add a registration number and the area code of that registration number', async function () {
    let regFuncIn = regFunc(pool)

    await regFuncIn.addReg('CA 123-456')
    // await regFuncIn.addReg('CY 123-987')
    let display = await regFuncIn.regDisplay()
    //  looping through a list to get the registration

    let regList = []
    let reg = ''
    for (reg of display) {
      regList.push({
        regcode: reg.regcode,
        code_id: reg.code_id
      })
    }

    assert.deepEqual(regList, [{
      regcode: 'CA 123-456',
      code_id: regList[0].code_id
    }])
  })

  // filters registrations according to the area of which the registration comes from
  it('Should filter registrations by the id of the town', async function () {
    let regFuncIn = regFunc(pool)
    await regFuncIn.addReg('CA 123-456')
    await regFuncIn.addReg('CY 123-456')

    let reg = await regFuncIn.filterTownByID('CA')
    let regList = []

    for (let currentRow of reg) {
      regList.push(currentRow.regcode)
    }

    assert.deepEqual(regList, ['CA 123-456'])
  })

  // the all select filter should display all registration numbers
  it('The all select filter should display all registration numbers', async function () {
    let regFuncIn = regFunc(pool)
    await regFuncIn.addReg('CA 123-456')
    await regFuncIn.addReg('CY 123-456')

    let reg = await regFuncIn.regDisplay()
    let regList = []

    for (let currentRow of reg) {
      regList.push(currentRow.regcode)
    }

    assert.deepEqual(regList, ['CA 123-456', 'CY 123-456'])
  })

  it('The delete button when clicked should delete all entries from the database', async function () {
    let regFuncIn = regFunc(pool)
    await regFuncIn.addReg('CA 123-456')
    await regFuncIn.addReg('CY 123-456')
    await regFuncIn.deleteFromRegistration()
    let display = await regFuncIn.regDisplay()
    assert.deepEqual(display, [])
  })

  after(async function () {
    await pool.end()
  })
})
