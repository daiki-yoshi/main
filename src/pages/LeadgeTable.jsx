import React, { useState, useEffect } from "react";

async function fetchTable(league) {
  const apiToken = '98a87a7b443e41d79117e96b67fd872b'; 
  const proxyUrl = 'https://corsproxy.io/?';
  const targetUrl = `https://api.football-data.org/v4/competitions/${league}/standings`;

  const response = await fetch(proxyUrl + encodeURIComponent(targetUrl), {
    headers: {
      "X-Auth-Token": apiToken
    }
  });
  const data = await response.json();
  return data.standings[0].table; 
}

export default function Main() {
  const [standing, setStanding] = useState([]);

  useEffect(() => {
    (async () => {
      const data = await fetchTable("PL");
      setStanding(data);
    })();
  }, []); 

  return (
    <main>
      <form id="league-selector"
        onChange={async (event) => {
          const newLeague = event.target.value;
          const data = await fetchTable(newLeague);
          setStanding(data);
        }}>
        <input type="radio" name="league" value="PL" defaultChecked/> Premier League
        <input type="radio" name="league" value="PD" /> La Liga
        <input type="radio" name="league" value="BL1" /> Bundesliga
        <input type="radio" name="league" value="SA" /> Serie A
      </form>

      <table border={3} align="center">
        <thead>
          <tr>
            <th>position</th>
            <th></th>
            <th>teamName</th>
            <th>playedGames</th>
            <th>won</th>
            <th>draw</th>
            <th>lost</th>
            <th>point</th>
          </tr>
        </thead>
        <tbody>
          {standing.map((standing, index) => (
            <tr key={index}>
              <td width="50" align="center">{standing.position}</td>
              <td><img src={standing.team.crest} width="100" height="100" /> </td>
              <td width="250" align="center">{standing.team.name}</td>
              <td align="center">{standing.playedGames}</td>
              <td width="50" align="center">{standing.won}</td>
              <td width="50" align="center">{standing.draw}</td>
              <td width="50" align="center">{standing.lost}</td>              
              <td width="50" align="center">{standing.points}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}