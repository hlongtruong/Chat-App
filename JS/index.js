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
    firebase.auth().onAuthStateChanged((user) => {
      if(user) {
        if (user.emailVerified) {
          model.currentUser = {
            displayName: user.displayName,
            email: user.email
          }
          view.setActiveScreen('chatScreen')
        } else {
          view.setActiveScreen('loginScreen')
          alert('Please verify your email')
        }
      } else {
        view.setActiveScreen('loginScreen')
      }
    })
}
window.onload = init

firestoreFuntion = async () => {
  // get one document
  const documentId = '5aci9hYArabk704U5RQ9'
  const response = await firebase.firestore()
  .collection('users').doc(documentId).get()
  // const user = getDataFromDoc(response)
  // console.log(response)
  // console.log(user)

  // get many document
  const response2 = await firebase.firestore()
  .collection('users').where('phoneNumber','array-contains','091').get()
  // console.log(response2)
  // const listUser = getDataFromDocs(response2.docs)
  // console.log(listUser)
  // add document
  const userToAdd = {
    name: 'ABC',
    age: 23,
    email: 'abcxyz@gmail.com'
  }
  // firebase.firestore().collection('users').add(userToAdd)
  // update document
  documentIdUpdate = 'ksufblqrHMhjE6rtV7P7'
  const dataToUpdate = {
    address: 'Ha noi 2',
    age: 20,
    phoneNumber: firebase.firestore.FieldValue.arrayUnion('091')
  }
    // firebase.firestore()
    // .collection('users').doc(documentIdUpdate)
    // .update(dataToUpdate)
  // delete document
  const docToDelete = 'D2XWhMD5O17iXvQVLLjA'
  firebase.firestore()
  .collection('users').doc(docToDelete).delete()
}

getDataFromDoc = (doc) => {
  const data = doc.data()
  data.id = doc.id
  return data
}
getDataFromDocs = (docs) => {
  return docs.map(item => getDataFromDoc(item))
  // for(let index = 0; index < docs.length; index++) {
  //   const element = getDataFromDoc(docs[index])
  //   listData.push(element)
  // }
  // return listData
}
