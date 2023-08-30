import React from "react";

const InputForm = () => {
  return (
    <>
      <div>
        <div className="absolute bottom-0 w-full">
          <form action="" className="flex p-4">
            <input
              type="text"
              className="w-11/12 h-10 bg-slate-50 rounded-s-lg p-3 outline-none"
            />
            <input
              type="submit"
              value="Send"
              className="bg-primary-color px-3 rounded-e-lg cursor-pointer hover:font-semibold"
            />
          </form>
        </div>
      </div>
    </>
  );
};

export default InputForm;
