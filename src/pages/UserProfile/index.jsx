import { useLocation } from 'react-router-dom';
import { getProfileIcon } from '../../helpers/getStaticData';
import './index.css';

function UserProfile() {
  const { state } = useLocation();

  const handleColor = (isWin, time) => {
    if (time < 3) {
      return ('bg-neutral');
    }
    if (isWin === false) {
      return ('bg-lightred');
    }
    return ('bg-lightblue');
  };

  return (
    <div className="profile-container">
      <div className="profile-user-container">
        <div className="profile-icon-container">
          <img src={getProfileIcon(state.summonerInfo.profileIconId)} alt="user icon" />
          <p>{state.summonerInfo.summonerLevel}</p>
        </div>
        <div>
          <h3>{state.summonerInfo.name}</h3>
          <button type="button">Atualizar Dados</button>
        </div>
      </div>
      <ul>
        {state.profileData.map((match) => (
          <li key={match.id} className={handleColor(match.me.win, match.gameDuration)}>
            <p>
              {match.gameDuration}
              Minutos
            </p>
            <p>{match.gameMode}</p>
            <img src={`http://ddragon.leagueoflegends.com/cdn/13.1.1/img/champion/${match.me.championName}.png`} alt="my champion icon" />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserProfile;
