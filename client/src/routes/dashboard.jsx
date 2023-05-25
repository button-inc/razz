import Navbar from "../components/navbar";

export default function Dashboard() {

    const getRepos = async () => {
        const response = await fetch("http://localhost:3001/github/repo", {
            method: "GET",
        })
        const data = await response.json()

        console.log(data)
    }

    return (
      <>
        <Navbar />
        <div> Dashboard </div>
        <button onClick={() => getRepos()}>Github Repos</button>
      </>
    );
}
