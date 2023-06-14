export default function VoteInfo({ party }) {
  const getUserVotes = () => {
    const userVotes = [];

    Object.entries(party.votes).forEach(([key, value]) => {
      userVotes.push(
        <li>
          {key} : {value}
        </li>
      );
    });
    return userVotes;
  };

  return (
    <>
      <div>Votes</div>
      <ul>{party?.votes && getUserVotes()}</ul>
    </>
  );
}
