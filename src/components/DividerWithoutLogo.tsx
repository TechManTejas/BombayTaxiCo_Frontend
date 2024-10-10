export const DividerWithoutLogo = () => {
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
          </div>
        </div>
      </>
    );
  };
  