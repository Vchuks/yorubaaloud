// REGISTER PAGE
const baseUrl = "https://cyrilyoruba.juadebgabriel.com/yorubalearning/api/";

// Register user function

const spin = document.getElementById("spinImg"); // SPIN ICON

function regUser(event){


    event.preventDefault() //stops page from refreshing when we create details

    spin.style.display = "inline-block";
   
    const inpName = document.getElementById("name").value;
    const inpEmail = document.getElementById("email").value;
    const inpPass = document.getElementById("password").value;
    const inpConfirmPass = document.getElementById("confirmPass").value;

    // ALL FIELDS ARE REQUIRED
    if(
        inpName === "" || inpEmail === "" ||
        inpPass === "" || inpConfirmPass === ""){

        Swal.fire({
        title: 'Error',
        text: 'Fill in your complete details',
        icon: 'error',
        confirmButtonText: 'Try again'
        })

        spin.style.display = "none";
        }

     // PASSWORD CHARACTERS SHOULD BE ABOVE SIX
    else if(inpPass.length < 6){

        Swal.fire({
        title: 'Error',
        text: 'Password requires six characters or more',
        icon: 'info',
        confirmButtonText: 'Try again'
        })

        spin.style.display = "none";
    }
    // PASSWORD MUST MATCH
    else if(inpPass !== inpConfirmPass){

        Swal.fire({
        title: 'Error',
        text: `Password doesn't match`,
        icon: 'info',
        confirmButtonText: 'Try again'
        })

        spin.style.display = "none";
    }

    else{
    const formDatBody = new FormData();
    formDatBody.append("name", inpName);
    formDatBody.append("email", inpEmail);
    formDatBody.append("password", inpPass);
    formDatBody.append("password_confirmation", inpConfirmPass);

    const apiObjDetails = {
    method: "POST",
    body: formDatBody
    
}

    fetch(`${baseUrl}register_admin`, apiObjDetails)
    .then((response)=> response.json())
    .then((result)=>  { 
                       if(result.status === "success"){
    
                       Swal.fire({
                       title: 'Success',
                       text: `${result.message}`,
                       icon: 'success',
                       confirmButtonText: `You're good to go`
                       })
               
                       setTimeout(() => {
                       location.href = "login.html";
                       }, 3000);
                   }
                   else{
                        Swal.fire({
                        title: 'Error',
                        text: `Not successful`,
                        icon: 'warning',
                        confirmButtonText: 'Try again'
                        })

                        spin.style.display = "none";
                   }
    }) 

    .catch((error)=> console.error(error))
    }
}


//                 !END OF REGISTER SECTION


// LOGIN PAGE

// Login user function

function loginUser(event){

    event.preventDefault() //stops page from refreshing when we create details

    spin.style.display = "inline-block";

    const inpEmail2 = document.getElementById("email").value;
    const inpPass2 = document.getElementById("password").value;

    // ALL FIELDS ARE REQUIRED
    if(
        inpEmail2 === "" || inpPass2 === ""){

        Swal.fire({
        title: 'Error',
        text: 'Fill in your complete details',
        icon: 'error',
        confirmButtonText: 'Try again'
        })

        spin.style.display = "none";
        }

    // PASSWORD CHARACTERS SHOULD BE ABOVE SIX
    else if(inpPass2.length < 6){

        Swal.fire({
        title: 'Error',
        text: 'Password requires six characters or more',
        icon: 'info',
        confirmButtonText: 'Try again'
        })

        spin.style.display = "none";
    }

    else{
    const formDatBody2 = new FormData();
    formDatBody2.append("email", inpEmail2);
    formDatBody2.append("password", inpPass2);

    const apiObjDetails2 = {
    method: "POST",
    body: formDatBody2
    
}

    fetch(`${baseUrl}admin_login`, apiObjDetails2)
    .then((response)=> response.json())
    .then((result2) => {

                                                  /* since we can't get the token directly from the response, we 
                                                     should get it from our storage by first setting it there*/
                                                     
                localStorage.setItem("theResult", JSON.stringify(result2));
                let getTheResult = localStorage.getItem("theResult");
                let convertTheResult = JSON.parse(getTheResult);
         
                   if(convertTheResult.hasOwnProperty("token")){
    
                       Swal.fire({
                       title: 'Success',
                       text: `Welcome to your dashboard`,
                       icon: 'success',
                       confirmButtonText: `You're good to go`
                       })
               
                       setTimeout(() => {
                       window.location.href = "dashboard.html";
                       }, 3000);
                   }
                   else{
                        Swal.fire({
                        title: 'Error',
                        text: `Not successful`,
                        icon: 'warning',
                        confirmButtonText: 'Try again'
                        })

                        spin.style.display = "none";
                   }
    
    })


    .catch((error)=> console.error(error))


}

}



