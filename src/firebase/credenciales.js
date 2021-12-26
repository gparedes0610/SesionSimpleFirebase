// Importamos la función para inicializar la aplicación de Firebase
import { initializeApp } from "firebase/app";

// Añade aquí tus credenciales
const firebaseConfig = {
  apiKey: "AIzaSyB1wCHyc3GsvOKNaG8aZIfXsVCp5l_u80o",
  authDomain: "aprendiendoauth.firebaseapp.com",
  projectId: "aprendiendoauth",
  storageBucket: "aprendiendoauth.appspot.com",
  messagingSenderId: "288003544782",
  appId: "1:288003544782:web:352c555f1530d76fb7e29f",
};

// Inicializamos la aplicación y la guardamos en firebaseApp
const firebaseApp = initializeApp(firebaseConfig);
// Exportamos firebaseApp para poder utilizarla en cualquier lugar de la aplicación
export default firebaseApp;
