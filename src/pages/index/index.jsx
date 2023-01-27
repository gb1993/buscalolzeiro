import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getSummoner, getMatches, getMatchesLogs } from '../../helpers';
import { getMaps } from '../../helpers/getStaticData';
import './index.css';

function Index() {
  const [maps, setMaps] = useState();
  const [summonerName, setsummonerName] = useState();
  const [summonerInfo, setSummonerInfo] = useState();
  const [allMatches, setAllMatches] = useState();
  const [listObject, setListObject] = useState();
  const navigate = useNavigate();

  const getAllMaps = async () => {
    const allmaps = await getMaps();
    setMaps(allmaps);
  };

  useEffect(() => {
    getAllMaps();
  }, []);

  const getMatchesLog = async (matchesIds) => {
    if (matchesIds.message) {
      return matchesIds.message;
    }
    const matches = await getMatchesLogs(matchesIds);
    setAllMatches(matches);
    return null;
  };

  const getMatchesIds = async (summonerId) => {
    const matchesIds = await getMatches(summonerId);
    getMatchesLog(matchesIds);
  };

  const getSummonerId = async (e) => {
    e.preventDefault();
    const data = await getSummoner(summonerName);
    if (data.message) {
      return data.message;
    }
    setSummonerInfo(data);
    getMatchesIds(data.puuid);
    return null;
  };

  useEffect(() => {
    const list = allMatches && allMatches.map((match) => {
      const iAmWinner = match.participants.find(
        (winner) => winner.win === true && winner.puuid === summonerInfo.puuid,
      );
      const mapName = maps.find((map) => map.queueId === match.queueId);
      const myChampion = match.participants.find((me) => me.puuid === summonerInfo.puuid);
      return {
        id: match.gameId,
        gameDuration: Math.floor(match.gameDuration / 60),
        gameMode: mapName.description.slice(0, -5),
        myChampion: myChampion.championName,
        iAmWinner: iAmWinner !== undefined ? 'bg-lightblue' : 'bg-lightred',
      };
    });
    setListObject(list);
  }, [allMatches]);

  const checkList = () => {
    if (listObject !== undefined) navigate('/user-profile', { state: { profileData: listObject, summonerInfo } });
    return null;
  };

  useEffect(() => {
    checkList();
  }, [listObject]);

  return (
    <form>
      <input type="text" name="summoner" id="summoner" onChange={(e) => setsummonerName(e.target.value)} />
      <button type="submit" onClick={getSummonerId}>Buscar</button>
    </form>
  );
}

export default Index;
