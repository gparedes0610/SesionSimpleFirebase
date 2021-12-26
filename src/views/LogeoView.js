import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import firebaseApp from "../firebase/credenciales";

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";

const auth = getAuth(firebaseApp);

function LogeoView({ setUsuario }) {
  const firestore = getFirestore(firebaseApp); // para usar firestore

  const [isRegister, setisRegister] = useState(false);

  const [userLogeado, setuserLogeado] = useState({
    email: "",
    password: "",
  });
  const { email, password } = userLogeado;
  const actualizarInput = (e) => {
    setuserLogeado({ ...userLogeado, [e.target.name]: e.target.value });
  };

  const registrarUsuario = async (email, password) => {
    const infoUsuario = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    ).then((usuarioFirebase) => {
      setUsuario(usuarioFirebase);
      console.log(usuarioFirebase);
      return usuarioFirebase;
    });

    const docuRef = doc(firestore, `usuarios/${infoUsuario.user.uid}`);
    setDoc(docuRef, { email: email, password: password }); //para enviarlo al firestore
  };

  const submitHandler = (e) => {
    e.preventDefault();
    //console.log("funciona");
    //console.log(userLogeado);
    if (isRegister) {
      registrarUsuario(email, password);
    } else {
      console.log("valor", isRegister);
      signInWithEmailAndPassword(auth, email, password).then(
        (usuarioFirebase) => {
          console.log("sesion iniciada con ", usuarioFirebase.user);
          setUsuario(usuarioFirebase);
        }
      );
    }
  };

  return (
    <div className="container">
      <h2>{isRegister ? "Registrate" : "Inicia Sesion"}</h2>
      <Form onSubmit={submitHandler}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            name="email"
            onChange={(e) => actualizarInput(e)}
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            name="password"
            onChange={(e) => actualizarInput(e)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Check me out" />
        </Form.Group>
        <Button variant="primary" type="submit">
          {isRegister ? "Registrate" : "Ingresa"}
        </Button>
        <br />
        <br />
        <Button variant="success" onClick={() => setisRegister(!isRegister)}>
          {isRegister ? "Inicia Sesion!" : "No tienes cuenta ? registrate"}
        </Button>
      </Form>
    </div>
  );
}

export default LogeoView;
