import { useState } from "react";
import { useForm } from "react-hook-form";

function SimpleForm2() {
  type formValues = {
    fullname: string;
    email: string;
    password: string;
  };

  const form = useForm<formValues>();
  const [success, setSuccess] = useState(false);
  const { register, handleSubmit, formState, reset } = form;
  const { errors } = formState;

  const onSubmit = (data: formValues) => {
    console.log("Form Submitted", data);
    setSuccess(true);
    reset();
  };

  return (
    <div>
      <h2>Registration Form</h2>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div>
          <label htmlFor="fullname" className="col-sm-1">
            Full Name
          </label>
          <input
            type="text"
            {...register("fullname", { required: "Full name is required" })}
          />
          <p>{errors.fullname?.message}</p>
        </div>

        <div>
          <label htmlFor="email" className="col-sm-1">
            Email
          </label>
          <input
            type="email"
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

        <div>
          <label htmlFor="email" className="col-sm-1">
            Password
          </label>
          <input
            type="password"
            {...register("password", {
              required: "Password is required",
              validate: {
                minLength: (value) =>
                  value.length >= 8 || "Password must be at least 8 characters",
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
        <button type="submit" className="btn btn-primary">
          Register
        </button>
        {success && <p>Registration successful!</p>}
      </form>
    </div>
  );
}

export default SimpleForm2;