//                 !END OF LOGIN SECTION


// DASHBOARD PAGE

                        //  NAVBAR SLIDE at 900px below

const slideBar = document.getElementById("dashLeftS");
const menuBtn = document.getElementById("menu2");
const menuBtn2 = document.getElementById("menu22");


menuBtn.addEventListener("click", menuSlideIn);

function menuSlideIn(){
    slideBar.classList.add("slide");
}

menuBtn2.addEventListener("click", menuSlideOut);

function menuSlideOut(){
    slideBar.classList.remove("slide");

}



                      // BOXES

const boxItems = [
    {  id: 1,
       image: "./assets/Icons/grid-circle-diagonal-left.png",
       title: "Total Categories",
       totalNum: 0
    },
    {  id: 2,
       image: "./assets/Icons/tv.png",
       title: "Learning Materials",
       totalNum: 0
    },
    {  id: 3,
       image: "./assets/Icons/grid-alt-solid-24.png",
       title: "Total Subcategories",
       totalNum: 0
    },
    {  id: 4,
       image: "./assets/Icons/question-mark-regular-24.png",
       title: "Total Quiz",
       totalNum: 0
    },
    {  id: 5,
       image: "./assets/Icons/user.png",
       title: "Total Students",
       totalNum: 0
    },
    {  id: 6,
       title: "Top three students"
    }
]

           // function and loop to loop through the array holding details for each box

function boxFunction(){
    const mainBox = document.getElementsByClassName("mainBox")[0];
    boxItems.forEach((items)=>{
      
        if (items.hasOwnProperty("image")){
        mainBox.innerHTML +=  
                               `<div class="boxes shadow-[1px_10px_30px_-20px_black] rounded-md">
                             <img src=${items.image} alt="Icon for categories" class="dashIcons nv22Pic object-contain">
                             <h6  class="navText nv2 text-base text-black font-normal">${items.title}</h6>
                             <h6 id=${`${items.id}`} class="boxNum text-base text-black font-normal">${items.totalNum}</h6>
                                </div>`
        }else{
            mainBox.innerHTML += 
                        `<div class="boxes shadow-[1px_10px_30px_-20px_black] rounded-md">
                            <button type="button" onclick="modalPopIn()"  class="nv22Btn rounded-lg">
                                <h6  class="navText nv22 text-base text-white font-normal">${items.title}</h6>
                            </button>
                         </div>`                     
        }
})
}
boxFunction()


// FETCH DATA FOR DASHBOARD


                                     // get token function
                                     function getToken(key){
                                         const getData = localStorage.getItem(key);
                                         const pasrseData = JSON.parse(getData);
                                         theToken = pasrseData.token;
                                     
                                         return theToken
                                     }

       //function to fetch data for dashboard  
       
const navUserName = document.getElementsByClassName("navHtext")[0]; // nav header

async function getDashboardDetails(){

const getMyHeaders = new Headers();
getMyHeaders.append("Authorization", `Bearer ${getToken("theResult")}`);

const docDetails = {
    method: "GET",
    headers: getMyHeaders
}

const fetchData = await fetch(`${baseUrl}admin/admin_dashboardapi`, docDetails)
const result3 = await fetchData.json()
              
       const getId1 = document.getElementById("1");
       getId1.innerText = result3.total_number_of_categories;

       const getId2 = document.getElementById("2");
       getId2.innerText = result3.total_number_of_learningmaterial;

       const getId3 = document.getElementById("3");
       getId3.innerText = result3.total_number_of_subcategories;

       const getId4 = document.getElementById("4");
       getId4.innerText = result3.total_number_of_quize;

       const getId5 = document.getElementById("5");
       getId5.innerText = result3.total_number_of_students;

       navUserName.innerText = result3.admin_name

}
getDashboardDetails()


