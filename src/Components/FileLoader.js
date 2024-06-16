
export default function FileLoader (props) {
    const {file, onFileChange} = props
    return (
        <div id="fileLoader">
            <input id="fileSelect" type="file" accept=".json" onChange={onFileChange}/>
            {file && (
                <section>
                    File details:
                    <ul>
                        <li>Name: {file.name}</li>
                        <li>Type: {file.type}</li>
                        <li>Size: {file.size} bytes</li>
                    </ul>
                </section>
            )}
        </div>
    )
}

