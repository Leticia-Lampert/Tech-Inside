import React, { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from "formik"
import * as yup from "yup";
import "../css/authentication.css";
import eye from "../images/eye.svg";
import eyeClose from "../images/eyeClose.svg";
import { auth } from '../firebase'
import { useNavigate } from 'react-router-dom'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { useDispatch, useSelector } from 'react-redux'

function Authentication() {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)

  const [eye1, seteye1] = useState('password');
  const [eye2, seteye2] = useState('password');
  const [eye3, seteye3] = useState('password');

  const history = useNavigate()

  const setPasswordEye1 = () => {
    if (eye1 == 'password') {
      seteye1('text')
    } else {
      seteye1('password')
    }
  }

  const setPasswordEye2 = () => {
    if (eye2 == 'password') {
      seteye2('text')
    } else {
      seteye2('password')
    }
  }

  const setPasswordEye3 = () => {
    if (eye3 == 'password') {
      seteye3('text')
    } else {
      seteye3('password')
    }
  }

  const handleClickLogin = (values) => {
      signInWithEmailAndPassword(auth, values.email, values.password)
        .then((userCredential) => {
          const user = userCredential.user;

          dispatch({ type: 'SET_USER', user: user })

          localStorage.setItem('user', true)

        })
        .then (() => {
          history('/home')
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.error('errorCode', errorCode) 
          console.error('errorMessage', errorMessage) 
        });
  }

  const handleClickRegister = (values) => { 
    createUserWithEmailAndPassword(auth, values.email, values.password)
      .then((userCredential) => {
        
        const user = userCredential.user;

        localStorage.setItem('user', true)

        history('/home')
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
   
  }

  const validationLogin = yup.object().shape({
    email: yup
      .string()
      .email("Não é um email.")
      .required("Este campo é obrigatório."),
    password: yup
      .string()
      .min(8, "A senha deve ter oito caracteres")
      .required("Este campo é obrigatório."),
  });

  const validationRegister = yup.object().shape({
    email: yup
      .string()
      .email("Não é um email.")
      .required("Este campo é obrigatório."),
    password: yup
      .string()
      .min(8, "A senha deve ter oito caracteres")
      .required("Este campo é obrigatório."),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "As senhas não são iguais"),
  });

  return (

    <div className="container">
    <div className="input">
     <h1>Login</h1>
     <div className="ajuste-input"/>
     </div>
      <Formik
        initialValues={{}}
        onSubmit={handleClickLogin}
        validationSchema={validationLogin}
      >
        <Form className="login-form">
          <div className="login-form-group">
            <div className="input">
                <Field name="email" className="form-Field" placeholder="Email" />
                <div className="ajuste-input"/>
            </div>
            <ErrorMessage
              component="span"
              name="email"
              className="form-error"
            />
          </div>
          <div className="login-form-group">
            <div className="input">
              <Field
                name="password"
                className="form-Field"
                placeholder="senha "
                type={eye1}
              /> 
              <img className="img" src={eye1 == 'password' ? eye : eyeClose} alt="" onClick={() => setPasswordEye1() } />             
            </div>
            <ErrorMessage
              component="span"
              name="password"
              className="form-error"
            />
          </div>
          <div className="input">
            <button className="button" type="submit">
              Entrar
            </button>
            <div className="ajuste-input"/>
          </div>
        </Form>
      </Formik>
      <hr />
      <div className="input">
      <h1>Cadastro</h1>
      <div className="ajuste-input"/>
      </div>
      <Formik
        initialValues={{}}
        onSubmit={handleClickRegister}
        validationSchema={validationRegister}
       >
        <Form className="login-form">
          <div className="login-form-group">
          <div className="input">
            <Field name="email" className="form-Field" placeholder="Email" />
            <div className="ajuste-input"/>
          </div>
            <ErrorMessage
              component="span"
              name="email"
              className="form-error"
            />
          </div>

          <div className="login-form-group" >
          <div className="input">
            <Field
              name="password"
              className="form-Field"
              placeholder="senha "
              type={eye2}
            />
            <img className="img" src={eye2 == 'password' ? eye : eyeClose} alt="" onClick={() => setPasswordEye2() } />             
            </div>
            <ErrorMessage
              component="span"
              name="password"
              className="form-error"
            />
          </div>
          <div className="login-form-group">
          <div className="input">
            <Field
              name="confirmPassword"
              className="form-Field"
              placeholder="confirme sua senha "
              type={eye3}
            />
            <img className="img" src={eye3 == 'password' ? eye : eyeClose} alt="" onClick={() => setPasswordEye3() } />             
            </div>
            <ErrorMessage
              component="span"
              name="confirmPassword"
              className="form-error"
            />
          </div>
          <div className="input">
            <button className="button" type="submit">
              Cadastrar
            </button>
            <div className="ajuste-input"/>
          </div>
          </Form>
      </Formik>
    </div>
  );
}

export default Authentication;
