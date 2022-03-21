import { useState } from 'react';

import { api } from '../services/api';

import logoImg from '../assets/logo.svg';

import '../styles/login.scss';

export function Login({ history }) {
  const [username, setUsername] = useState('');

  async function handleSubmit(event) {
    event.preventDefault();

    const response = await api.post('/devs', {
      username
    });

    const { _id } = response.data;

    history.push(`/dev/${_id}`);
  }

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit}>
        <img src={logoImg} alt="Tindev" />
        <input placeholder="Digite seu usuário no Github" value={username} onChange={e => setUsername(e.target.value)} />
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
}
