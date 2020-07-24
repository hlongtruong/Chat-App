const view = {}
view.setActiveScreen = (screenName) => {
    switch (screenName){
        case "welcomeScreen":
            document.getElementById("app").innerHTML = components.welcomeScreen
        break;
        case "registerScreen":
            document.getElementById("app").innerHTML = components.registerScreen
            const registerform = document.getElementById("register-form")
            registerform.addEventListener("submit",(event) => {
                event.preventDefault()
                const data = {
                    firstName : registerform.firstName.value,
                    lastName : registerform.lastName.value,
                    email : registerform.email.value,
                    password : registerform.password.value,
                    confirmPassword : registerform.confirmPassword.value
                }
                console.log(data)
                controller.register(data)
            })
        break;
        case "loginScreen":
            document.getElementById("app").innerHTML = components.loginScreen
            // document.getElementById("redirect-to-register").addEventListener("click", () => {
            //     view.setActiveScreen("registerScreen")
            // })
            // const loginForm = document.getElementById("login-form")
            // loginForm.addEventListener("submit", (event) => {
            //     event.preventDefault()
            //     loginForm.email.value = loginForm.email.value.trim()
            //     const data = {
            //         email: loginForm.email.value,
            //         password: loginForm.password.value
            //     }
            //     controller.login(data)
            // })
            const loginForm = document.getElementById("login-form")
            loginForm.addEventListener("submit",(event)=>{
            event.preventDefault();
            loginForm.email.value = loginForm.email.value.trim()
            const data ={
                email: loginForm.email.value,
                password: loginForm.password.value,
            }
            console.log(data)
            controller.login(data)
            })
        break;
    }
}