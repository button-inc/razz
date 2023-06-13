export default function RoomInfo({ room }) {
  //   console.log(room.host);
  //   console.log(room.people);
  //   room.people.map((person) => console.log(person));

  return (
    <>
      {/* <div>party host</div>
      <div>{room.host}</div> */}
      <div>People in the room</div>
      <ul>
        {room.people.map((person) => {
          return <li>{person}</li>;
        })}
      </ul>
    </>
  );
}
