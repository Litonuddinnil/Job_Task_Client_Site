 
import { FcGoogle } from "react-icons/fc";  
import { useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const SocialLogin = () => {
  const { logInGoogle } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || "/"; 
  const handlerGoogleLogin = () => {
    logInGoogle()
      .then((result) => {
        console.log(result);
        navigate(from, { replace: true }); 
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <div className="text-center">
      <div className="divider">OR</div>
      <div className="flex items-center justify-center">
        <button onClick={handlerGoogleLogin} className="text-4xl">
          {" "}
          <FcGoogle></FcGoogle>
        </button>
      </div> 
    </div>
  );
};

export default SocialLogin;