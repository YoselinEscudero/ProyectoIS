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
const productos = collection(database, "productos")

// Define the routes using the corresponding HTTP methods
// GET
const getProducts = async () => {
    const array = await getDocs(productos)
    try {
        let returnData = []
        array.forEach(product => {
            const productData = product.data()
            const productId = product.id
            const productWithId = { ...productData, id: productId }
            returnData.push(productWithId)
        })
        return returnData
    } catch (err) {
        console.error("Error! Couldn't get the elements from the database:", err)
    }
}

// POST
const saveProduct = async (sendData) => {
    try{
        await addDoc(productos, sendData)
        console.log("Product saved successfully:", sendData.product_name)
    } catch(err){
        console.error("Error! Couldn't save the product:", err)
    }
}

// DELETE
const deleteProduct = async (prod) => {
    try {
        await deleteDoc(doc(productos, prod.id));
        console.log("Product deleted: ", prod.product_name);
    } catch (error) {
        console.error("Error! Couldn't delete the product: ", error);
    }
  }

export { getProducts, saveProduct, deleteProduct }