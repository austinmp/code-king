import React, { useCallback, useState } from 'react';
import { useHistory } from 'react-router-dom';

// A context will be the way that we allow components lower down 
// the tree to trigger the display of an error page
const APIErrorContext = React.createContext({
    error: null,
    addError: () => {},
    removeError: () => {}
});

function APIErrorProvider({ children }) {
    const [error, setError] = useState(null);
    const removeError = () => setError(null);
    const addError = (message, status) => setError({ message, status });
    const contextPayload = {
        error,
        addError:  useCallback((message, status) => addError(message, status), []),
        removeError: useCallback(() => removeError(), [])
    };

    return (
        <APIErrorContext.Provider value={contextPayload}>
            {children}
        </APIErrorContext.Provider>

    );
}


// function ErrorHandler ({children}) {
//     const history = useHistory();
//     const [errorStatusCode, setErrorStatusCode] = React.useState();

//     // Make sure to "remove" this status code whenever the user 
//     // navigates to a new URL. If we didn't do that, then the user
//     // would be "trapped" into error pages forever
//     React.useEffect(() => {
//         // Listen for changes to the current location.
//         const unlisten = history.listen(() => setErrorStatusCode(undefined));
//         // cleanup the listener on unmount
//         return unlisten;
//       }, []);

//     // This is what the component will render. If it has an 
//     // errorStatusCode that matches an API error, it will only render
//     // an error page. If there is no error status, then it will render
//     // the children as normal

//     const renderContent = () => {
//         if (errorStatusCode === 404) {
//         //   return <Page404 />
//         }

//         // ... more HTTP codes handled here

//         return children;
//     };

//     // We wrap it in a useMemo for performance reasons. More here:
//     // https://kentcdodds.com/blog/how-to-optimize-your-context-value/
//     const contextPayload = React.useMemo( () => ({ setErrorStatusCode }), [setErrorStatusCode]);

//     return (
//         <ErrorStatusContext.Provider value={contextPayload}>
//             {renderContent()}
//         </ErrorStatusContext.Provider>

//     )
// }


export { APIErrorContext, APIErrorProvider };