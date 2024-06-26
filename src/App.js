import './App.css';
import {useEffect, useState} from "react";
import FileLoader from "./Components/FileLoader";
import EnvVarSelect from "./Components/EnvVarSelect";

function App() {
    const [file, setFile] = useState(null);
    const [originalJSON, setOriginalJSON] = useState('');
    const [updatedJSON, setUpdatedJSON] = useState('')

    const [envList, setEnvList] = useState({});
    const [notice, setNotice] = useState(" ");

    useEffect(() => {
        if (file) {
            let reader = new FileReader();
            if (file) {
                reader.onload = (e) => {
                    setOriginalJSON(e.target.result);
                    setUpdatedJSON(e.target.result);
                }
                reader.readAsText(file);
            } else {
                setOriginalJSON("Apologies, Get-Inline currently only supports JSON files.");
            }
        }
    }, [file]);

    useEffect(() => {
        if (originalJSON) {
            const postmanRegex = /\{\{[^\{\}]+\}\}/g;
            const envVarListAll = originalJSON.match(postmanRegex);

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
                setEnvList(envVarList);
                setNotice("");
            } else {
                setEnvList({});
                setNotice("No postman environment variable found in the current file.");
            }


        }
    },[originalJSON])

    function handleFileUpload(event) {
        setFile(event.target.files[0]);
        console.log(event.target.files[0]);
    }

    function toggleSingleCheck(envName, isChecked) {
        const newEnvList = {
            ...envList,
            [envName]: {
                ...envList[envName],
                replace: isChecked
            }
        };
        console.log(newEnvList[envName].replace);
        setEnvList(newEnvList);
    }

    function toggleAllCheck(isChecked) {
        const newEnvList = Object.entries(envList).reduce((varName,[key, details]) => {
                varName[key] = {...details, replace:isChecked};
                console.log(`${key} checked status is ${varName[key].replace}`);
                return varName;
        }, {})
        setEnvList(newEnvList);
    }

    function updateReplaceVal(envName, newReplaceVal) {
        const newEnvList = {
            ...envList,
            [envName]: {
                ...envList[envName],
                replaceVal: newReplaceVal
            }
        };
        setEnvList(newEnvList);
    }

    function inlineVars () {
        let inlinedJSON = originalJSON;
        Object.keys(envList)
            .filter(varName=>envList[varName].replace)
            .forEach(varName => {
                    const varRegex = new RegExp(`\{\{${varName.slice(2, -2)}\}\}`, 'g');
                    inlinedJSON = inlinedJSON.replaceAll(varRegex, envList[varName].replaceVal);
                }
            )
        setUpdatedJSON(inlinedJSON);
    }

    function downloadJSON() {
        const blob = new Blob([updatedJSON], {type : "application/json"});

        const downloadURL = URL.createObjectURL(blob);
        const downloadLink = document.createElement('a');
        downloadLink.href = downloadURL;

        downloadLink.download = `inlined-${file.name}.json`;

        document.body.appendChild(downloadLink);
        downloadLink.click(); // trigger the download
        document.body.removeChild(downloadLink);
        URL.revokeObjectURL(downloadURL);
    }


    return (
        <div className="App">
            <h1> Get Inline! </h1>
            <p> ( If you are a PostMan environment variable, that is. ) </p>
            <hr/>
            {/*<label htmlFor="fileSelect" className="sr-only"> choose a file to upload </label>*/}
            {/*the line above is only visible for screen readers*/}
            <FileLoader file={file} onFileChange={handleFileUpload}/>
                <hr/>
            <EnvVarSelect notice={notice} envList={envList} toggleCheck={toggleSingleCheck} toggleAllCheck={toggleAllCheck} handleInput={updateReplaceVal}></EnvVarSelect>
            { ! notice ?
                (<div className="submitArea">
                    <button onClick={inlineVars}> Get them inline :)</button>
                    <button onClick={downloadJSON}> Download File</button>
                </div>) : ""
            }
            <hr/>
            <textarea id="filePreview" value={updatedJSON} readOnly={true}
                      style={{height: 800, width: 1000}}></textarea>

        </div>
    );
}

export default App;