// logout from dashboard function

function logoutUser(){
   localStorage.clear();

   setTimeout(() => {
   window.location.href = "login.html";
   }, 1000);
}




                            // Table

const tableItems = [
    {  iD: 1,
       name: "Name",
       email: "Email",
       phoneNumber: 0,
       position: 0,
       totalScore: 0
    },
    {  iD: 2,
       name: "Name",
       email: "Email",
       phoneNumber: 0,
       position: 0,
       totalScore: 0
    },
    {  iD: 3,
       name: "Name",
       email: "Email",
       phoneNumber: 0,
       position: 0,
       totalScore: 0
    }
]

                                                     // Top three students TABLE loop 
                                                     
                                                     function tableFunc(){
                                                     
                                                           const mainTable = document.getElementsByClassName("dash3rdSec1")[0];
                                                           tableItems.forEach((items)=>{
                                                     
                                                             if(items.hasOwnProperty("name")){
                                                                 mainTable.innerHTML +=
                                                                                        `<tbody>
                                                                                         <tr>
                                                                                             <td id=tdName  class="tbTags tbTagName font-normal text-center text-sm text-black">${items.name}</td>
                                                                                             <td id="tdEmail"  class="tbTags tbTagEmail font-normal text-center text-sm text-black">${items.email}</td>
                                                                                             <td id="tdPh"  class="tbTags tbTagPn font-normal text-center text-sm text-black">${items.phoneNumber}</td>
                                                                                             <td id="tdPos"  class="tbTags tbTagPos font-normal text-center text-sm text-black">${items.position}</td>
                                                                                             <td id="tdTs"  class="tbTags tbTagTs font-normal text-center text-sm text-black">${items.totalScore}</td>
                                                                                         </tr>
                                                                                         </tbody>`
                                                             }
                                                           })
                                                     }
                                                     tableFunc()

// function for top 3 students TABLE

function top3Students(){

    const getMyHeaders2 = new Headers();
    getMyHeaders2.append("Authorization", `Bearer ${getToken("theResult")}`);

    const docDetails2 = {
        method: "GET",
        headers: getMyHeaders2
    }

    fetch(`${baseUrl}admin/top_three_students`, docDetails2)
    .then((response)=> response.json())
    .then((result)=> { 

        const tagName = document.getElementsByClassName("tbTagName");
        tagName[0].innerText = result[0].name;
        tagName[1].innerText = result[1].name;
        tagName[2].innerText = result[2].name;

        const tagEmail = document.getElementsByClassName("tbTagEmail");
        tagEmail[0].innerText = result[0].email;
        tagEmail[1].innerText = result[1].email;
        tagEmail[2].innerText = result[2].email;

        const tagPn = document.getElementsByClassName("tbTagPn");
        tagPn[0].innerText = result[0].phone_number;
        tagPn[1].innerText = result[1].phone_number;
        tagPn[2].innerText = result[2].phone_number;

        const tagPos = document.getElementsByClassName("tbTagPos");
        tagPos[0].innerText = result[0].position;
        tagPos[1].innerText = result[1].position;
        tagPos[2].innerText = result[2].position;

        const tagTs = document.getElementsByClassName("tbTagTs");
        tagTs[0].innerText = result[0].total_score;
        tagTs[1].innerText = result[1].total_score;
        tagTs[2].innerText = result[2].total_score;

})
    .catch((error)=> console.error(error))
}

