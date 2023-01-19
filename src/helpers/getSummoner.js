const getSummoner = async (invoker) => {
    try {
        console.log(process.env.REACT_APP_API_KEY)
        const API_URL = `https://br1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${invoker}?api_key=${process.env.REACT_APP_API_KEY}`;
        const response = await fetch(API_URL);
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
    }
}

export {getSummoner};