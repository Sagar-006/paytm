import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

interface useDebounceType{
  value:string,
  delay:number,
} 

const Dashboard = () => {
  const [filter,setFilter] = useState('');
    const navigate = useNavigate();
  const [balance, setBalance] = useState<any>();
  const [allUsers,setAllUsers] =  useState<any>([])
  const getData = async () => {
    const token = localStorage.getItem("token");
    const getBalance = async () => {
      const response = await axios.get(
        "http://localhost:4000/api/v1/account/balance",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    //   console.log(response.data);
      setBalance(response.data.balance);
    };
    getBalance();
    // const getAllusers = async() => {
    //     const allUsers = await axios.get(
    //       `http://localhost:4000/api/v1/user/bulk?filter=${filter}`
    //     );
    //     // console.log(allUsers.data.finalData)
    //     setAllUsers(allUsers.data.finalData);
    // }
    // getAllusers();

    const useDebounce = (value:string, delay:number) => {
      const [debounced, setDebounced] = useState(value);
      const [allUsers,setAllUsers] = useState<any>([])
      

      useEffect(() => {
        const id =setTimeout(() => {
          setDebounced(value);
        }, delay);
        return () => clearTimeout(id);
      }, [value, delay]);

      useEffect(() => {
        if(!debounced) return;

        const getUsers = async() => {
          try{
          const response = await axios.get(`http://localhost:4000/api/v1/user/bulk?filter=${debounced}`);
          setAllUsers(response.data.finalData)
        }
        
        catch(e){
          const err = e as any;
          const msg = err.response.data.message ?? err.message ?? "Error";
          toast.error(msg)
        }
        }
        getUsers();

        return allUsers
      },[debounced])

      
    };

    const debouncedquery = useDebounce(filter,500);
    console.log(debouncedquery)
    setAllUsers(debouncedquery);

  };

  useEffect(() => {
    getData();
  }, []);
  // console.log(allUsers)
  return (
    <div className="w-full ">
      <div className=" m-4 border-b-1 pb-7 flex justify-between items-center">
        <h1 className="text-4xl font-bold">Payments App</h1>
        <div>
          Hello,User{" "}
          <span className="bg-gray-300   w-10 p-2 rounded-full">U</span>
        </div>
      </div>
      <div className="m-4 mt-6">
        <h1 className="text-2xl font-bold">
          Your Balance Rs <span>{Math.round(balance)}</span>
        </h1>
      </div>
      <div className="m-4 mt-8">
        <h1 className="text-2xl font-bold">Users</h1>
        <input
          onChange={(e) => setFilter(e.target.value)}
          type="text"
          placeholder="Search users"
          className="w-full border-1 border-gray-350 pl-2 p-1 mt-4 rounded"
        />
      </div>

      <div>
        {allUsers.map((user: any) => {
          return (
            <div className="m-4 mt-6 " key={user._id}>
              <div className="flex  justify-between">
                <div className="flex items-center gap-x-3">
                  <h1 className="bg-gray-400 p-4 rounded-full">U1</h1>
                  <h1 className="text-xl font-semibold"><span>{user.firstname}</span> <span>{user.lastname}</span></h1>
                </div>
                <div
                  onClick={() =>
                    navigate("/send", {
                      state: {
                        firstname: user.firstname,
                        lastname: user.lastname,
                        _id:user._id,
                      },
                    })
                  }
                >
                  <button className=" w-30 p-2 rounded cursor-pointer  bg-black text-white">
                    Send Money
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Dashboard;
