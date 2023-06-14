import { Button } from "@mui/material";

export default function RoomInfo({ party }) {
  const handleEndSession = async () => {
    await fetch("/endsession");
  };
  return (
    <>
      <div>People in the room</div>
      <ul>
        {party?.people?.map((person) => {
          return <li>{person}</li>;
        })}
      </ul>
      <Button onClick={() => handleEndSession()}>End Session</Button>
    </>
  );
}
