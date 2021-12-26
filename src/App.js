import React, { useState, Suspense, lazy } from "react";

import bootstrap from "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import firebaseApp from "./firebase/credenciales";
import HomeView from "./views/HomeView";
import LogeoView from "./views/LogeoView";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const auth = getAuth(firebaseApp);
//const LogeoView = lazy(() => import("./views/LogeoView"));
//const HomeView = lazy(() => import("./views/HomeView"));
function App() {
  const [usuario, setUsuario] = useState(null);

  onAuthStateChanged(auth, (usuarioFireBase) => {
    if (usuarioFireBase) {
      setUsuario(usuarioFireBase);
    } else {
      setUsuario(null);
    }
  });

  return <>{usuario ? <HomeView /> : <LogeoView setUsuario={setUsuario} />}</>;
}

export default App;
