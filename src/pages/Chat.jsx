import axios from "axios";
import React, { useEffect, useState } from "react";
import uImg from "../assets/img/User_icon_BLACK-01.png";
import ConectedUser from "../components/chat/ConectedUser";
import InputForm from "../components/chat/InputForm";

function Chat() {
  const [data, setData] = useState([]);
  const token = localStorage.getItem("user-auth");

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/home", {
        headers: {
          Authorization: token,
        },
      })
      .then((response) => {
        if (response.data.status === "error") {
          window.location.href = "/";
        } else if (response.data.status === "ok") {
          setData(response.data.msg);
        }
      });
  }, []);

  return (
    <>
      <h2 className="text-2xl text-center">{data}</h2>
      <div className="w-3/4 m-auto">
        <div className="flex h-[80vh]">
          <ConectedUser />
          <div className="w-3/5 bg-secondary-color rounded-e-lg relative">
            <div>
              <div className="flex pt-3">
                <div>
                  <img src={uImg} alt="" className="w-12 p-2" />
                </div>
                <div className="relative">
                  <h3 className="absolute top-2/4 -translate-y-2/4 text-md">
                    UserName
                  </h3>
                </div>
              </div>
              <div className="h-[1px] mx-auto bg-black "></div>
            </div>
            <InputForm />
          </div>
        </div>
      </div>
    </>
  );
}

export default Chat;
