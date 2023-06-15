import { Button } from "@mui/material";

export default function RoomInfo({ party }) {
  const handleEndSession = async () => {
    await fetch("/endsession");
  };
  return (
    <>
      <h2>People in the room</h2>
      <ul>
        {party?.map((person) => {
          return <li className="list-item-party-info">{person.name}</li>;
        })}
      </ul>
      <Button className="m-button" onClick={() => handleEndSession()}>
        End Session
      </Button>
    </>
  );
}
