import { useLocation } from "react-router-dom";
import { getChampionIcon, getProfileIcon } from '../../helpers/getStaticData';
import './userprofile.css';

const UserProfile = () => {
    const { state } = useLocation();

    return (
        <div className="profile-container">
            <div className="profile-user-container">
                <div className="profile-icon-container">
                    <img src={getProfileIcon(state.summonerInfo.profileIconId)} alt='user icon' />
                    <p>{state.summonerInfo.summonerLevel}</p>
                </div>
                <div>
                    <h3>{state.summonerInfo.name}</h3>
                    <button>Atualizar Dados</button>
                </div>
            </div>
            <ul>
                {state.profileData.map((match) => (
                    <li key={match.id} style={{background: match.iAmWinner}}>
                    <p>{match.gameDuration} Minutos</p>
                    <p>{match.gameMode}</p>
                    <img src={`http://ddragon.leagueoflegends.com/cdn/13.1.1/img/champion/${match.myChampion}.png`} />
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default UserProfile;