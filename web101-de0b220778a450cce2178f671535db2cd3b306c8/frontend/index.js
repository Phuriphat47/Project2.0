const BASE_URL = 'http://localhost:8000'

let mode = 'CREATE'
let selectedId = '' //ตัวแปรแบบ Golbal ใช้ได้ทุกที่

window.onload = async () => {
  const urlParams = new URLSearchParams(window.location.search)
  const id = urlParams.get('id')
  console.log('id', id)
  if (id) {
    mode = 'EDIT'
    selectedId = id

    try {
      const response = await axios.get(`${BASE_URL}/Custommer/${id}`)
      const user = response.data

      let RenterpurchasedetailsDOM = document.querySelector('input[name=Renterpurchasedetails]')
      let RentalpurchaseconditionsDOM = document.querySelector('input[name=Rentalpurchaseconditions]')
      let LocationDOM = document.querySelector('input[name=Location]')
      let scaleDOM = document.querySelector('input[name=scale]')
      let MaintenanceDOM = document.querySelector('input[name=Maintenance]')
      let MonthlyexpensesDOM = document.querySelector('input[name=Monthlyexpenses]')

      RenterpurchasedetailsDOM.value = user.Renterpurchasedetails
      RentalpurchaseconditionsDOM.value = user.Rentalpurchaseconditions
      LocationDOM.value = user.Location
      scaleDOM.value = user.scale
      MaintenanceDOM.value = user.Maintenance
      MonthlyexpensesDOM.value = user.Monthlyexpenses

      let UsagestatusDOMs = document.querySelectorAll('input[name=Usagestatus]')

      for (let i = 0; i < UsagestatusDOMs.length; i++) {
        if (UsagestatusDOMs[i].value == user.Usagestatus) {
          UsagestatusDOMs[i].checked = true
        }
      }

    } catch (error) {
      console.log('error', error)
    }
  }
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

  const submitData = async () => {
    let RenterpurchasedetailsDOM = document.querySelector('input[name=Renterpurchasedetails]')
    let RentalpurchaseconditionsDOM = document.querySelector('input[name=Rentalpurchaseconditions]')
    let LocationDOM = document.querySelector('input[name= Location]')
    let scaleDOM = document.querySelector('input[name=scale]')
    let UsagestatusDOM = document.querySelector('input[name=Usagestatus]:checked') || {}
    let MaintenanceDOM = document.querySelector('input[name=Maintenance]')
    let MonthlyexpensesDOM = document.querySelector('input[name=Monthlyexpenses]')

    let messageDOM = document.getElementById('message')

    try {
     
      console.log('test')
      let userData = {
        Renterpurchasedetails: RenterpurchasedetailsDOM.value,
        Rentalpurchaseconditions: RentalpurchaseconditionsDOM.value,
        Location: LocationDOM.value,
        scale: scaleDOM.value,
        Usagestatus: UsagestatusDOM.value,
        Maintenance: MaintenanceDOM.value,
        Monthlyexpenses: MonthlyexpensesDOM.value,
      }
      console.log('submit data', userData)

      const errors = validateData(userData)

      if (errors.length > 0) {
        throw {
          message: 'กรอกข้อมูลไม่ครบ!',
          errors: errors
        }
      }

      let message = 'บันทึกข้อมูลสำเร็จ!'

      if(mode == 'CREATE'){
        const response = await axios.post(`${BASE_URL}/Custommer`, userData)
        console.log('response', response.data)
      } else {
        const response = await axios.put(`${BASE_URL}/Custommer/${selectedId}`, userData)
        message = 'แก้ไขข้อมูลสำเร็จ!'
        console.log('response', response.data)
      }
      messageDOM.innerText = message
      messageDOM.className = 'message success'

    } catch (error) {
      console.log('error message', error.message)
      console.log('error', error.errors)
      if (error.response) {
        console.log(error.response)
        error.message = error.response.data.message
        error.errors = error.response.data.errors
      }

      let htmlData = '<div>'
      htmlData += `<div>${error.message}</div>`
      htmlData += '<ul>'
      for (let i = 0; i < error.errors.length; i++) {
        htmlData += `<li>${error.errors[i]}</li>`
      }
      htmlData += '</ul>'
      htmlData += '</div>'


      messageDOM.innerHTML = htmlData
      messageDOM.className = 'message danger'
    }
  }
