const getSummoner = async (summonerName) => {
    try {
        const API_URL = `https://br1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summonerName}?api_key=${process.env.REACT_APP_API_KEY}`;
        const response = await fetch(API_URL);
        const data = await response.json();
        return data;
    } catch (error) {
        return {error, message: 'Incovador não foi encontrado.'};
    }
}

const getMatches = async (summonerId) => {
    try {
        const API_URL = `https://americas.api.riotgames.com/lol/match/v5/matches/by-puuid/${summonerId}/ids?start=0&api_key=${process.env.REACT_APP_API_KEY}`;
        const response = await fetch(API_URL);
        const data = await response.json();
        return data;
    } catch (error) {
        return {error, message: 'Histórico de partidas não foi encontrado.'};
    }
}

const getMatchesLogs = async (matchesIds) => {
    const promises = matchesIds.map(async (match) => {
        const API_URL = `https://americas.api.riotgames.com/lol/match/v5/matches/${match}?api_key=${process.env.REACT_APP_API_KEY}`;
        const response = await fetch(API_URL);
        const data = await response.json();
        return data.info;
    });
    return await Promise.all(promises);
}

export {
    getSummoner,
    getMatches,
    getMatchesLogs
};