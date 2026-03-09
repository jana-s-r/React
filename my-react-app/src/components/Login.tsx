import { useForm } from "react-hook-form";
import "../styles/login.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Login() {
  type formValues = {
    email: string;
    password: string;
  };

  const navigate = useNavigate();
  const [serverMsg, setServerMsg] = useState("");
  const form = useForm<formValues>();
  const { register, handleSubmit, formState, reset } = form;
  const { errors } = formState;

  const onSubmit = async (data: formValues) => {
    try {
      const res = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const msg = await res.text();

      setServerMsg(msg);

      if (msg === "Login Successful") {
        navigate("/chatbot");
      }

      reset();
    } catch (err) {
      console.error(err);
      alert("Server error");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2 className="loginname">Login</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="email">
            <input
              type="email"
              placeholder="Email ID"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+\.\S+$/i,
                  message: "Invalid email format",
                },
              })}
            />
            <p className="errormsg">{errors.email?.message}</p>
          </div>

          <div className="pass">
            <input
              type="password"
              placeholder="Password"
              {...register("password", {
                required: "Password is required",
                validate: {
                  minLength: (value) =>
                    value.length >= 8 ||
                    "Password must be at least 8 characters",
                  hasUpperCase: (value) =>
                    /[A-Z]/.test(value) ||
                    "Password must include an uppercase letter",
                  hasNumber: (value) =>
                    /[0-9]/.test(value) || "Password must include a number",
                },
              })}
            />
            <p className="errormsg">{errors.password?.message}</p>
          </div>
          {serverMsg && <p className="servermsg">{serverMsg}</p>}
          <button className="btn btn-primary">Login</button>
          <h3 className="reg">
            Don't have an account? <Link to="/Register">Register</Link>
          </h3>
        </form>
      </div>
    </div>
  );
}

export default Login;
