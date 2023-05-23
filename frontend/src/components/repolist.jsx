

export default function ReposList({ repos }) {
    // make this clickable and render issues

    // onclick sends repo string to getRepoIssues as OWNER/REPO in the fetch url
    return repos.map((repo) => <li>{repo}</li>)

}
