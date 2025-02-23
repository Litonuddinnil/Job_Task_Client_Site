import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";  
import { Helmet } from "react-helmet-async"; 
import useAuth from "../../hooks/useAuth";

const Register = () => {
  const { createUserData, setUser, updateProfileUser } = useAuth();
  const [terms, setTerms] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [validName, setValidName] = useState("");
  const navigate = useNavigate();

  const handleTermsChange = () => setTerms(!terms);

  const validNameUpdate = (name) => {
    if (name.length === 0 || name.length <= 3) {
      return "Name must be at least 3 characters long!";
    }
    return "";
  };

  const validatePassword = (password) => {
    if (password.length < 6) {
      return "Password must be at least 6 characters long.";
    }
    if (!/[A-Z]/.test(password)) {
      return "Password must contain at least one uppercase letter.";
    }
    if (!/[a-z]/.test(password)) {
      return "Password must contain at least one lowercase letter.";
    }
    return "";
  };

  const handlerRegister = (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const name = form.get("name");
    const photo = form.get("photoURL");
    const email = form.get("email");
    const password = form.get("password");

    const error = validatePassword(password);
    if (error) {
      setPasswordError(error);
      toast.error(error);
      return;
    }

    const errorName = validNameUpdate(name);
    if (errorName) {
      setValidName(errorName);
      toast.error(errorName);
      return;
    }

    setPasswordError("");
    setValidName("");

    createUserData(email, password)
      .then((result) => {
        const user = result.user;
        setUser(user);
        updateProfileUser({ displayName: name, photoURL: photo })
          .then(() => {
            toast.success("Registration successful!");
            navigate("/");
            const newUser = { name, email, photo,uid:user.uid };
            fetch('https://job-task-server-site.onrender.com/users', {
              method: "POST",
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(newUser)
            })
          })
          .catch((err) => {
            toast.error(err.message);
            // console.error(err);
          });
      })
      .catch((err) => {
        toast.error(err.message);
        // console.error(err.code, err.message);
      });
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center " 
    >
      <Helmet>
              <title>Register Page</title>
            </Helmet> 
      <div className="card  bg-opacity-90 w-full max-w-lg shadow-2xl rounded-none">
        <h1 className="text-2xl mt-2 text-center font-bold">Register Your Account</h1>
        <form onSubmit={handlerRegister} className="card-body">
          <div className="form-control">
            <label className="label">
              <span className="label-text text-lg font-semibold">Your Name</span>
            </label>
            <input
              type="text"
              placeholder="Enter your name"
              name="name"
              className="input input-bordered"
              onChange={(e) => {
                const errorName = validNameUpdate(e.target.value);
                setValidName(errorName);
              }}
              required
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text text-lg font-semibold">Photo URL</span>
            </label>
            <input
              type="text"
              placeholder="Enter the photo link"
              name="photoURL"
              className="input input-bordered"
              required
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text text-lg font-semibold">Email</span>
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email address"
              className="input input-bordered"
              required
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text text-lg font-semibold">Password</span>
            </label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              className="input input-bordered"
              onChange={(e) => {
                const error = validatePassword(e.target.value);
                setPasswordError(error);
              }}
              required
            />
          </div>

          <div className="form-control">
            <label className="label">
              <p className="label-text-alt flex items-center gap-2">
                <input
                  onChange={handleTermsChange}
                  type="checkbox"
                  checked={terms}
                  className="checkbox"
                />
                Accept Terms & Conditions
              </p>
            </label>
          </div>

          <div className="form-control mt-6">
            <button
              className="btn btn-outline rounded-none text-secondary disabled:opacity-50"
              disabled={!terms}
            >
              Register
            </button>
          </div>
        </form>

        <p className="mb-4 text-center font-semibold text-gray-500">
          Already have an account?{" "}
          <Link to="/login" className="text-red-600">
            Log in here
          </Link>
        </p>
      </div>
      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  );
};

export default Register;