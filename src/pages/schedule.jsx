import React, { useState, useEffect } from "react";

const leagueMacthdays = {
  PL: 38, 
  PD: 38, 
  BL1: 34,
  SA: 38, 
};

async function fetchMatches(league, matchday) {
  const apiToken = '98a87a7b443e41d79117e96b67fd872b';
  const proxyUrl = 'https://corsproxy.io/?';
  const targetUrl = `http://api.football-data.org/v4/competitions/${league}/matches?matchday=${matchday}`;
  
  const response = await fetch(proxyUrl + encodeURIComponent(targetUrl), {
    headers: {
      "X-Auth-Token": apiToken
    }
  });
  const data = await response.json();
  return data.matches;
}

export default function Main() {
  const [matches, setMatches] = useState([]);
  const [league, setLeague] = useState("PL");
  const [matchday, setMatchday] = useState("1");

  const displayMatchInfo = (match) => {
    if (match.status === "FINISHED") {
      return `${match.score.fullTime.home} - ${match.score.fullTime.away}`;
    }
    const japanTime = new Date(match.utcDate).toLocaleString('ja-JP', {
      timeZone: 'Asia/Tokyo',
    });
    return japanTime;
  };

  useEffect(() => {
    (async () => {
      const data = await fetchMatches(league, matchday);
      setMatches(data)
    })();
  }, [league, matchday]); 

  return (
    <main>
      <form id="league-selector"
        onChange={async (event) => {
          const newLeague = event.target.value;
          setLeague(newLeague);
        }}>
        <input type="radio" name="league" value="PL" defaultChecked/> Premier League
        <input type="radio" name="league" value="PD" /> La Liga
        <input type="radio" name="league" value="BL1" /> Bundesliga
        <input type="radio" name="league" value="SA" /> Serie A
      </form>

      <select id="matchday-selector"
        value={matchday}
        onChange={async (event) => {
          const newMatchday = event.target.value;
          setMatchday(newMatchday);
        }}>
        {[...Array(leagueMacthdays[league])].map((_, index) => (
          <option key={index} value={index+1}>Matchweek {index+1}</option>
        ))}
      </select>

      <table border={3} align="center">
        <thead>
          <tr>
            <th></th>
            <th>Home Team</th>
            <th colSpan="3"></th>
            <th>Away Team</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {matches.map((match, index) => (
            <tr key={index}>
              <td><img src={match.homeTeam.crest} alt="" width="100" height="100"/></td>
              <td width="250" align="center">{match.homeTeam.name}</td>
              <td colSpan="3" width="100" align="center">{displayMatchInfo(match)}</td>
              <td width="250" align="center">{match.awayTeam.name}</td>
              <td><img src={match.awayTeam.crest} alt="" width="100" height="100"/></td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}