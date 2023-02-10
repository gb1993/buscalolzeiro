import { useLocation } from 'react-router-dom';
import {
  getProfileIcon,
  getItemIcon,
  getChampionIcon,
  addDot,
} from '../../helpers/getStaticData';
import Participants from '../../components/Participants';
import './index.css';

function UserProfile() {
  const { state } = useLocation();

  const handleColor = (isWin, time) => {
    if (time < 3) {
      return ('bg-neutral/70');
    }
    if (isWin === false) {
      return ('bg-lightred/70');
    }
    return ('bg-lightblue/70');
  };

  const checkKDA = (kills, deaths, assists) => {
    const result = (kills + assists) / deaths;
    if (Number.isNaN(result)) {
      return 0;
    }
    return result.toFixed(2);
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
          <li key={match.id} className={`${handleColor(match.me.win, match.gameDuration)}`}>
            <div className="list-section-container">
              <p>{match.gameMode}</p>
              <p>{`${match.gameDuration} minutos`}</p>
            </div>
            <div className="list-section-container">
              <div className="flex">
                <div>
                  <img
                    src={getChampionIcon(match.me.championName)}
                    alt="my champion icon"
                    className="rounded-full w-16"
                  />
                  <p className="bg-black w-6 text-center -translate-y-4 m-auto rounded-lg text-xs">{match.me.champLevel}</p>
                </div>
                <div>
                  <p>{`${match.me.kills} / ${match.me.deaths} / ${match.me.assists}`}</p>
                  <p>
                    {checkKDA(match.me.kills, match.me.deaths, match.me.assists)}
                  </p>
                </div>
              </div>
              <div className="items-container">
                {getItemIcon(match.me.item0) === undefined ? <div className="h-8 w-8 rounded-lg bg-black/50" /> : <img src={getItemIcon(match.me.item0)} alt="item 1" />}
                {getItemIcon(match.me.item1) === undefined ? <div className="h-8 w-8 rounded-lg bg-black/50" /> : <img src={getItemIcon(match.me.item1)} alt="item 2" />}
                {getItemIcon(match.me.item2) === undefined ? <div className="h-8 w-8 rounded-lg bg-black/50" /> : <img src={getItemIcon(match.me.item2)} alt="item 3" />}
                {getItemIcon(match.me.item3) === undefined ? <div className="h-8 w-8 rounded-lg bg-black/50" /> : <img src={getItemIcon(match.me.item3)} alt="item 4" />}
                {getItemIcon(match.me.item4) === undefined ? <div className="h-8 w-8 rounded-lg bg-black/50" /> : <img src={getItemIcon(match.me.item4)} alt="item 5" />}
                {getItemIcon(match.me.item5) === undefined ? <div className="h-8 w-8 rounded-lg bg-black/50" /> : <img src={getItemIcon(match.me.item5)} alt="item 6" />}
                {getItemIcon(match.me.item6) === undefined ? <div className="h-8 w-8 rounded-lg bg-black/50" /> : <img src={getItemIcon(match.me.item6)} alt="item 7" />}
              </div>
            </div>
            <div className="list-section-container">
              <p>{`Gold: ${addDot(match.me.goldEarned)}`}</p>
              <p>{`Dano Aplicado: ${addDot(match.me.totalDamageDealtToChampions)}`}</p>
              <p>{`Dano Recebido: ${addDot(match.me.totalDamageTaken)}`}</p>
              <p>{`Farm: ${match.me.totalMinionsKilled}`}</p>
              <p>{`Pontuação de Visão: ${match.me.visionScore}`}</p>
            </div>
            <Participants participants={match.participants} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserProfile;
