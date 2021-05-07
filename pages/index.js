import GlobalStyles from "../components/GlobalStyles";
import TextInput from "../components/index/TextInput";
import VideoAndEmailWrapper from "../components/index/VideoAndEmailWrapper";
import EmailContextProvider from "../contexts/EmailContext";
import video from "./video.mp4";

export default function Home() {
    return (
        <GlobalStyles>
            <main>
                <div className="content">
                    <div className="main-text-wrapper">
                        <h1>
                            Imagine that your Notion collections create a life
                            of their own and start to organize themselves, what
                            do you think?
                        </h1>
                    </div>
                    <VideoAndEmailWrapper>
                        <div className="video-wrapper">
                            <video
                                src={video}
                                playsInline
                                autoPlay
                                muted
                                loop
                            />
                        </div>
                        <div className="email-input-wrapper">
                            <EmailContextProvider>
                                <TextInput />
                            </EmailContextProvider>
                        </div>
                    </VideoAndEmailWrapper>
                </div>
            </main>
            <style jsx>
                {`
                    .content {
                        display: grid;
                        grid-template: repeat(3, min-content) / 1fr;
                        gap: 2rem;
                        max-width: 80rem;
                        margin: 0 auto;
                        padding: 2rem;
                    }
                    .main-text-wrapper h1 {
                        color: white;
                        font-size: clamp(2rem, 2vw, 4rem);
                        text-align: center;
                    }
                    .video-wrapper {
                        border-bottom: 0.1rem solid rgba(255, 255, 255, 0.1);
                    }
                    .video-wrapper video {
                        width: 100%;
                        border-radius: 0.4rem;
                    }
                    .email-input-wrapper {
                        display: flex;
                        justify-content: center;
                        flex-wrap: wrap;
                        padding: 1rem;
                        background-color: var(--complementary-background-color-2);
                    }
                `}
            </style>
        </GlobalStyles>
    );
}
