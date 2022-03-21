import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import io from 'socket.io-client';

import { api } from '../services/api';

import logoImg from '../assets/logo.svg';
import disLikeImg from '../assets/dislike.svg';
import likeImg from '../assets/like.svg';
import itsAMatchImg from '../assets/itsamatch.png';

import '../styles/main.scss';

export function Main({ match }) {
  const [users, setUsers] = useState([]);
  const [matchDev, setMatchDev] = useState(null);

  useEffect(() => {
    async function loadUsers() {
      const response = await api.get('/devs', {
        headers: {
          user: match.params.id
        }
      });

      setUsers(response.data);
    }

    loadUsers();
  }, [match.params.id]);

  useEffect(() => {
    const socket = io('http://localhost:3333', {
      query: { user: match.params.id }
    });

    socket.on('match', dev => setMatchDev(dev));
  }, [match.params.id]);

  async function handleLike(id) {
    await api.post(`/devs/${id}/likes`, null, {
      headers: {
        user: match.params.id
      }
    });

    setUsers(users.filter(user => user._id !== id));
  }

  async function handleDislike(id) {
    await api.post(`/devs/${id}/dislikes`, null, {
      headers: { user: match.params.id },
    })

    setUsers(users.filter(user => user._id !== id));
  }

  return (
    <div className="main-container">
      <Link to="/">
        <img src={logoImg} alt="Tindev" />
      </Link>

      {users.length > 0 ? (
        <ul>
          {users.map(user => (
            <li key={user._id}>
              <img src={user.avatar} alt={user.name} />
              <footer>
                <strong>{user.name}</strong> <span>{user.user}</span>
                <p>{user.bio}</p>
              </footer>

              <div className="buttons">
                <button type="button" onClick={() => handleDislike(user._id)}>
                  <img src={disLikeImg} alt="Deslike" />
                </button>
                <button type="button" onClick={() => handleLike(user._id)}>
                  <img src={likeImg} alt="Like" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div className="empty">Acabou :(</div>
      )}

      { matchDev && (
        <div className="match-container">
        <img src={itsAMatchImg} alt="It's a match" />

        <img className="avatar" src={matchDev.avatar} alt=""/>
        <strong>{matchDev.name}</strong>
        <p>{matchDev.bio}</p>

        <button type="button" onClick={() => setMatchDev(null)}>FECHAR</button>
      </div>
      ) }
    </div>
  );
}
