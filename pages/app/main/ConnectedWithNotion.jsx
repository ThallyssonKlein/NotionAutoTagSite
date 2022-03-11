/* eslint-disable react/react-in-jsx-scope */
import { useEffect, useState } from 'react';
import firebase from 'firebase/app';
import Input from '../../../components/Input';
import ConfirmButton from '../../../components/Buttons/ConfirmButton';
import RemoveButton from '../../../components/Buttons/RemoveButton';
import InputError from '../../../components/InputError';
import firestore from '../../../utils/firestore';

// needed to update arrays on firestore
// https://cloud.google.com/firestore/docs/manage-data/add-data#update_elements_in_an_array

export default function ConnectedWithNotion() {
  const [newTable, setNewTable] = useState('');
  const [tables, setTables] = useState([]);
  const [inputError, setInputError] = useState({
    error: false,
    message: null,
  });

  const db = firestore.connect();

  function extractEmailFromCookies() {
    const cookies = document.cookie;
    const email = cookies.match(/(?<=email=).+?(?=(?:; |$))/)[0];
    return email;
  }

  function extractDatabaseAndViewId() {
    const path = newTable.split('/')[3];
    const [databaseId, viewId] = path.split('?v=');

    return { databaseId, viewId };
  }

  async function saveUserDatabase() {
    const { databaseId } = extractDatabaseAndViewId();
    const documents = await db.collection('authorizations').get();

    documents.forEach(async (doc) => {
      if (doc.get('email') === extractEmailFromCookies()) {
        const documentId = doc.id;

        db.collection('authorizations')
          .doc(documentId)
          .update({
            collections_id:
                            firebase.firestore.FieldValue.arrayUnion(
                              databaseId,
                            ),
            filled: true,
          });
      }
    });

    setTables([...tables, databaseId]);
    setNewTable('');
  }

  function checkForDuplicatedTable() {
    const { databaseId } = extractDatabaseAndViewId();

    return tables.some((table) => table === databaseId);
  }

  function addTableToList() {
    // avoid adding an empty link
    if (newTable.length === 0) {
      setInputError({
        error: true,
        message: 'You cannot add empty links',
      });
      return;
    }

    if (checkForDuplicatedTable()) {
      setInputError({
        error: true,
        message: 'You cannot add previously added tables',
      });
      return;
    }

    setInputError({ error: false, message: null });
    saveUserDatabase();
  }

  async function removeTable(table) {
    const documents = await db.collection('authorizations').get();

    documents.forEach(async (doc) => {
      if (doc.get('email') === extractEmailFromCookies()) {
        const userDatabases = doc.get('collections_id');
        const documentId = doc.id;

        if (userDatabases.length === 1) {
          db.collection('authorizations')
            .doc(documentId)
            .update({ filled: false });
        }

        db.collection('authorizations')
          .doc(documentId)
          .update({
            collections_id:
                            firebase.firestore.FieldValue.arrayRemove(table),
          });
      }
    });

    const newTables = tables.filter((localTables) => localTables !== table);
    setTables(newTables);
  }

  useEffect(async () => {
    const documents = await db.collection('authorizations').get();

    documents.forEach(async (doc) => {
      if (doc.get('email') === extractEmailFromCookies()) {
        const userDatabases = doc.get('collections_id');

        // eslint-disable-next-line no-unused-expressions
        userDatabases?.length > 0
          ? setTables([...userDatabases])
          : setTables([]);
      }
    });
  }, []);

  return (
    <>
      <div className="container">
        <div className="message">
          <p>Almost done! Now you can start adding your tables:</p>
        </div>
        <div className="list-view">
          <div className="input-table-link">
            <Input
              type="text"
              value={newTable}
              setValue={setNewTable}
              placeholder="Paste your database link here"
            />
            <div className="empty-input-error">
              {inputError.error && (
                <InputError text={inputError.message} />
              )}
            </div>
          </div>
          <div className="add-table">
            {/* eslint-disable-next-line react/jsx-no-bind */}
            <ConfirmButton text="Add" setValue={addTableToList} />
          </div>
          <div className="tables-wrapper">
            <div>
              <h2>Tables we are working on:</h2>
            </div>
            <div>
              <ul className="tables">
                {tables
                                    && tables.map((table, index) => (
                                      // eslint-disable-next-line react/no-array-index-key
                                      <li className="table" key={index}>
                                        <p>
                                          Table:
                                          {' '}
                                          {index}
                                        </p>
                                        <RemoveButton
                                          onClick={() => removeTable(table)}
                                        />
                                      </li>
                                    ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="error-container" />
      </div>
      <style jsx>
        {`
                .message p {
                    color: var(--highlighted-font-color);
                    font-size: var(--content-text-font-size);
                    text-align: center;
                    margin-bottom: 10px;
                }
                .tables {
                    display: flex;
                    flex-direction: column;
                    row-gap: 1rem;
                }
                .table {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }
                .input-table-link {
                    margin-bottom: 10px;
                }
                .add-table {
                    margin:bottom: 10px;
                }
            `}

      </style>
    </>
  );
}
