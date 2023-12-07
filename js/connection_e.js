// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.20.0/firebase-app.js"
// import { getFirestore, collection, getDocs, addDoc, doc, deleteDoc } from 'firebase/firestore';
import { getFirestore, collection, getDocs, addDoc, doc, deleteDoc } from "https://www.gstatic.com/firebasejs/9.20.0/firebase-firestore.js"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC-gCK1I47pf6RsZwVTeBZhPUwG7ImaPbM",
  authDomain: "yojada-is.firebaseapp.com",
  projectId: "yojada-is",
  storageBucket: "yojada-is.appspot.com",
  messagingSenderId: "1021229416164",
  appId: "1:1021229416164:web:5eddc0a13be778710cb6f1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
console.log("Firebase app initialized:", app);

const database = getFirestore()
const eventos = collection(database, "eventos") // Cambié "productos" a "eventos" para que coincida con el nombre que usas en tu archivo principal

const getEvents = async () => {
    const array = await getDocs(eventos) // Cambié "productos" a "eventos"
    try {
        let returnData = []
        array.forEach(event => {
            const eventData = event.data()
            const eventId = event.id
            const eventWithId = { ...eventData, id: eventId }
            returnData.push(eventWithId)
        })
        return returnData
    } catch (err) {
        console.error("Error! Couldn't get the elements from the database:", err)
    }
}

// POST
const saveEvent = async (sendData) => {
    try{
        await addDoc(eventos, sendData)
        console.log("Event saved successfully:", sendData.event_name)
    } catch(err){
        console.error("Error! Couldn't save the event:", err)
    }
}

// DELETE
const deleteEvent = async (eve) => {
    try {
        console.log(eve);
        const eventRef = doc(eventos, eve.id); // Assuming eve is the ID
        await deleteDoc(eventRef);
        console.log("Event deleted: ", eve);
    } catch (error) {
        //console.error("Error! Couldn't delete the event: ", error);
    }
};

export { getEvents, saveEvent, deleteEvent }