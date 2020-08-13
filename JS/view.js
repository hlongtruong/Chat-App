const view = {}
view.setActiveScreen = (screenName, fromCreateConversation = false) => {
    switch (screenName) {
        case "welcomeScreen":
            document.getElementById("app").innerHTML = component.welcomeScreen
            break;
        case "registerScreen":
            document.getElementById("app").innerHTML = component.registerScreen
            document.getElementById("redirect-to-login").addEventListener("click", () => {
                view.setActiveScreen("loginScreen")
            })
            const registerform = document.getElementById("register-form")
            registerform.addEventListener("submit", (event) => {
                event.preventDefault()
                const data = {
                    firstName: registerform.firstName.value,
                    lastName: registerform.lastName.value,
                    email: registerform.email.value,
                    password: registerform.password.value,
                    confirmPassword: registerform.confirmPassword.value
                }
                controller.register(data)
            })
            break;
        case "loginScreen":
            document.getElementById("app").innerHTML = component.loginScreen
            document.getElementById("redirect-to-register").addEventListener("click", () => {
                view.setActiveScreen("registerScreen")
            })
            const loginForm = document.getElementById("login-form")
            loginForm.addEventListener("submit", (event) => {
                event.preventDefault()
                loginForm.email.value = loginForm.email.value.trim()
                const data = {
                    email: loginForm.email.value,
                    password: loginForm.password.value
                }
                controller.login(data)
            })
            break;
        case 'chatScreen':
            document.getElementById('app').innerHTML = component.chatScreen
            const sendMessageForm = document.getElementById('send-message-form')
            sendMessageForm.addEventListener('submit', (event) => {
                event.preventDefault()
                if (sendMessageForm.message.value.trim() !== '') {
                    const message = {
                        content: sendMessageForm.message.value,
                        owner: model.currentUser.email,
                        createdAt: (new Date()).toISOString()
                    }
                    model.addMessage(message)
                    sendMessageForm.message.value = ''
                }
            })
            if(!fromCreateConversation){
                model.loadConversations()
                model.listenConversationsChange()
            }
            else{
                view.showConversations()
                view.showCurrentConversation()
            }
            document.querySelector(".create-conversation .btn").addEventListener("click", () => {
                view.setActiveScreen("createConversation")
            })
            break;    
            case "createConversation":
                document.getElementById("app").innerHTML = component.createConversation
                document.querySelector("#back-to-chat").addEventListener("click", () => {
                    view.setActiveScreen("chatScreen", true)
                })
                const createConversationForm = document.getElementById('create-conversation-form')
                createConversationForm.addEventListener("submit", (event) => {
                    event.preventDefault()
                    const dataCreate ={
                        conversationTitle : createConversationForm.conversationTitle.value,
                        conversationEmail : createConversationForm.conversationEmail.value
                    }
                    controller.createConversation(dataCreate)
                })    
                break;    
    }
}
view.addMessage = (message) => {
    const messageWrapper = document.createElement('div')
    messageWrapper.classList.add('message-container')
    if(message.owner === model.currentUser.email) {
      messageWrapper.classList.add('mine')
      messageWrapper.innerHTML = `
        <div class="content">
          ${message.content}
        </div>
      `
    } else {
      messageWrapper.classList.add('their')
      messageWrapper.innerHTML = `
      <div class="owner">
        ${message.owner}
      </div>
      <div class="content">
        ${message.content}
      </div>
      `
    }
    document.querySelector('.list-messages').appendChild(messageWrapper)
}
view.showCurrentConversation = () => {
    document.querySelector(".list-messages").innerHTML = ""
    document.getElementsByClassName("conversation-header")[0]
    .innerText = model.currentConversation.title
    for(message of model.currentConversation.messages) {
        view.addMessage(message)
    }
    view.scrollToEndElement()
}
view.scrollToEndElement = () => {
    const element = document.querySelector(".list-messages")
    element.scrollTop = element.scrollHeight
}
view.showConversations = () => {
    for(oneConversation of model.conversations) {
        view.addConversation(oneConversation)
    }
}
view.addConversation = (conversation) => {
    const conversationWrapper = document.createElement('div')
    conversationWrapper.className = "conversation cursor-pointer"
    if(model.currentConversation.id === conversation.id) {
        conversationWrapper.classList.add("current")
    }
    conversationWrapper.innerHTML = `
    <div class="conversation-title">${conversation.title}</div>
    <div class="conversation-num-user">${conversation.users.length} users</div>
    `
    conversationWrapper.addEventListener("click", () => {
        document.querySelector(".current").classList.remove("current")
        conversationWrapper.classList.add("current")
        model.currentConversation = conversation
        view.showCurrentConversation()
    })
    document.querySelector(".list-conversations").appendChild(conversationWrapper)
}