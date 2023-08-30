import userIcon from "../assets/img/User_icon_BLACK-01.png";

export const LoginRegTemp = (props) => {
  return (
    <div className="flex items-center justify-center">
      <div className="flex w-10/12 md:w-3/4  mx-auto h-3/5 shadow rounded-xl fixed top-2/4 -translate-y-2/4">
        <div className="flex flex-col items-center justify-center w-2/6 bg-primary-color rounded-s-xl">
          <img src={userIcon} alt="" className=" md:w-20 w-14" />
          <p className=" font-semibold md:text-xl text-md">{props.formName}</p>
        </div>

        <div className="w-4/6 bg-secondary-color rounded-e-xl relative">
          {props.children}
        </div>
      </div>
    </div>
  );
};
