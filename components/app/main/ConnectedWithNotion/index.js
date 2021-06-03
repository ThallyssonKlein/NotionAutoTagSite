import { useCallback, useEffect, useState } from "react";
import Input from "../../../shared/Input";
import ConfirmButton from "../../../shared/Buttons/ConfirmButton";
import InputError from "../../../shared/InputError";

export default function ConnectedWithNotion() {
    const [link, setLink] = useState("");
    const [tables, setTables] = useState([]);
    const [emptyInputError, setEmptyInputError] = useState(false);

    function extractDatabaseAndViewId() {
        const path = link.split("/")[3];
        const [databaseId, viewId] = path.split("?v=");
        setLink("");
    }

    function addTableToList() {
        // avoid adding an empty link
        if (link.length === 0) {
            setEmptyInputError(true);
            return;
        }

        setTables([...tables, link]);
        extractDatabaseAndViewId();
    }

    async function getDatabaseInfo() {
        const database = await (
            await fetch(`https://api.notion.com/v1/databases/${link}`, {
                method: "GET",
            })
        ).json();
    }

    return (
        <>
            <div className="container">
                <div className="message">
                    <p>Almost done! Now you can start add your tables:</p>
                </div>
                <div className="list-view">
                    <div className="input-table-link">
                        <Input
                            type="text"
                            value={link}
                            setValue={setLink}
                            placeholder="Paste the link of your table here"
                        />
                        <div className="empty-input-error">
                            {emptyInputError && (
                                <InputError text="Please, paste a link before adding a table" />
                            )}
                        </div>
                    </div>
                    <div className="add-table">
                        <ConfirmButton text="Add" setValue={addTableToList} />
                    </div>
                    <div className="tables-wrapper">
                        <div>
                            <h2>Tables we are working on:</h2>
                        </div>
                        <div className="tables">
                            <ul>
                                {tables.map((table) => (
                                    <li>{table}</li>
                                ))}
                                <li></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="error-container"></div>
            </div>
            <style jsx>{`
                .message p {
                    color: var(--highlighted-font-color);
                    font-size: var(--content-text-font-size);
                    text-align: center;
                }
                .tables {
                }
            `}</style>
        </>
    );
}
