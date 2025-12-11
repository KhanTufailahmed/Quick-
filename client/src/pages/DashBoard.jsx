import { dummyCreationData } from "@/assets/assets";
import CreationItem from "@/components/Dashboard/CreationItem";
import { Protect, useAuth } from "@clerk/clerk-react";
import axios from "axios";
import { Gem, Sparkles } from "lucide-react";
import React, { use, useEffect, useState } from "react";
const DashBoard = () => {
  const [creations, setCreations] = useState([]);
  const { getToken } = useAuth();
  const [loading, setLoading] = useState(false);
  const getDeshboardData = async () => {
    try {
      setLoading(true);
      const res = await axios.get("api/user/get-user-creations", {
        headers: {
          Authorization: `Bearer ${await getToken()}`,
        },
      });
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

  useEffect(() => {
    getDeshboardData();
  }, []);
  return (
    <div className="h-full overflow-y-scroll p-6">
      <div className="flex justify-start gap-4 flex-wrap">
        <div className="flex justify-between items-center w-72 p-4 px-6 bg-white rounded-xl border border-gray-200">
          <div className="text-slate-600">
            <p className="text-sm">Total Creations</p>
            <h2 className="text-xl font-semibold">{creations.length}</h2>
          </div>
          <div className="w-10 h-10 rounded-lg bg-gradient-to-b from-[#3588F2] to-[#0BB0D7] text-white flex items-center justify-center">
            <Sparkles className="w-5 text-white"></Sparkles>
          </div>
        </div>

        <div className="flex justify-between items-center w-72 p-4 px-6 bg-white rounded-xl border border-gray-200">
          <div className="text-slate-600">
            <p className="text-sm">Active plan</p>
            <h2
              className="text-xl font-semibold"
              plan="premium"
              fallback="free"
            >
              <Protect>Premium</Protect>
            </h2>
          </div>
          <div className="w-10 h-10 rounded-lg bg-gradient-to-b from-[#FF61C5] to-[#9E53EE] text-white flex items-center justify-center">
            <Gem className="w-5 text-white"></Gem>
          </div>
        </div>
      </div>
      {loading ? (
        <div className="w-full h-screen flex items-center justify-center">
          <span className="w-10 h-10 my-1 rounded-full border-3 border-primary border-t-transparent animate-spin"></span>
        </div>
      ) : (
        <div className="space-y-3">
          <p className="mt-6 mb-4">Recent Creations</p>

          {creations.map((item, index) => (
            <CreationItem key={index} item={item}></CreationItem>
          ))}
        </div>
      )}
    </div>
  );
};

export default DashBoard;
