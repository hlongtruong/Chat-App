const init = () => {
      // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyDY9WxBi3VP1caI5kX-SjPqkqpLnM2GqCI",
    authDomain: "chat-app-f3c31.firebaseapp.com",
    databaseURL: "https://chat-app-f3c31.firebaseio.com",
    projectId: "chat-app-f3c31",
    storageBucket: "chat-app-f3c31.appspot.com",
    messagingSenderId: "310105960972",
    appId: "1:310105960972:web:e24a2fa975d07aa2403429",
    measurementId: "G-C8PWG305N1"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
//   firebase.analytics();
    console.log("Window loaded")
    view .setActiveScreen("registerScreen")
}
window.onload = init
function redirect_to_register() {
    document.getElementById("redirect-to-register").style.color = "red";
    view.setActiveScreen("registerScreen")
}
function redirect_to_login() {
    document.getElementById("redirect-to-login").style.color = "red";
    view.setActiveScreen("loginScreen")
}