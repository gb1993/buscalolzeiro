import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { IconContext } from 'react-icons';
import { MdOutlinePersonSearch } from 'react-icons/md';
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
  const searchIcon = useMemo(() => ({ className: 'search-icon' }), []);

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
    if (data.message && summonerName) {
      return data.message;
    }
    setSummonerInfo(data);
    getMatchesIds(data.puuid);
    return null;
  };

  useEffect(() => {
    const list = allMatches && allMatches.map((match) => {
      const mapName = maps.find((map) => map.queueId === match.queueId);
      const me = match.participants.find((i) => i.puuid === summonerInfo.puuid);
      return {
        id: match.gameId,
        gameDuration: Math.floor(match.gameDuration / 60),
        gameMode: mapName.description.slice(0, -5),
        me,
        participants: match.participants,
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
    <div className="search-container">
      <form>
        <input type="text" name="summoner" id="summoner" onChange={(e) => setsummonerName(e.target.value)} autoComplete="off" required />
        <button type="submit" onClick={getSummonerId}>
          <IconContext.Provider value={searchIcon}>
            <MdOutlinePersonSearch />
          </IconContext.Provider>
        </button>
      </form>
    </div>
  );
}

export default Index;
