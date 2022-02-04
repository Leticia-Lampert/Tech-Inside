import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import "./App.css";

function App() {
  const handleClickRegister = (values) => console.log(values);

  const handleClickLogin = (values) => console.log(values);

  const validationLogin = yup.object().shape({
    email: yup.string().email("Não é um email.").required("Este campo é obrigatório."),
    password: yup.string().min(8, "A senha deve ter oito caracteres").required("Este campo é obrigatório."),
  });

  const validationRegister = yup.object().shape({
    email: yup.string().email("Não é um email.").required("Este campo é obrigatório."),
    password: yup.string().min(8, "A senha deve ter oito caracteres").required("Este campo é obrigatório."),
    confirmPassword: yup.string().oneOf([yup.ref("password"), null], "As senhas não são iguais")
  });

  return (
    <div className="container">
      <h1>Login</h1>
      <Formik initialValues={{}}
      onSubmit={handleClickLogin} 
      validationSchema = {validationLogin}>
        <Form className="login-form">
          <div className="login-form-group">
            <Field
              name="email"
              className="form-Field"
              placeholder="Email"/>
              <ErrorMessage
              component="span"
              name="email"
              className="form-error"/>
          </div>

          <div className="login-form-group">
            <Field
              name="password"
              className="form-Field"
              placeholder="senha "
              type="password"
            />
              <ErrorMessage
              component="span"
              name="password"
              className="form-error"/>
          </div>
         <button className="button" type="submit">
           Entrar
          </button> 
        </Form>
      </Formik>
      <h1>Cadastro</h1>
    <Formik initialValues={{}}
      onSubmit={handleClickRegister} 
      validationSchema = {validationRegister}>
        <Form className="login-form">
          <div className="login-form-group">
            <Field
              name="email"
              className="form-Field"
              placeholder="Email"/>
              <ErrorMessage
              component="span"
              name="email"
              className="form-error"/>
          </div>

          <div className="login-form-group">
            <Field
              name="password"
              className="form-Field"
              placeholder="senha "
              type="password"
            />
              <ErrorMessage
              component="span"
              name="password"
              className="form-error"/>
          </div>
          <div className="login-form-group">
            <Field 
              name="confirmPassword"
              className="form-Field"
              placeholder="confirme sua senha "
              type="password"
            />
            <ErrorMessage
              component="span"
              name="confirmPassword"
              className="form-error"
            />
          </div>
         <button className="button" type="submit">
           Cadastrar
          </button> 
        </Form>
      </Formik>
    </div>
  );
}

export default App;
