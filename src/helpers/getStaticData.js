const getMaps = async () => {
  try {
    const response = await fetch('https://static.developer.riotgames.com/docs/lol/queues.json');
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getChampionIcon = (id) => `http://ddragon.leagueoflegends.com/cdn/13.1.1/img/champion/${id}.png)`;

const getProfileIcon = (id) => `http://ddragon.leagueoflegends.com/cdn/13.1.1/img/profileicon/${id}.png`;

export {
  getMaps,
  getChampionIcon,
  getProfileIcon,
};
