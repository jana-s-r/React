import { useState } from "react";
import { useForm } from "react-hook-form";
import "../styles/register.css";
import { Link } from "react-router-dom";
import { Message } from "rsuite";
import "rsuite/dist/rsuite.min.css";

function Register() {
  type formValues = {
    fullname: string;
    email: string;
    password: string;
  };

  const form = useForm<formValues>();
  const [success, setSuccess] = useState(false);
  const { register, handleSubmit, formState, reset } = form;
  const { errors } = formState;

  const onSubmit = async (data: formValues) => {
    console.log(data);

    await fetch("http://localhost:5000/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    setSuccess(true);
    reset();
  };

  return (
    <div className="register-container">
      {success && (
        <Message
          type="success"
          centered
          showIcon
          header="Registration Successful!"
        >
          Your account has been created successfully. You can now login.
        </Message>
      )}
      <div className="register-box">
        <h2 className="registername">Registration Form</h2>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="fullname">
            <input
              type="text"
              placeholder="Full Name"
              {...register("fullname", { required: "Full name is required" })}
            />
            <p className="errormsg">{errors.fullname?.message}</p>
          </div>

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

          <div className="password">
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
          <button type="submit" className="btn btn-primary reg">
            Register
          </button>

          <h3 className="reg">
            <Link to="/Login">Login</Link>
          </h3>
        </form>
      </div>
    </div>
  );
}

export default Register;
