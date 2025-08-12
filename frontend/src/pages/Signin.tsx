import { useState } from "react";
import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Signin = () => {
  const navigate = useNavigate();

  const [signin, setSignin] = useState({
    username: "",
    password: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const getData = async () => {
      try {
        const response = await axios.post(
          "http://localhost:4000/api/v1/user/signin",
          {
            username: signin.username,
            password: signin.password,
          }
        );
        //   console.log(err.response.data.message)

        if (response.data.message == "User aleready exists!") {
          toast.error(response.data.message);
        }

        // @ts-ignore
        const token: string = response.data.token;
        localStorage.setItem("token", token);

        console.log(token);
        if (token !== "") {
          // @ts-ignore
          toast.success("signup successfully!");
          navigate("/dashboard");
        }
      } catch (e) {
        const err = e as AxiosError<{ message?: string }>;
        const msg = err.response?.data?.message ?? err.message ?? "Error";
        toast.error(msg);
      }
    };
    getData();
  };

  const changeHandler = (e: any) => {
    setSignin((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  console.log(signin);

  return (
    <div className="w-full h-[100vh] flex items-center justify-center bg-gray-300">
      <form
        onSubmit={handleSubmit}
        className="gap-y-4 flex flex-col m-10 p-8 bg-white z-10  rounded-2xl"
      >
        <div>
          <h1 className="text-3xl font-bold text-center">Sign In</h1>
          <p className="w-[280px] text-center">
            Enter your information to access your Account
          </p>
        </div>
        
        <section className="flex flex-col">
          <label className="font-semibold">Email</label>
          <input
            onChange={changeHandler}
            type="email"
            name="username"
            placeholder="sagarb@gmail.com"
            className="border rounded p-1"
          />
        </section>
        <section className="flex flex-col">
          <label className="font-semibold">Password</label>

          <input
            type="password"
            name="password"
            onChange={changeHandler}
            className="border rounded p-1 w-[300px]"
          />
        </section>
        <section className="flex flex-col">
          <button
            type="submit"
            className="bg-black text-white p-2 rounded cursor-pointer"
          >
            Sign In
          </button>
        </section>
        <p className="text-center">
          Don't have an account?{" "}
          <span
            className="border-b-1 cursor-pointer"
            onClick={() => navigate("/")}
          >
            Sign Up
          </span>{" "}
        </p>
      </form>
    </div>
  );
};

export default Signin;
