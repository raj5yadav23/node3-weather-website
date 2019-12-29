const weatherForm= document.querySelector('form')
const search=document.querySelector('input')
const messageOne=document.querySelector('#message-1')
const messageTwo=document.querySelector('#message-2')


weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    const location=search.value
    messageOne.textContent='Loading...'
    messageTwo.textContent=''  
    fetch('/weather?address='+ location).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            messageOne.textContent='Unable to find the location. Try another search'
            messageTwo.textContent=''
        }else{
            messageOne.textContent=data[0].forecast
            messageTwo.textContent=data[0].location
        }
    })
})
})