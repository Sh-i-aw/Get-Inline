import './App.css';
import {useEffect, useState} from "react";
import FileLoader from "./Components/FileLoader";
import EnvVarSelect from "./Components/EnvVarSelect";

function App() {
    const [file, setFile] = useState(null);
    const [JSONtext, setJSONtext] = useState('');
    const [envList, setEnvList] = useState({});
    const [notice, setNotice] = useState(null);

    useEffect(() => {
        if (file) {
            let reader = new FileReader();
            if (file) {
                reader.onload = (e) => {
                    setJSONtext(e.target.result);
                }
                reader.readAsText(file);
            } else {
                setJSONtext("Apologies, Get-Inline currently only supports JSON files.");
            }
        }
    }, [file]);

    useEffect(() => {
        if (JSONtext) {
            const postmanRegex = /\{\{[^\{\}]+\}\}/g;
            const envVarListAll = JSONtext.match(postmanRegex);

            if (envVarListAll) {
                const envVarList = {};
                envVarListAll.forEach(envVar => {
                    if (!envVarList[envVar]) {
                        envVarList[envVar] = {
                            occurrence : 0,
                            replace : false,
                            replaceVal : ''
                        }
                    }
                    envVarList[envVar].occurrence += 1;
                })
                console.log(envVarList);
                setEnvList(envVarList);
                setNotice("");
            } else {
                setEnvList({});
                setNotice("No postman environment variable found in the current file.");
            }


        }
    },[JSONtext])


    function handleFileUpload(event) {
        setFile(event.target.files[0]);
        console.log(event.target.files[0]);
    }

    function toggleSingleCheck(envName) {
        const updatedList = {
            ...envList, // Step 1
            [envName]: {
                ...envList[envName], // Step 2
                replace: !envList[envName].replace // Step 3
            }
        };
        setEnvList(updatedList); // Step 4
    }

    return (
        <div className="App">
            <h1> load JSON here </h1>
            {/*<label htmlFor="fileSelect" className="sr-only"> choose a file to upload </label>*/}
            {/*the line above is only visible for screen readers*/}
            <FileLoader file={file} onFileChange={handleFileUpload}/>
                <hr/>
            <EnvVarSelect notice={notice} envList={envList} toggleCheck={toggleSingleCheck}></EnvVarSelect>
                <hr/>
            <textarea value={JSONtext} readOnly={true} style={{height: 800, width: 1000}}></textarea>

        </div>
    );
}

export default App;