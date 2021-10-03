import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

function ConfirmationContent({ confirm }) {
  return (
    <div className="confirm">
      <p className="confirm__title">На Ваш номер телефона был выслан код проверки. Введите его в поле ниже.</p>
      <Formik
        initialValues={{ code: "" }}
        validationSchema={Yup.object().shape({
          code: Yup.number()
            .test(
              "length",
              "Код должен быть из 6 цифр",
              (val) => val.toString().length === 6
            )
            .typeError("Код должен состоять только из цифр")
            .required("Введите код из SMS-сообщения"),
        })}
        onSubmit={(values, actions) => {
          actions.setSubmitting(true);
          setTimeout(() => {
            actions.setSubmitting(false);
            confirm(values);
          }, 1500);
        }}
      >
        {({ isSubmitting }) => (
          <Form className="form">
            <Field
              type="text"
              name="code"
              placeholder="Код из SMS-сообщения"
              className="input"
              autoComplete="off"
            />
            <ErrorMessage
              name="code"
              render={(msg) => <div className="error">{msg}</div>}
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className={`${
                isSubmitting ? "entryBtn entryBtn_disabled" : "entryBtn"
              }`}
            >
              {isSubmitting ? "Подтверждение" : "Подтвердить"}
              {isSubmitting ? <div className="loader" /> : ""}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default ConfirmationContent;
