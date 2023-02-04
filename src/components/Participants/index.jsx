import PropTypes from 'prop-types';
import { getChampionIcon } from '../../helpers/getStaticData';
import './index.css';

function Participants({ participants }) {
  return (
    <div className="flex justify-evenly list-section-container">
      <div className="participants-list-container">
        <div>
          <img src={getChampionIcon(participants[0].championName)} alt="champion icon" />
          <span>{participants[0].summonerName}</span>
        </div>
        <div>
          <img src={getChampionIcon(participants[1].championName)} alt="champion icon" />
          <span>{participants[1].summonerName}</span>
        </div>
        <div>
          <img src={getChampionIcon(participants[2].championName)} alt="champion icon" />
          <span>{participants[2].summonerName}</span>
        </div>
        <div>
          <img src={getChampionIcon(participants[3].championName)} alt="champion icon" />
          <span>{participants[3].summonerName}</span>
        </div>
        <div>
          <img src={getChampionIcon(participants[4].championName)} alt="champion icon" />
          <span>{participants[4].summonerName}</span>
        </div>
      </div>
      <div className="participants-list-container">
        <div>
          <img src={getChampionIcon(participants[5].championName)} alt="champion icon" />
          <span>{participants[5].summonerName}</span>
        </div>
        <div>
          <img src={getChampionIcon(participants[6].championName)} alt="champion icon" />
          <span>{participants[6].summonerName}</span>
        </div>
        <div>
          <img src={getChampionIcon(participants[7].championName)} alt="champion icon" />
          <span>{participants[7].summonerName}</span>
        </div>
        <div>
          <img src={getChampionIcon(participants[8].championName)} alt="champion icon" />
          <span>{participants[8].summonerName}</span>
        </div>
        <div>
          <img src={getChampionIcon(participants[9].championName)} alt="champion icon" />
          <span>{participants[9].summonerName}</span>
        </div>
      </div>
    </div>
  );
}

Participants.propTypes = {
  participants: PropTypes.object,
}.isRequired;

export default Participants;
