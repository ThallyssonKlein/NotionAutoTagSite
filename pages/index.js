import TextInput from "../components/TextInput";
import EmailContextProvider from "../contexts/EmailContext";
import video from './video.mp4';

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
            <video src={video} autoPlay loop/>   
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
