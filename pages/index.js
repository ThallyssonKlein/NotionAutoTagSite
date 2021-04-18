import TextInput from "../components/TextInput";
import EmailContextProvider from "../contexts/EmailContext";

export default function Home() {
  return (
    <main>
      <div className="content">
        <div className="main-text-wrapper">
          <h1>
            Imagine that your Notion collections create a life of their own and
            start to organize themselves, what do you think?
          </h1>
        </div>
        <div className="video-wrapper">
          <video src={require("./video.mp4")} autoPlay loop />
        </div>
        <div className="email-input-wrapper">
          <EmailContextProvider>
            <TextInput />
          </EmailContextProvider>
        </div>
      </div>
    </main>
  );
}