top3Students() 

                                                 /* Top three students MODAL loop (tapping from the 
                                                     TABLE-ITEMS(tableItems) array of Object above )*/

                                                 function modalFunc(){

                                                    const modalContainer = document.getElementsByClassName("modalContainer")[0];
                                                    tableItems.forEach(({name, email, phoneNumber, position, totalScore})=>{

                                                        modalContainer.innerHTML += 
                                                                                    `<section class="modalContainer2">
                                                                                         <div class="modalInfoBox rounded-md shadow-[1px_10px_30px_-10px_black]">

                                                                                             <div class="infoTd flex justify-between">
                                                                                                <h6 class="infoT1 font-normal text-sm ">Name:</h6>
                                                                                                <h6 class="infoT2 infoName font-normal text-sm ">${`${name}`}</h6>
                                                                                             </div>
                                                                                             <div class="infoTd flex justify-between">
                                                                                                <h6 class="infoT1 font-normal text-sm">Email:</h6>
                                                                                                <h6 class="infoT2 infoEmail font-normal text-sm ">${`${email}`}</h6>
                                                                                             </div>
                                                                                             <div class=" infoTd flex justify-between">
                                                                                                <h6 class="infoT1 font-normal text-sm">Phone:</h6>
                                                                                                <h6 class="infoT2 infoPn font-normal text-sm ">${`${phoneNumber}`}</h6>
                                                                                             </div>
                                                                                             <div class=" infoTd flex justify-between">
                                                                                                <h6 class="infoT1 font-normal text-sm">Position:</h6>
                                                                                                <h6 class="infoT2 infoPos font-normal text-sm ">${`${position}`}</h6>
                                                                                             </div>
                                                                                             <div class=" infoTd flex justify-between">
                                                                                                <h6 class="infoT1 font-normal text-sm">Score:</h6>
                                                                                                <h6 class="infoT2 infoTs font-normal text-sm ">${`${totalScore}`}</h6>
                                                                                             </div> 

                                                                                         </div>
                                                                                    </section>`
                                                    })

                                                 }
                                                 modalFunc()

                                                 // Call the pop-up MODAL

                                                 function modalPopIn(){
                                                    const modalContainer = document.getElementsByClassName("modalContainer")[0];
                                                    modalContainer.style.display = "block"
                                                 }

                                                 // Remove the pop-up MODAL

                                                 function modalPopOut(){
                                                    const modalContainer = document.getElementsByClassName("modalContainer")[0];
                                                    modalContainer.style.display = "none"
                                                 }


                                                 // Function for top three students MODAL

                                                 function top3StudentsModal(){

                                                    const getMyHeaders3 = new Headers();
                                                    getMyHeaders3.append("Authorization", `Bearer ${getToken("theResult")}`);
                                                
                                                    const docDetails3 = {
                                                        method: "GET",
                                                        headers: getMyHeaders3
                                                    }
                                                
                                                    fetch(`${baseUrl}admin/top_three_students`, docDetails3)
                                                    .then((response)=> response.json())
                                                    .then((result)=> { 

                                                        const name = document.getElementsByClassName("infoName");
                                                        name[0].innerHTML = result[0].name
                                                        name[1].innerHTML = result[1].name
                                                        name[2].innerHTML = result[2].name

                                                        const email = document.getElementsByClassName("infoEmail");
                                                        email[0].innerHTML = result[0].email
                                                        email[1].innerHTML = result[1].email
                                                        email[2].innerHTML = result[2].email

                                                        const phone = document.getElementsByClassName("infoPn");
                                                        phone[0].innerHTML = result[0].phone_number
                                                        phone[1].innerHTML = result[1].phone_number
                                                        phone[2].innerHTML = result[2].phone_number

                                                        const position = document.getElementsByClassName("infoPos");
                                                        position[0].innerHTML = result[0].position
                                                        position[1].innerHTML = result[1].position
                                                        position[2].innerHTML = result[2].position

                                                        const totalS = document.getElementsByClassName("infoTs");
                                                        totalS[0].innerHTML = result[0].total_score
                                                        totalS[1].innerHTML = result[1].total_score
                                                        totalS[2].innerHTML = result[2].total_score
                                                
                                                        
                                                })
                                                    .catch((error)=> console.error(error))
                                                }
                                                
                                                top3StudentsModal() 