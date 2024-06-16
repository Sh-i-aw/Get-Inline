
export default function EnvVarSelect (props) {
    return (
        <div id="envVarSelect">
            <ul>
                {!props.notice ? Object.entries(props.envList).map(([envName, occurence], index) => (
                        <li key={index}>{envName} : {occurence}</li>))
                    : props.notice}
            </ul>
        </div>
    )
}
