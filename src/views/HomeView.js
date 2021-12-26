import React from "react";
import firebaseApp from "../firebase/credenciales";
import { Button } from "react-bootstrap";
import { getAuth, signOut } from "firebase/auth";

const auth = getAuth(firebaseApp);

function HomeView() {
  return (
    <div>
      <h2>Hola soy Home,Bienvenido</h2>
      <Button variant="primary" onClick={() => signOut(auth)}>
        Cerrar Sesion
      </Button>
    </div>
  );
}

export default HomeView;
