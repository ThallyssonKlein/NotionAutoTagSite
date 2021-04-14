import TextInput from "./TextInput";
import EmailContextProvider from "./EmailContext";

export default function Home() {
  return (
    <div
      style={{
        position: "absolute",
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)",
        textAlign: "center",
      }}
    >
      <h1 style={{ fontFamily: "arial" }}>
        [YOUR_PRODUCT_HEADLINE]
      </h1>
      <EmailContextProvider><TextInput/></EmailContextProvider>
    </div>
  );
}
