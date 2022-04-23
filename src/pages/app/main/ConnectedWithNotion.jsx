/* eslint-disable react/react-in-jsx-scope */
import { useEffect, useState } from 'react';
import firebase from 'firebase/app';
import Cookies from 'universal-cookie';
import Input from '../../../components/Input';
import ConfirmButton from '../../../components/Buttons/ConfirmButton';
import RemoveButton from '../../../components/Buttons/RemoveButton';
import InputError from '../../../components/InputError';
import firestore from '../../../utils/firestore';
// needed to update arrays on firestore
// https://cloud.google.com/firestore/docs/manage-data/add-data#update_elements_in_an_array

export default function ConnectedWithNotion() {
  const cookies = new Cookies();
  const [newTable, setNewTable] = useState('');
  const [newTableName, setNewTableName] = useState('');
  const [tables, setTables] = useState([]);
  const [inputError, setInputError] = useState({
    error: false,
    message: null,
  });

  const db = firestore.connect();

  function extractDatabaseAndViewId() {
    const path = newTable.split('/')[4];
    const [databaseId, viewId] = path.split('?v=');

    return { databaseId, viewId };
  }

  async function saveUserDatabase() {
    const { databaseId } = extractDatabaseAndViewId();
    const documents = await db.collection('leads').get();

    documents.forEach(async (doc) => {
      if (doc.get('email') === cookies.get('email')) {
        const documentId = doc.id;

        db.collection('leads')
          .doc(documentId)
          .update({
            collections_id:
                            firebase.firestore.FieldValue.arrayUnion(
                              {
                                databaseId,
                                name: newTableName,
                              },
                            ),
            filled: true,
          });
      }
    });

    setTables([...tables, {
      name: newTableName,
      databaseId,
    }]);
    setNewTable('');
    setNewTableName('');
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

    if (newTableName.length === 0) {
      setInputError({
        error: true,
        message: 'You cannot add links without a name',
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
    const documents = await db.collection('leads').get();

    documents.forEach(async (doc) => {
      if (doc.get('email') === cookies.get('email')) {
        const userDatabases = doc.get('collections_id');
        const documentId = doc.id;

        if (userDatabases.length === 1) {
          db.collection('leads')
            .doc(documentId)
            .update({ filled: false });
        }

        db.collection('leads')
          .doc(documentId)
          .update({
            collections_id:
                            firebase.firestore.FieldValue.arrayRemove({
                              databaseId: table.databaseId,
                              name: table.name,
                            }),
          });
      }
    });

    const newTables = tables.filter((localTables) => localTables.databaseId !== table.databaseId);
    setTables(newTables);
  }

  useEffect(async () => {
    const documents = await db.collection('leads').get();

    documents.forEach(async (doc) => {
      if (doc.get('email') === cookies.get('email')) {
        const userDatabases = doc.get('collections_id');

        // eslint-disable-next-line no-unused-expressions
        userDatabases?.length > 0
          ? setTables([...userDatabases])
          : setTables([]);
      }
    });
  }, []);

  function onKeyPress({ key }) {
    return key === 'Enter' ? addTableToList() : null;
  }

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
              onKeyPress={onKeyPress}
            />
            <div className="second-input">
              <Input
                type="text"
                value={newTableName}
                setValue={setNewTableName}
                placeholder="What's the name of the database?"
                onKeyPress={onKeyPress}
              />
            </div>
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
                                    && tables.map((table) => (
                                      // eslint-disable-next-line react/no-array-index-key
                                      <li className="table" key={table.databaseId}>
                                        <p>
                                          Table:
                                          {' '}
                                          {table.name}
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
                    margin-bottom: 20px;
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
                    margin-bottom: 20px;
                }
                .add-table {
                    margin-bottom: 20px;
                }
                .second-input {
                    margin-top: 20px;
                    margin-bottom: 10px;
                }
            `}

      </style>
    </>
  );
}
