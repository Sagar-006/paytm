import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useLocation } from "react-router-dom";

export const Send = () => {
  const [amount, setAmount] = useState("");
  const { state }: any = useLocation();
  const firstname = state?.firstname ?? "Unknown";
  const lastname = state?.lastname ?? "Unknown";
  const to = state?._id ?? "Unknown";

  const makePayment = async() => {
    const token = localStorage.getItem("token");
      const res = await axios.post(
        "http://localhost:4000/api/v1/account/transfer",{
          to:to,
          amount
        },
        {
          headers:{Authorization:`Bearer ${token}`}
        }
      );

      toast.success("Payment Done!")
  }

  // console.log(firstname)
  const handleTransfer = () => {
    if (!amount || Number(amount) <= 0) {
      alert("Please enter a valid amount");
      return;
    }
    setAmount("");
    makePayment();
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md rounded-xl bg-white shadow p-8">
        <h1 className="text-2xl font-bold text-center mb-6">Send Money</h1>

        <div className="flex items-center gap-3 mb-4">
          <div className="h-10 w-10 rounded-full bg-emerald-500 text-white grid place-items-center font-semibold">
            A
          </div>
          <div className="font-semibold">
            <span>{firstname}</span> <span>{lastname}</span>
          </div>
        </div>

        <label className="text-sm text-gray-600">Amount (in Rs)</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter amount"
          className="mt-2 w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
        />

        <button
          onClick={handleTransfer}
          className="mt-4 w-full rounded-md bg-emerald-500 hover:bg-emerald-600 text-white py-2 font-medium"
        >
          Initiate Transfer
        </button>
      </div>
    </div>
  );
};
export default Send;
