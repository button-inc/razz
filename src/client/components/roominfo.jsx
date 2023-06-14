export default function RoomInfo({ party }) {
  return (
    <>
      <div>People in the room</div>
      <ul>
        {party?.people?.map((person) => {
          return <li>{person}</li>;
        })}
      </ul>
    </>
  );
}
