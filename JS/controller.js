const controller = {}
controller.register = (dataRegister) => {
    if(dataRegister.firstName.trim() === ""){
        document.getElementById("first-name-error").innerText = "Please input first name"
    }
    else{
        document.getElementById("first-name-error").innerText = ""
    }
    if(dataRegister.lastName.trim() === ""){
        document.getElementById("last-name-error").innerText = "Please input last name"
    }
    else{
        document.getElementById("last-name-error").innerText = ""
    }
    if(dataRegister.email.trim() === ""){
        document.getElementById("email-error").innerText = "Please input email"
    }
    else{
        document.getElementById("email-error").innerText = ""
    }
    if(dataRegister.password.trim() === ""){
        document.getElementById("password-error").innerText = "Please input password"
    }
    else{
        document.getElementById("password-error").innerText = ""
    }
    if(dataRegister.confirmPassword.trim() === ""){
        document.getElementById("confirm-password-error").innerText = "Please confirm password"
    }
    else if(dataRegister.password !== dataRegister.confirmPassword) {
        document.getElementById("confirm-password-error").innerText = "Password didn't match"
    }
    else{
        document.getElementById("confirm-password-error").innerText = ""
    }
    if(dataRegister.firstName !== "" &&
    dataRegister.lastName !== "" &&
    dataRegister.email !== "" &&
    dataRegister.password !== "" &&
    dataRegister.confirmPassword !== "" &&
    dataRegister.password === dataRegister.confirmPassword
    ){
        model.register(dataRegister)
    }
}

controller.login = (dataLogin) => {
    if(dataLogin.email.trim() === ""){
        document.getElementById("email-error").innerText = "Please input email"
    }
    else{
        document.getElementById("email-error").innerText = ""
    }
    if(dataLogin.password.trim() === ""){
        document.getElementById("password-error").innerText = "Please input password"
    }
    else{
        document.getElementById("password-error").innerText = ""
    }
    if(dataLogin.email !== "" &&
    dataLogin.password !== ""){
        model.login(dataLogin)
    }
}

controller.createConversation = (dataCreate) => {
    if(dataCreate.conversationTitle.trim() === ""){
        document.getElementById("conversation-name-error").innerText = "Please input your conversation name"
    }
    else{
        document.getElementById("conversation-name-error").innerText = ""
    }
    if(dataCreate.conversationEmail.trim() === ""){
        document.getElementById("conversation-email-error").innerText = "Please input your friend email"
    }
    else{
        document.getElementById("conversation-email-error").innerText = ""
    }
    if (dataCreate.conversationTitle !== '' && dataCreate.conversationEmail !== '') {
        model.createConversation(dataCreate)
    }
}
