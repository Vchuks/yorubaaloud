// REGISTER PAGE
const baseUrl = "https://cyrilyoruba.juadebgabriel.com/yorubalearning/api/";

// Register user
const spin = document.getElementById("spinImg");

function regUser(event){
    

    event.preventDefault() //stops page from refreshing when we create details

    const spinIcon = document.getElementById("spinImg");
    spinIcon.style.display = "inline-block";
   
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
    formDatBody.append("password_confirmation", inpConfirmPass)

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
                       location.href = "Login.html";
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



// LOGIN PAGE






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