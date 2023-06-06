import React, { useEffect, useState } from 'react';

export default function PlanningParty () {
  const [donation, setDonation] = useState({ user: 0, vote: 0 });

  useEffect(() => {
    const source = new EventSource(`http://localhost:3000/party`);

    source.addEventListener('open', () => {
      console.log('SSE opened!');
    });

    source.addEventListener('message', (e) => {
      console.log(e.data);
      const data = JSON.parse(e.data);

      setDonation(data);
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
        body: JSON.stringify({vote: 1})
    })

  };


  return (
    <div>
      <h1>Vote status</h1>
      <hr/>
      <h3>Total amount: {donation.vote}</h3>
      <h3>Total user: {donation.user}</h3>
      <button onClick={() => handleClick()}>Donate</button>
    </div>
  );
}
