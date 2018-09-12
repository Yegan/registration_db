'use strict'
const assert = require('assert')
const regFunc = require('../regFunc.js')
const postgres = require('pg')
const Pool = postgres.Pool

const connectionString = process.env.DATABASE_URL || 'postgres://coder:coder123@localhost:5432/registration_DB'

const pool = new Pool({
  connectionString
})

describe('Registration Web App', function () {
  beforeEach(async function () {
    await pool.query('delete from registration_table')
  })

  it('The function should add a registration number and the area code of that registration number', async function () {
    let regFuncIn = regFunc(Pool)

    let regnum = await regFuncIn.addReg('CA 123-456')

    assert.equal(regnum, 'CA 123-456')

  })
})
