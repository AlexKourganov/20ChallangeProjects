const form = document.getElementById("form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const password2 = document.getElementById("password2");

// Show Input error
function showError(input, message) {
   
  const formControl = input.parentElement;
  
  formControl.className = "form-control error";
  const small = formControl.querySelector('small');
  small.innerText = message;
}
function showSuccess(input) {
   
  const formControl = input.parentElement;
  
  formControl.className = "form-control success";
}

function checkEmail(input){
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    // return re.test(String(email).toLowerCase());
    if(re.test(String(input.value.trim()).toLowerCase())){
        showSuccess(input);
    }else{
        showError(input,'Email is not Valid');
    }
}
// Check Required Fields
function checkRequired(inputArr){
    inputArr.forEach(function(input){
        if(input.value.trim() === ''){
            showError(input, `${getFieldName(input)} is Required!`);
        }else{
            showSuccess(input);
        }
    });
}
function checkLength(input,min,max){
    if(input.value.length < min){
        showError(input, `${getFieldName(input)} must be at least ${min} characters`)
    }else if(input.value.length > max){
        showError(input, `${getFieldName(input)} must be less then ${max} characters`)
    }else{
        showSuccess(input);
    }
}

function checkPasswordsMatch(input1,input2){
    if(input1.value !== input2.value){
        showError(input2, 'Passwords Do Not Match!');
    }
}

function getFieldName(input){
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}


form.addEventListener("submit", function (e) {
  e.preventDefault();
  
//   if (username.value === "") {
//     showError(username, "Username is required!");
//   } else {
//     showSuccess(username);
//   }
//   if(email.value === ''){
//     showError(email, "Email is required!");
//   }else if(!isValidEmail(email.value)){
//     showError(email, "Email is invalid!");
//   }
//   else{
//     showSuccess(email);
//   }
//   if(password.value === ''){
//     showError(password, "Email is required!");
//   }else{
//     showSuccess(password);
//   }
//   if(password2.value === ''){
//     showError(password2, "Email is required!");
//   }else{
//     showSuccess(password2);
//   }
checkRequired([username,email,password,password2]);

checkLength(username,3,15);
checkLength(password,6,25);
checkEmail(email);
checkPasswordsMatch(password,password2);

});
