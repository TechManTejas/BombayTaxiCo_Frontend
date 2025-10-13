export const DividerWithLogo = () => {
  return (
    <>
      <div style={{
        width: "100%", 
        clear: "left",
        borderBottom: "1px solid #e9e9e9",
        marginTop: "10px",
        marginBottom: "20px",
        position: "relative"
      }}></div>
      <div style={{ width: "100%", position: "relative" }}>
        <div
          style={{
            backgroundColor: "#fff",
            position: "absolute",
            top: "-53px",
            left: "50%",
            transform: "translate(-50%, 0)",
          }}
        >
          <img
            className=" ls-is-cached lazyloaded"
            src="logo.png"
            alt=""
            style={{ width: 100, paddingRight: 20, paddingLeft: 20 }}
          />
        </div>
      </div>
    </>
  );
};
