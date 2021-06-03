import { useEffect, useState } from "react";
import ConnectWithNotion from "../components/app/main/CallToAction";
import Header from "../components/app/header";
import GlobalStyles from "../components/GlobalStyles";
import firestore from "../utils/firestore";
import ConnectedWithNotion from "../components/app/main/ConnectedWithNotion";

export default function App({ connected }) {
    const [connectedWithNotion, setConnectedWithNotion] = useState(false);

    useEffect(
        () =>
            connected
                ? setConnectedWithNotion(true)
                : setConnectedWithNotion(false),
        [connected]
    );

    return (
        <GlobalStyles>
            <div className="container">
                <Header />
                <main>
                    {connectedWithNotion ? (
                        <ConnectedWithNotion />
                    ) : (
                        <ConnectWithNotion />
                    )}
                </main>
            </div>
            <style jsx>{`
                .container {
                    display: grid;
                    grid-template-areas:
                        "header"
                        "main";
                    grid-template-rows: min-content 1fr;
                    row-gap: 1rem;
                    height: 100%;
                    padding: 2rem;
                }
                main {
                    padding: 1rem;
                }
            `}</style>
        </GlobalStyles>
    );
}

export async function getServerSideProps(context) {
    const { code: authorizationCode, error } = context.query;

    if (error === "access_denied") {
        return { props: { error } };
    }

    if (authorizationCode) {
        const body = JSON.stringify({
            grant_type: "authorization_code",
            code: authorizationCode,
            redirect_uri: process.env.NEXT_PUBLIC_REDIRECT_URI_DEV,
        });

        const auth = Buffer.from(
            `${process.env.NEXT_PUBLIC_CLIENT_ID_DEV}:${process.env.NEXT_PUBLIC_SECRET_DEV}`
        ).toString("base64");

        const { access_token } = await (
            await fetch("https://api.notion.com/v1/oauth/token", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Basic ${auth}`,
                },
                body,
            })
        ).json();

        const { email } = context.req.cookies;
        const documents = await firestore
            .connect()
            .collection("authorizations")
            .get();

        documents.forEach(async (doc) => {
            if (doc.get("email") === email) {
                const documentId = doc.id;
                await firestore.updateDocumentField(
                    `authorizations/${documentId}`,
                    "access_token",
                    access_token
                );
                return;
            }
        });

        return { props: { connected: true } };
    }

    return { props: { connected: false } };
}
