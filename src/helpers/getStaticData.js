const getMaps = async () => {
    try {
        const response = await fetch('https://static.developer.riotgames.com/docs/lol/queues.json');
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
    }
}

const getChampionIcon = (id) => {
    return `http://ddragon.leagueoflegends.com/cdn/13.1.1/img/champion/${id}.png)`;
}

const getProfileIcon = (id) => {
    return `http://ddragon.leagueoflegends.com/cdn/13.1.1/img/profileicon/${id}.png`
}

export {
    getMaps,
    getChampionIcon,
    getProfileIcon
}