import './App.css';
import {useEffect, useState} from "react";
import FileLoader from "./Components/FileLoader";

function App() {
    const [file, setFile] = useState(null);
    const [JSONtext, setJSONtext] = useState('');

    useEffect(() => {
        if (file) {
            console.log(file);

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

    function handleFileUpload(event) {
        setFile(event.target.files[0]);
        console.log(event.target.files[0]);
    }

    return (
        <div className="App">
            <h1> load JSON here </h1>
            {/*<label htmlFor="fileSelect" className="sr-only"> choose a file to upload </label>*/}
            {/*the line above is only visible for screen readers*/}
            <FileLoader file={file} onFileChange={handleFileUpload} />
            <textarea value={JSONtext} readOnly={true} style={{height:800, width:1000}}></textarea>
        </div>
    );
}

export default App;