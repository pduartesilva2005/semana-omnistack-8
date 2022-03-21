import { Routes } from './routes';

import dracula from './assets/dracula.svg';

import './styles/app.scss';

function App() {
  function handleChangeTheme(event) {
    if (event.target.checked) {
      document.documentElement.setAttribute('data-theme', 'dracula');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
  }

  return (
    <div className="app">
      <div className="theme-switch-wrapper">
        <img src={dracula} alt="dracula logo" />
        <label className="theme-switch">
          <input type="checkbox" id="checkbox" onChange={handleChangeTheme} />
          <div className="slider round"></div>
        </label>
      </div>
      <Routes />
    </div>
  );
}

export default App;
