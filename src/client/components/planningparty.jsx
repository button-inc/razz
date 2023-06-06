import React, { useEffect, useState } from 'react';

export default function PlanningParty () {
  const [party, setParty] = useState();

  useEffect(() => {
    const source = new EventSource(`/party`);

    source.addEventListener('open', () => {
      console.log('SSE opened!');
    });

    source.addEventListener('message', (e) => {
      console.log(e.data);
      const data = JSON.parse(e.data);

      setParty(data);
    });

    source.addEventListener('error', (e) => {
      console.error('Error: ',  e);
    });

    return () => {
      source.close();
    };
  }, []);

  const handleClick = async () => {

    await fetch(`/vote`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({user: 'tom', vote: 1})
    })
  };

  console.log(party)

  return (
    <div>
      <h1>Planning Party</h1>
      <hr/>
      {/* <h3>{party}</h3> */}
      <button onClick={() => handleClick()}>Vote</button>
    </div>
  );
}
