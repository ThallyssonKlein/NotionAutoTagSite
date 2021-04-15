import TextInput from "../components/TextInput";
import EmailContextProvider from "../contexts/EmailContext";

export default function Home() {
  return (
    <div style={{position : "absolute", top : 0, left : 0, right : 0, bottom : 0, margin : 0, padding : 0, backgroundColor: "#2c3334"  }}>
        <div
          style={{
            display : 'flex',
            position : 'relative',
            flex : 1,
            alignItems : 'center',
            justifyContent : 'center',
            flexDirection : 'column',
            padding : 0,
            margin : 0,
            paddingTop : 50,
            textAlign: "center",
            backgroundColor: "#2c3334"
          }}
        >
          <h1 style={{ fontFamily: "arial", color : "#d3d6d7" }}>
            Imagine that your Notion collections create a life of their own and start to organize themselves, what do you think?
          </h1>
          <video src={require('./video.mp4')} autoPlay loop/>   
          <div style={{marginTop : 50}}>
            <EmailContextProvider><TextInput/></EmailContextProvider>
          </div>
        </div>
    </div>
  );
}
