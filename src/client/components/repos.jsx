import { useLoaderData } from "react-router-dom";

export function loader () {
    return fetch("/github/repo")
}

export default function Repos () {
    const repos = useLoaderData()

    return (
        <>
            <div>Repos</div>
            <div>{repos}</div>
            <ul>
            {repos.map(repo => {
                <li key={repo}>
                    {repo}
                </li>
            })}
            </ul>
        </>
    )
}
