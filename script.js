const form = document.getElementById("loginForm");

form.addEventListener("submit", login);

async function login(e){

e.preventDefault();

const username=document.getElementById("username").value.trim();

const password=document.getElementById("password").value.trim();

const error=document.getElementById("error");

try{

const response=await fetch("users.json");

const users=await response.json();

const validUser=users.find(user=>{

return user.username===username &&
user.password===password;

});

if(validUser){

localStorage.setItem("loggedIn","true");

window.location.href="dashboard.html";

}
else{

error.innerHTML="❌ Invalid Username or Password";

}

}
catch(err){

error.innerHTML="Unable to load users.json";

}

}