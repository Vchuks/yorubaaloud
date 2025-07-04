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
                   if(result2.status === "success"){
    
                       Swal.fire({
                       title: 'Success',
                       text: `${result2.message}`,
                       icon: 'success',
                       confirmButtonText: `You're good to go`
                       })
               
                       setTimeout(() => {
                       location.href = "dashboard.html";
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