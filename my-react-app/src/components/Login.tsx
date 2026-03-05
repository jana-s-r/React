import { useForm } from "react-hook-form";
import "../styles/login.css";

function Login() {
  const form = useForm<formValues>();
  const { register, handleSubmit, formState, reset } = form;
  const { errors } = formState;

  type formValues = {
    email: string;
    password: string;
  };

  const onSubmit = (data: formValues) => {
    console.log("Form Submitted", data);
    window.location.href = "https://www.w3schools.com/";
    reset();
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2 className="name">Login</h2>
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
            <p>{errors.email?.message}</p>
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
            <p>{errors.password?.message}</p>
          </div>

          <button className="btn btn-primary">Login</button>
          <h3 className="reg">
            Don't have an account? <span>Register</span>
          </h3>
        </form>
      </div>
    </div>
  );
}

export default Login;
