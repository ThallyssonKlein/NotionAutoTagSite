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
        Imagine that your Notion collections create a life of their own and start to organize themselves, what do you think?
      </h1>
      <EmailContextProvider><TextInput/></EmailContextProvider>
    </div>
  );
}
