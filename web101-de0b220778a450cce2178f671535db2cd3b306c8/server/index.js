const express = require('express')
const bodyparser = require('body-parser')
const mysql = require('mysql2/promise')
const cors = require('cors')
const app = express()

app.use(bodyparser.json())
app.use(cors())

const port = 8000

let conn = null

const initMySQL = async () => {
  conn = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'webdb',
    port: 8831
  })
}

const validateData = (userData) => {
  let errors = []
  if (!userData.Renterpurchasedetails) {
    errors.push('รายละเอียดผู้เช่า/ซื้อ')
  }
  if (!userData.Rentalpurchaseconditions) {
    errors.push('เงื่อนไขการเช่า/ซื้อ')
  }
  if (!userData.Location) {
    errors.push('ที่ตั้ง')
  }
  if (!userData.scale) {
    errors.push('ขนาด')
  }
  if (!userData.Usagestatus) {
    errors.push('สถานะการใช้งาน')
  }
  if (!userData.Maintenance) {
    errors.push('การบำรุงรักษา')
  }
  if (!userData.Monthlyexpenses) {
    errors.push('ค่าใช้จ่ายประจำเดือน')
  }
  return errors
}


// path = GET /users สำหรับ get users ทั้งหมดที่บันทึกเข้าไปออกมา
app.get('/Custommer', async (req, res) => {
  const results = await conn.query('SELECT * FROM Custommer')
  res.json(results[0])
})

// path = POST /users สำหรับการสร้าง users ใหม่บันทึกเข้าไป
app.post('/Custommer', async (req, res) => {
  try {
      let user = req.body

      const errors = validateData(user)
      if (errors.length > 0) {
        throw { 
          message: 'กรอกข้อมูลไม่ครบ',
          errors: errors }
      }
      const results = await conn.query('INSERT INTO Custommer SET ?', user)
      res.json({
        message: 'insert ok',
        data: results[0]
      })
  } catch (error) {
      const errorMessage = error.message || 'something wrong'
      const errors = error.errors || []
      console.error('error message', error.message)
      res.status(500).json({
        message: errorMessage,
        errors: errors
      })
  }
})

// GET /users/:id สำหรับการดึง users รายคนออกมา
app.get('/Custommer/:id', async (req, res) => {
  try {
    let id = req.params.id
    const results = await conn.query('SELECT * FROM Custommer WHERE id = ?', id)

    if (results[0].length == 0) {
      throw { statusCode: 404, message: 'หาไม่เจอ' }
    }

    res.json(results[0][0])
  } catch (error) {
    console.error('error message', error.message)
    let statusCode = error.statusCode || 500
    res.status(statusCode).json({
      message: 'something wrong',
      errorMessage: error.message
    })
  }
})

// path = PUT /users/:id สำหรับการแก้ไข users รายคน (ตาม id ที่บันทึกเข้าไป)
app.put('/Custommer/:id', async (req, res) => {
  try {
    let id = req.params.id
    let updateUser = req.body
    const results = await conn.query(
      'UPDATE Custommer SET ? WHERE id = ?',
      [updateUser, id]
    )
    res.json({
      message: 'update ok',
      data: results[0]
    })
  } catch (error) {
    console.error('error message', error.message)
    res.status(500).json({
      message: 'something wrong'
    })
  }
})


// path DELETE /users/:id สำหรับการลบ users รายคน (ตาม id ที่บันทึกเข้าไป)
app.delete('/Custommer/:id', async (req, res) => {
  try {
    let id = req.params.id
    const results = await conn.query('DELETE from Custommer WHERE id = ?', parseInt(id))
    res.json({
      message: 'delete ok',
      data: results[0]
    })
  } catch (error) {
    console.error('error message', error.message)
    res.status(500).json({
      message: 'something wrong'
    })
  }
})

app.listen(port, async (req, res) => {
  await initMySQL()
  console.log('http server run at ' + port)
})