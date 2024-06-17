
export default function EnvVarSelect (props) {
    return (
        <div id="envVarSelect">
            { props.notice === "" ?
                (<table>
                    <thead>
                    <tr>
                        <th><input type="checkbox"/></th>
                        <th>Env Var Name</th>
                        <th># of Occurrence</th>
                        <th>Replacement Value</th>
                    </tr>
                    </thead>
                    <tbody>
                    {Object.entries(props.envList).map(([envName, details]) => (
                        <tr>
                            <td>
                                <input
                                    type="checkbox"
                                    checked={details.replace}
                                    onChange={(event) => props.toggleCheck(envName, event.target.checked)}
                                />
                            </td>
                            <td>{envName}</td>
                            <td>{details.occurrence}</td>
                            <td>
                                <input
                                    type="text"
                                    value={details.replaceVal}
                                    onChange={ (event) => props.handleInput(envName, event.target.value)}
                                />
                            </td>
                        </tr>))}
                    </tbody>
                </table>)
                : props.notice
            }
        </div>)
}