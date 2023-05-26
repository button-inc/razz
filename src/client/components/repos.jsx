import { useLoaderData } from "react-router-dom";

export function loader () {
    console.log('repos loader')
    return fetch("/github/repo")
}

export default function Repos () {
    const repos = useLoaderData()
    console.log(repos?.length)
    console.log(repos)

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
