import react, { useState, useEffect } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

function Login() {
  <div className="login">
    <Formik
      initialValues={{
        email: "",
        password: "",
      }}
      validationSchema={Yup.object().shape({
        emial: Yup.string()
          .email("Некорректно введен e-mail")
          .required("Введите e-mail"),
        password: Yup.string()
          .min(6, "Пароль должен быть длиной не менее 6 символов")
          .required("Введите пароль"),
      })}
      onSubmit={(values, actions) => {
        actions.setSubmitting(true);
        setTimeout(() => {
          actions.setSubmitting(false);
        }, 1500);
      }}
    >
      {({ isSubmitting }) => (
        <Form className="form">
          <Field
            className="input"
            type="email"
            name="email"
            placeholder="E-mail"
          />
          <ErrorMessage
            name="email"
            render={(msg) => <div className="error-validate">{msg}</div>}
          />
          <Field
            className="input"
            type="password"
            name="password"
            placeholder="Пароль"
          />
          <ErrorMessage
            name="password"
            render={(msg) => <div className="error-validate">{msg}</div>}
          />
          <button
            type="submit"
            disabled={isSubmitting}
            className={`${isSubmitting ? "entryBtn_disabled" : "entryBtn"}`}
          >
            { isSubmitting ? "Выполняется вход..." : "Войти"}
            { isSubmitting ? <div className="loader" /> : ""}
          </button>
        </Form>
      )}
    </Formik>
  </div>;
}

export default Login;
