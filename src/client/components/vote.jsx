const URL = import.meta.env.BASE_URL + "submitvote";

const votingOptions = [
  "0",
  "1",
  "3",
  "5",
  "8",
  "13",
  "21",
  "34",
  "?",
  "coffee",
];

const getVotingButtons = () => {
  const votingButtons = [];

  {
    votingOptions.forEach((value) => {
      votingButtons.push(
        <input type="radio" id={`${value}`} name="vote" value={`${value}`} />
      );

      votingButtons.push(<label for={`${value}`}>{`${value}`}</label>);
    });
  }
  return votingButtons;
};

export default function Vote() {
  return (
    <form action={URL}>
      <p>Vote on this issue</p>
      {getVotingButtons()}
      <br />
      <input type="submit" value="Submit" />
    </form>
  );
}
