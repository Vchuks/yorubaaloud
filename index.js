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

                        //  NAVBAR SLIDE

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
                            <div class="nv22D rounded-lg">
                                <h6  class="navText nv22 text-base text-white font-normal">${items.title}</h6>
                            </div>
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