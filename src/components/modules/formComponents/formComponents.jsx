export const Form = (props) => {
  return (
    <form
      action={props.action}
      onSubmit={props.onSubmit}
      className=" w-full absolute top-2/4 left-2/4 -translate-y-1/2 -translate-x-1/2"
    >
      {props.children}
    </form>
  );
};

//
export const FormField = (props) => {
  return (
    <div className="flex flex-col lg:w-3/5 w-10/12 mb-8 mx-auto">
      <input
        type={props.type}
        name={props.name}
        placeholder={props.placeholder}
        value={props.value}
        onChange={props.onChange}
        onBlur={props.onBlur}
        onKeyUp={props.onKeyUp}
        className={`bg-transparent border-b-2 border-gray-950 outline-none transition duration-300 ease-linear delay-100 focus:border-btn-color ${props.errorClass}`}
      />
      {props.children}
    </div>
  );
};

//
export const FormFieldError = (props) => {
  return <span className=" text-red-500 text-sm">{props.error}</span>;
};

//
export const FormSubmit = (props) => {
  return (
    <div className="mx-auto lg:w-3/5 w-10/12 text-right">
      <input
        type="submit"
        value={props.value}
        className=" py-2 px-8 mt-4 lg:mt-7 w-full lg:w-36 bg-primary-color rounded-md text-black font-semibold shadow-md hover:shadow-sm hover:cursor-pointer transition-all duration-700 ease-in-out delay-75"
      />
    </div>
  );
};
