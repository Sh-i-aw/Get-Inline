import './App.css';
import {useEffect, useState} from "react";
import FileLoader from "./Components/FileLoader";

function App() {
    const [file, setFile] = useState(null);
    const [JSONtext, setJSONtext] = useState('');
    const [envList, setEnvList] = useState({});

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

            const envVarList = {};

            envVarListAll.forEach(envVar => {
                envVarList[envVar] = (envVarList[envVar] || 0) + 1;
            })

            setEnvList(envVarList);
        }
    },[JSONtext])

    function handleFileUpload(event) {
        setFile(event.target.files[0]);
        console.log(event.target.files[0]);
    }

    return (
        <div className="App">
            <h1> load JSON here </h1>
            {/*<label htmlFor="fileSelect" className="sr-only"> choose a file to upload </label>*/}
            {/*the line above is only visible for screen readers*/}
            <FileLoader file={file} onFileChange={handleFileUpload}/>
            <hr/>
            <ul>
                {envList && Object.entries(envList).map(([envName, occurence], index) =>(<li key={index}>{envName} : {occurence}</li>))}
            </ul>
            <hr/>
            <textarea value={JSONtext} readOnly={true} style={{height: 800, width: 1000}}></textarea>

        </div>
    );
}

export default App;