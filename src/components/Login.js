import react, { useState, useEffect } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

function Login({ checkMatch }) {
  return (
    <div className="login">
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={Yup.object().shape({
          email: Yup.string()
            .email("Некорректно введен e-mail")
            .required("Введите e-mail"),
          password: Yup.string()
            .min(6, "Длина пароля должна быть не менее 6 символов")
            .required("Введите пароль"),
        })}
        onSubmit={(values, actions) => {
          setTimeout(() => {
            checkMatch(values)
          }, 1500)
          actions.setSubmitting(true);
        }}
      >
        {({ isSubmitting }) => (
          <Form className="form">
            <Field
              type="email"
              name="email"
              placeholder="E-mail"
              className="input"
              autoComplete="off"
            />
            <span className="input__underline" />
            <ErrorMessage
              name="email"
              render={(msg) => <div className="error">{msg}</div>}
            />
            <Field
              type="password"
              name="password"
              placeholder="Пароль"
              className="input"
            />
            <ErrorMessage
              name="password"
              render={(msg) => <div className="error">{msg}</div>}
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className={`${
                isSubmitting ? "entryBtn entryBtn_disabled" : "entryBtn"
              }`}
            >
              {isSubmitting ? "Выполняется вход..." : "Войти"}
              {isSubmitting ? <div className="loader" /> : ""}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default Login;
