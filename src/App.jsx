import React, { useState, useEffect } from "react";
import { getSummoner, getMatches, getMatchesLogs, getMaps } from "./helpers/getData";
import './global.css';

const App = () => {
  const [summonerName, setsummonerName] = useState();
  const [hasSummoner, setHasSummoner] = useState({message: '', display: 'none'});
  const [allMatches, setAllMatches] = useState();
  const [listObject, setListObject] = useState();
  const [summonerInfo, setSummonerInfo] = useState();


  const getSummonerId = async (e) => {
    e.preventDefault();
    const data = await getSummoner(summonerName);
    if (data.message) setHasSummoner({message: data.message, display: 'block'});
    setSummonerInfo(data);
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
      const iAmWinner = match.participants.find((winner) => winner.win === true && winner.puuid === summonerInfo.puuid);
      const mapName = maps.find((map) => map.queueId === match.queueId);
      const myChampion = match.participants.find((me) => me.puuid === summonerInfo.puuid)
      return {
        id: match.gameId,
        gameDuration: Math.floor(match.gameDuration / 60),
        gameMode: mapName.description.slice(0, -5),
        myChampion: myChampion.championName,
        iAmWinner: iAmWinner !== undefined ? 'green' : 'red',
      }
    });
    setListObject(list);
  },[allMatches])

  return (
    
    <div>
      <form>
        <input type="text" name="summoner" id="summoner" onChange={ (e) => setsummonerName(e.target.value)} />
        <button type="submit" onClick={getSummonerId}>Buscar</button>
      </form>
      <div>
        {summonerInfo ?
          <div>
            <img src={`http://ddragon.leagueoflegends.com/cdn/13.1.1/img/profileicon/${summonerInfo.profileIconId}.png`} alt="Profile icon" />
            <p>{summonerInfo.name}</p>
            <p>{summonerInfo.summonerLevel}</p>
          </div>
          : ''
        }
        <ul style={{margin: '20px'}}>
          <div style={{ width: 200, display: hasSummoner.display, background: 'red' }}>
            <span>{hasSummoner.message}</span>
          </div>
          {listObject && listObject.map((match, i) => (
            <li key={match.id} style={{background: match.iAmWinner, margin: '20px', borderRadius: '5px'}}>
              <p>{match.gameDuration} Minutos</p>
              <p>{match.gameMode}</p>
              <img src={`http://ddragon.leagueoflegends.com/cdn/13.1.1/img/champion/${match.myChampion}.png`} />
            </li>
          ))}
        </ul>
      </div>
      
    </div>
  );
}

export default App;
