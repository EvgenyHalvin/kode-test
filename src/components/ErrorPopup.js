import react from "react";

function ErrorPopup({ onClose, isOpen }) {
  return (
    <div
      className={`popup ${isOpen ? "popup_opened" : ""}`}
      onClick={(e) => {
        if (e.target.className === "popup popup_opened") {
          onClose();
        }
      }}
    >
      <div className="popup__container">
        <button
          type="button"
          className="popup__close-icon"
          onClick={onClose}
        ></button>
        <div className="popup__err-image" />
        <h3 className="popup__title">
          Данные введены неправильно
        </h3>
      </div>
    </div>
  );
}

export default ErrorPopup;
