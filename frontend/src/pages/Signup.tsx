import toast from "react-hot-toast"

const Signup = () => {
  return (
    <div className="w-full h-[100vh] flex items-center justify-center bg-gray-300">
      <div className="gap-y-4 flex flex-col m-10 p-8 bg-white z-10  rounded-2xl">
        <div>
          <h1 className="text-3xl font-bold text-center">Sign UP</h1>
          <p className="w-[280px] text-center">
            Enter your information to create an Account
          </p>
        </div>
        <section className="flex flex-col">
          <label className="font-semibold">FirstName</label>
          <input
            type="text"
            placeholder="Sagar"
            className="border rounded p-1"
          />
        </section>
        <section className="flex flex-col">
          <label className="font-semibold">LastName</label>
          <input
            type="text"
            placeholder="Biradar"
            className="border rounded p-1"
          />
        </section>
        <section className="flex flex-col">
          <label className="font-semibold">Email</label>
          <input
            type="text"
            placeholder="sagarb@gmail.com"
            className="border rounded p-1"
          />
        </section>
        <section className="flex flex-col">
          <label className="font-semibold">Password</label>
          <input type="password" className="border rounded p-1 w-[300px]" />
        </section>
        <section className="flex flex-col">
          <button className="bg-black text-white p-2 rounded cursor-pointer">Sign Up</button>
        </section>
        <p className="text-center">Already have an account? <span className="border-b-1">Login</span> </p>
      </div>
    </div>
  );
}

export default Signup
