import { React } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

function Login({ checkMatch }) {
  return (
    <div className="login">
      <h1 className="login__title">Авторизация</h1>
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={Yup.object().shape({
          email: Yup.string()
            .email("Некорректно введен e-mail")
            .required("Введите e-mail"),
          password: Yup.string()
            .required("Введите пароль"),
        })}
        onSubmit={(values, actions) => {
          actions.setSubmitting(true);
          setTimeout(() => {
            actions.setSubmitting(false);
            checkMatch(values);
          }, 1500);
        }}
      >
        {({ isSubmitting }) => (
          <Form className="form">
            <Field
              type="email"
              name="email"
              placeholder="E-mail"
              className="input"
            />
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
