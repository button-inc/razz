import Navbar from "../components/navbar";

export default function Dashboard() {
  const getRepos = async () => {
    const response = await fetch("/github/repo", {
      method: "GET",
    });
    const data = await response.json();
    console.log(data);
  };

  return (
    <>
      <Navbar />
      <div> Dashboard </div>
      <button onClick={() => getRepos()}>Github Repos</button>
    </>
  );
}
