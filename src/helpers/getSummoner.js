const getSummoner = async (invoker) => {
const API_URL = `https://br1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${invoker}?api_key=RGAPI-a448daf8-000b-4bfc-ae5d-1b2a055e65de`;
    try {
        const response = await fetch(API_URL);
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
    }
}

export {getSummoner};