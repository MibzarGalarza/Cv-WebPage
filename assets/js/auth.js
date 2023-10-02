import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js";

const contenidoVisible = document.getElementById("contenido-visible");
const contenidoOculto = document.getElementById("contenido-oculto");


let usuarioAutenticado = false;

function mostrarContenidoOculto() {
    contenidoVisible.style.display = "none"; // Oculta el contenido visible
    contenidoOculto.style.display = "block"; // Muestra el contenido oculto
  }

  function mostrarContenidoVisible() {
    contenidoVisible.style.display = "block"; // Muestra el contenido visible
    contenidoOculto.style.display = "none"; // Oculta el contenido oculto
  }



// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAtAw0mlXv4JCWI-rAoeX8NnkDxCigGXPk",
  authDomain: "database-952af.firebaseapp.com",
  projectId: "database-952af",
  storageBucket: "database-952af.appspot.com",
  messagingSenderId: "732490020359",
  appId: "1:732490020359:web:f65c10b937a98149331ca2",
  measurementId: "G-L34HCNKJXX"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const submitButton = document.getElementById("submit");
const signupButton = document.getElementById("sign-up");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const main = document.getElementById("main");
const createacct = document.getElementById("create-acct");

const signupEmailIn = document.getElementById("email-signup");
const confirmSignupEmailIn = document.getElementById("confirm-email-signup");
const signupPasswordIn = document.getElementById("password-signup");
const confirmSignUpPasswordIn = document.getElementById("confirm-password-signup");
const createacctbtn = document.getElementById("create-acct-btn");

const returnBtn = document.getElementById("return-btn");

var email, password, signupEmail, signupPassword, confirmSignupEmail, confirmSignUpPassword;

createacctbtn.addEventListener("click", function () {
  var isVerified = true;

  signupEmail = signupEmailIn.value;
  confirmSignupEmail = confirmSignupEmailIn.value;
  if (signupEmail != confirmSignupEmail) {
    window.alert("Email fields do not match. Try again.")
    isVerified = false;
  }

  signupPassword = signupPasswordIn.value;
  confirmSignUpPassword = confirmSignUpPasswordIn.value;
  if (signupPassword != confirmSignUpPassword) {
    window.alert("Password fields do not match. Try again.")
    isVerified = false;
  }

  if (signupEmail == "" || confirmSignupEmail == "" || signupPassword == "" || confirmSignUpPassword == "") {
    window.alert("Please fill out all required fields.");
    isVerified = false;
  }

  if (isVerified) {
    createUserWithEmailAndPassword(auth, signupEmail, signupPassword)
      .then((userCredential) => {
        // Usuario creado con éxito
        const user = userCredential.user;
        window.alert("Success! Account created.");

        // Redireccionar a la página de inicio de sesión
        window.location.href = "index.html";
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        window.alert("Error occurred. Try again.");
      });
  }
});

submitButton.addEventListener("click", function () {
  email = emailInput.value;
  password = passwordInput.value;

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Usuario autenticado con éxito
      const user = userCredential.user;


      

      window.alert("Success! Welcome back!");      // Redireccionar a la página principal o a la página deseada
      console.log(usuarioAutenticado)
      window.location.href = "index.html"; // Cambia a la página que desees
      usuarioAutenticado = true;
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      window.alert("Error occurred. Try again.");
    });
});



signupButton.addEventListener("click", function () {
  main.style.display = "none";
  createacct.style.display = "block";
});

returnBtn.addEventListener("click", function () {
  main.style.display = "block";
  createacct.style.display = "none";
});

window.addEventListener("load", function () {
    if ( usuarioAutenticado = true) {
      mostrarContenidoOculto();
    } else {
      mostrarContenidoVisible();
    }
  });
