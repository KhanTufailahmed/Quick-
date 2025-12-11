import { dummyPublishedCreationData } from "@/assets/assets";
import { useAuth, useUser } from "@clerk/clerk-react";
import axios from "axios";
import { Heart } from "lucide-react";
import React, { use, useEffect, useState } from "react";
import { toast } from "sonner";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const Community = () => {
  const [creations, setCreations] = useState([]);
  const { user } = useUser();
  const { getToken } = useAuth();
  const [loading, setLoading] = useState(false);
  const fetchCreations = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/api/user/get-published-creations", {
        headers: {
          Authorization: `Bearer ${await getToken()}`,
        },
      });
      setCreations(res.data.data);

      if (res.data.success) {
        setCreations(res.data.data);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleOnLike = async (id) => {
    try {
      const res = await axios.post(
        "/api/user/toggle-like-creations",
        { id },
        {
          headers: {
            Authorization: `Bearer ${await getToken()}`,
          },
        }
      );
      if (res.data.success) {
        toast.success(res.data.data);
        await fetchCreations();
      } else {
        toast.error(res.data.data);
      }
    } catch (error) {
      if (error.response?.data?.data) {
        toast.error(error.response.data.data);
      } else {
        toast.error(error.message);
      }
    }
  };

  useEffect(() => {
    if (user) {
      fetchCreations();
    }
  }, [user]);
  
  return (
    <div className="flex-1 h-full flex flex-col gap-4 p-6">
      <h1 className="text-xl font-semibold"> Creations</h1>

      {loading ? (
        <div className="flex-1 flex justify-center items-center">
          <span className="w-10 h-10 my-1 rounded-full border-3 border-primary border-t-transparent animate-spin"></span>
        </div>
      ) : (
        <div className="bg-white h-full w-full rounded-xl overflow-y-scroll">
          {creations.map((creation, index) => (
            <div
              key={index}
              className="relative group inline-block pl-3 pt-3 w-full sm:max-w-1/2 lg:max-w-1/3"
            >
              <img
                src={creation.content}
                alt=""
                className="w-full h-full object-cover rounded-lg"
              />
              <div className="absolute bottom-0 top-0 right-0 left-3 flex gap-2 items-end justify-end group-hover:justify-between p-3 group-hover:bg-gradient-to-b from-transparent to-black/80 text-white rounded-lg">
                <p className="text-sm hidden group-hover:block">
                  {creation.prompt}
                </p>
                <div
                  className=" flex gap-1 items-center"
                  onClick={() => handleOnLike(creation.id)}
                >
                  <p>{creation.likes.length}</p>
                  <Heart
                    className={`min-w-5 h-5 hover:scale-110 cursor-pointer ${
                      creation.likes.includes(user.id)
                        ? "fill-red-500 text-red-600"
                        : "text-white"
                    }`}
                  ></Heart>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Community;
