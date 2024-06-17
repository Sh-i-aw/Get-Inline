
export default function EnvVarSelect (props) {
    return (
        <div id="envVarSelect">
            {! props.notice ?
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
                                    onChange={() => props.toggleCheck(envName)}
                                />
                            </td>
                            <td>{envName}</td>
                            <td>{details.occurrence}</td>
                            <td>
                                <input
                                    type="text"
                                    value={details.replaceVal}

                                />
                            </td>
                        </tr>))}
                    </tbody>
                </table>)
                : props.notice
            }
        </div>)

}


{/*<ul>*/}
{/*    {!props.notice ? Object.entries(props.envList).map(([envName, details], index) => (*/}
{/*        <li key={index}>{envName} : {details.occurrence}</li>))*/}
{/*    : props.notice}*/}
{/*</ul>*/}