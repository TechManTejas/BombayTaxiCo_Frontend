export const DividerWithLogo = () => {
  return (
    <>
      <div style={{
        width: "100%", 
        clear: "left",
        borderBottom: "1px solid #e9e9e9",
        marginTop: "60px",
        marginBottom: "70px",
        position: "relative"
      }}></div>
      <div style={{ width: "100%", position: "relative" }}>
        <div
          style={{
            backgroundColor: "#fff",
            position: "absolute",
            top: "-103px",
            left: "50%",
            transform: "translate(-50%, 0)",
          }}
        >
          <img
            className=" ls-is-cached lazyloaded"
            src="https://www.transfeero.com/wp-content/themes/understrap-master/q.svg?x87999"
            data-src="https://www.transfeero.com/wp-content/themes/understrap-master/q.svg?x87999"
            alt="Transfeero Logo"
            style={{ width: 90, paddingRight: 20, paddingLeft: 20 }}
          />
        </div>
      </div>
    </>
  );
};
