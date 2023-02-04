const getMaps = async () => {
  try {
    const response = await fetch('https://static.developer.riotgames.com/docs/lol/queues.json');
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getChampionIcon = (name) => `http://ddragon.leagueoflegends.com/cdn/13.1.1/img/champion/${name}.png`;

const getProfileIcon = (id) => `http://ddragon.leagueoflegends.com/cdn/13.1.1/img/profileicon/${id}.png`;

const getItemIcon = (id) => (id === 0 ? undefined : `http://ddragon.leagueoflegends.com/cdn/13.1.1/img/item/${id}.png`);

const addDot = (n) => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');

export {
  getMaps,
  getChampionIcon,
  getProfileIcon,
  getItemIcon,
  addDot,
};
