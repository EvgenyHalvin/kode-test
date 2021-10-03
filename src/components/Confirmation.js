import { Redirect } from "react-router-dom";
import ConfirmationContent from "./ConfirmationContent";

function Confirmation(props) {
  return props.loggedIn ? (
    <ConfirmationContent {...props} />
  ) : (
    <Redirect to="/sign-in" />
  );
}

export default Confirmation;
