import { useReducer, useEffect, useState } from "react";
import { projectFirestore, timestamp } from "../firebase/config";

// when we make some kind of request to add a new document,
//  when Firestorm sends back a response on
// that response object is the document that we've just created.
let initialState = {
  document: null,
  isPending: false,
  error: null,
  success: null,
};

const firestoreReducer = (state, action) => {
  switch (action.type) {
    case "IS_PENDING":
      return { isPending: true, document: null, error: null, success: false };
    case "ADDED_DOCUMENT":
      return {
        isPending: false,
        document: action.payload,
        success: true,
        error: null,
      };
    case "DELETED_DOCUMENT":
      return {
        isPending: false,
        document: null,
        success: true,
        error: null,
      };
    case "ERROR":
      return {
        ...state,
        isPending: false,
        success: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const useFirestore = (collection) => {
  //dispatch only to update state
  const [response, dispatch] = useReducer(firestoreReducer, initialState);
  const [isCancelled, setIsCancelled] = useState(false);

  //get reference of document from firestore
  const ref = projectFirestore.collection(collection);

  // only dispatch if not canceled
  const dispatchIfNotCanceled = (action) => {
    if (!isCancelled) {
      dispatch(action);
    }
  };

  //add a document to firestore
  const addDocument = async (doc) => {
    dispatch({ type: "IS_PENDING" });

    try {
      const createdAt = timestamp.fromDate(new Date());
      const addedDocument = await ref.add({ ...doc, createdAt: createdAt });
      dispatchIfNotCanceled({ type: "ADDED_DOCUMENT", payload: addedDocument });
    } catch (error) {
      dispatchIfNotCanceled({ type: "ERROR", payload: error.message });
    }
  };

  //delete document from firestore
  const deleteDocument = async (id) => {
    dispatch({ type: "IS_PENDING" });

    try {
      await ref.doc(id).delete();
      dispatchIfNotCanceled({
        type: " DELETED_DOCUMENT"
      });
    } catch (error) {
      dispatchIfNotCanceled({ type: "ERROR", payload: 'could not delete document' });
    }
  };

  //cleanup function -> in case unmounted component not yet finished
  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);

  return { addDocument, deleteDocument, response };
};
