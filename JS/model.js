const model = {}
model.currentUser = undefined
model.conversations = undefined
model.currentConversation = undefined
model.collectionName = "conversations"
model.register = async (dataRegister) => {
    try{
        await firebase.auth().createUserWithEmailAndPassword(dataRegister.email, dataRegister.password)
        firebase.auth().currentUser.updateProfile({
            displayName : dataRegister.firstName + " " + dataRegister.lastName
        })
        firebase.auth().currentUser.sendEmailVerification()
        alert("The email has been registered, please check you email!")
        view.setActiveScreen("loginScreen")
    } catch(err){
        console.log(err)
        alert(err,message)
    }
}
model.login = async (dataLogin) => {
    try {
        await firebase.auth()
        .signInWithEmailAndPassword(dataLogin.email, dataLogin.password)
      } catch(err) {
        console.log(err)
        alert(err.message)
      }
}

model.addMessage = (message) => {
    const dataToUpdate = {
        messages: firebase.firestore.FieldValue.arrayUnion(message)
    }
    firebase.firestore()
    .collection(model.collectionName)
    .doc(model.currentConversation.id)
    .update(dataToUpdate)
}

model.loadConversations = async () => {
    const response = await firebase.firestore().collection(model.collectionName)
    .where("users","array-contains",model.currentUser.email)
    .get()
    model.conversations = getDataFromDocs(response.docs)
    if(model.conversations.length > 0){
    model.currentConversation = model.conversations[0]
    view.showCurrentConversation()
    }
    view.showConversations()
}

model.listenConversationsChange = () => {
    let isFirstRun = true
    firebase.firestore()
    .collection(model.collectionName)
    .where("users", "array-contains", model.currentUser.email)
    .onSnapshot((res) => {
        console.log(res)
        if(isFirstRun) {
            isFirstRun = false
            return
        }
        const docChanges = res.docChanges()
        for(oneChange of docChanges){
            const type = oneChange.type
            if(type === "modified"){
                const docData = getDataFromDoc(oneChange.doc)
                for(let index = 0; index < model.conversations.length; index++) {
                    if(model.conversations[index].id === docData.id){
                        model.conversations[index] = docData
                    }
                }
                if(docData.id === model.currentConversation.id) {
                    model.currentConversation = docData
                    const lastMessage = docData.messages[docData.messages.length - 1]
                    view.addMessage(lastMessage)
                    view.scrollToEndElement()
                }
            }
            if(type === "added") {
                const docData = getDataFromDoc(oneChange.doc)
                model.conversations.push(docData)
                view.addConversation(docData)
            }
        }
    })
}

model.createConversation = (dataCreate) => {
    const conversationData = {
      createdAt: (new Date()).toISOString(),
      messages: [],
      title: dataCreate.conversationTitle,
      users: [model.currentUser.email, dataCreate.conversationEmail]
    }
    firebase.firestore().collection('conversations').add(conversationData)
    view.setActiveScreen("chatScreen", true)
}

model.addUser = (data) => {
    const userToAdd = { 
        users: firebase.firestore.FieldValue.arrayUnion(data)
    }
    firebase.firestore().collection('conversations').doc(model.currentConversation.id).update(userToAdd)
}
