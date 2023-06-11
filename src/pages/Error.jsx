const Error = () => {
  return (
    <div className="row">
      <div className="col-lg-3 col-md-1"></div>
      <div
        className="col-lg-9 col-md-11"
        style={{
          textAlign: "center",
          marginTop: "50px",
        }}
      >
        <h3>Sorry, this page isn't available.</h3>
        <p>
          The link you followed may be broken, or the page may have been
          removed. Go back to Instagram.
        </p>
      </div>
    </div>
  );
};

export default Error;
