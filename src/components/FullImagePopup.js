import { React } from "react";

function FullImagePopup({ card, onClose, isOpen }) {
  return (
    <>
      {card.images ? (
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
            <img
              alt={card.name}
              className="popup__image"
              src={card.images.large}
            />
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
}

export default FullImagePopup;
