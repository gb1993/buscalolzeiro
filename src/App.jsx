import React, { useState } from "react";
import { getSummoner, getMatches, getMatchesLogs } from "./helpers/getData";
import './global.css';
import { useEffect } from "react";

function App() {
  const [summonerName, setsummonerName] = useState();
  const [hasSummoner, setHasSummoner] = useState({message: '', display: 'none'});
  const [allMatches, setAllMatches] = useState();
  const [listObject, setListObject] = useState();
  const [puuid, setPuuid] = useState();

  const getSummonerId = async (e) => {
    e.preventDefault();
    const data = await getSummoner(summonerName);
    if (data.message) setHasSummoner({message: data.message, display: 'block'});
    setPuuid(data.puuid);
    getMatchesIds(data.puuid);
  }

  const getMatchesIds = async (summonerId) => {
    const matchesIds = await getMatches(summonerId);
    if (matchesIds.message) setHasSummoner({message: matchesIds.message, display: 'block'});
    getMatchesLog(matchesIds);
  }

  const getMatchesLog = async (matchesIds) => {
    const matches = await getMatchesLogs(matchesIds);
    setAllMatches(matches);
  }

  useEffect(() => {
    const list = allMatches && allMatches.map((match) => {
      const iAmWinner = match.participants.find((winner) => winner.win === true && winner.puuid === puuid);
      return {
        id: match.gameId,
        gameDuration: Math.floor(match.gameDuration / 60),
        gameMode: match.gameMode,
        myName: summonerName,
        iAmWinner: iAmWinner !== undefined ? 'green' : 'red',
      }
    });
    setListObject(list);
  },[allMatches])

  return (
    <div>
      <div style={{ width: 200, display: hasSummoner.display, background: 'red' }}>
        <span>{hasSummoner.message}</span>
      </div>
      <form>
        <input type="text" name="summoner" id="summoner" onChange={ (e) => setsummonerName(e.target.value)} />
        <button type="submit" onClick={getSummonerId}>Buscar</button>
      </form>
      <ul style={{margin: '20px'}}>
        {listObject && listObject.map((match) => (
          <li key={match.gameId} style={{background: match.iAmWinner, margin: '20px', borderRadius: '5px'}}>
            <p>{match.gameDuration}</p>
            <p>{match.gameMode}</p>
            <p>{match.myName}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
