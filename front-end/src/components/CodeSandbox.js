import React from "react";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/theme-monokai";


const CodeSandbox = ({ submission, setSubmission } ) => {
        return (        
        <AceEditor
            mode="python"   
            theme="monokai"
            name="blah2"
            // onLoad={this.onLoad}
            onChange={ (e) => setSubmission(e) }     
            fontSize={14}
            width={ '100%'}
            showPrintMargin={false}
            showGutter={true}
            highlightActiveLine={true}
            value={submission}
            setOptions={{
                useWorker: false,
                enableBasicAutocompletion: false,
                enableLiveAutocompletion: false,
                enableSnippets: false,
                showLineNumbers: true,
                tabSize: 2,
            }}
        />
    );
}


export default CodeSandbox;