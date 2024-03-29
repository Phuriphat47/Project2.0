const BASE_URL = 'http://localhost:8000';
window.onload = async () => {
  await loadData();
}
const loadData = async () => {

    console.log('loaded')
    
    
      //1. load user ทั้งหมดออกมาจาก API
      const response = await axios.get(`${BASE_URL}/Custommer`);
      console.log(response.data);
   //2. นำข้อมูล user ที่โหลดมาใส่เข้าไปใน html
    const usersDOM = document.getElementById('user');
  


   let htmlData ='<div>'
    for(let i = 0; i < response.data.length; i++){
        let data = response.data[i];
        htmlData += `<div>
        ${data.id} ${data.Renterpurchasedetails} ${data.Rentalpurchaseconditions}
        <a href='index.html?id=${data.id}'><button class="edit">Edit</button></a> 
        <button class ='delete' data-id='${data.id}'>Delete</button>
        </div>`;
    }
   htmlData += '</div>';
   usersDOM.innerHTML = htmlData;
   const deleteDOMs = document.getElementsByClassName('delete');
   for(let i = 0; i < deleteDOMs.length; i++){
       deleteDOMs[i].addEventListener('click', async (event)=>{
          const id = event.target.dataset.id;
          try {
            await axios.delete(`${BASE_URL}/Custommer/${id}`);
            loadData() 
          }catch(error){
              console.log('error: ', error);
          }
       });
   }
}