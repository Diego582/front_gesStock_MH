import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const Private = (props) => {
  const user = useSelector((store) => store.users.user);

  return <>{user.name ? <>{props.children}</> : <Navigate to="/signin" />}</>;
};
export default Private;
