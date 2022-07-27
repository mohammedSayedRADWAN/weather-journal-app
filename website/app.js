/* Global Variables */
const API_KEY="1d71c234cfee88aab28eda432a6636b3";
const Base_URL="https://api.openweathermap.org/data/2.5/weather?zip=";
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+1+'.'+ d.getDate()+'.'+ d.getFullYear();
// generate data
const generateButton=document.getElementById('generate');
generateButton.addEventListener("click",()=>{
const zipCodeValue=document.getElementById("zip").value;
var isValidZip = /(^\d{5}$)|(^\d{5}-\d{4}$)/.test(zipCodeValue);
const feelings=document.getElementById("feelings").value;
if(isValidZip){
    getWheather(Base_URL,zipCodeValue,API_KEY)
    .then((data)=>sendDataToserver({temp: data.main.temp, date: newDate, feelings})
    )
    .then(()=>updateUI());
}
else
{alert("ZIP CODE IS NOT VALID!!!!!!!");}
});
// get data from server
async function getWheather(Base_URL,ZIB_CODE,API_KEY){
const fetchingTemp=await fetch(
    `${Base_URL}${ZIB_CODE}&appid=${API_KEY}&units=metric`
    );
    try {
         const result=await fetchingTemp.json();
         return result;
    } catch (error) {
        console.log(error);
        throw error;
    }
}
// send data to server
async function sendDataToserver(data={}){
    const sendingData=await fetch("/postData",{
        method:"POST",
        credentials: "same-origin",
        headers: {
            'Content-Type':'application/json'
        },
        body:JSON.stringify(data)
    });
        try {
             const result=await sendingData.json();
             return result;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
    async function updateUI(){
        const fetchingDate=await fetch("/getData");
            try {
                 const result=await fetchingDate.json();
                 document.getElementById("temp").innerHTML=result.temp;
                 document.getElementById("date").innerHTML=result.date;
                 document.getElementById("content").innerHTML=result.feelings;

            } catch (error) {
                console.log(error);
                throw error;
            }
        }