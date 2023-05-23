import { useLoaderData } from "react-router-dom"

export async function loader({ params }) {
    console.log(params)
    // const issues = await getRepoIssues(params.repoName)
    return { params }
}

export default function Plan() {
    const { issues } = useLoaderData();

    return (
        <>
            <div>
                plan
            </div>
        </>
    )
}


// List issues in a repository. Only open issues will be listed.
// https://api.github.com/repos/OWNER/REPO/issues
// OWNER The account owner of the repository. The name is not case sensitive.
// REPO The name of the repository. The name is not case sensitive.
async function getRepoIssues (owner, repo, token) {
    // Lists repositories that the authenticated user has explicit permission (:read, :write, or :admin) to access.
    const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/issues`, {
        method: "GET",
        headers: {
            "Accept": "application/vnd.github+json",
            "Authorization": `Bearer ${token}`,
            "X-GitHub-Api-Version": "2022-11-28",
        }
    })
    return response.json();
}
