import './App.css'
import CovidStats from './components/CovidStats'

function App() {
  return (
    <div className="covidead">
      <h1>Covidead</h1>
      <p>Data fetched from <a href="https://covid19api.com/" target="_blank">covid19api</a>.</p>
      <CovidStats />
    </div>
  );
}

export default App;
