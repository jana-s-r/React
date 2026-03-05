import { useForm } from "react-hook-form";

function SimpleForm() {
  const form = useForm<formValues>();
  const { register, handleSubmit, formState } = form;
  const { errors } = formState;

  type formValues = {
    email: string;
    password: string;
  };

  const onSubmit = (data: formValues) => {
    console.log("Form Submitted", data);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-control">
          <label htmlFor="email" className="col-sm-1">
            Email
          </label>
          <input
            type="text"
            id="email"
            {...register("email", { required: "Email is required" })}
          />
        </div>

        <p>{errors.email?.message}</p>

        <div className="form-control">
          <label htmlFor="password" className="col-sm-1 pd-4">
            Password
          </label>
          <input
            type="password"
            id="password"
            {...register("password", {
              pattern: {
                value:
                  /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/,
                message: "invalid password",
              },
              validate: {
                wrongPass: (fieldValue) =>
                  fieldValue.length >= 6 || "Password must be 6 letter",
              },
            })}
          />
        </div>
        <p>{errors.password?.message}</p>

        <button>Login</button>
      </form>
    </div>
  );
}

export default SimpleForm;
