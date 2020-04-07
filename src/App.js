import React, {useState, useEffect} from 'react';
import api from './services/api';
import './styles.css';

function App() {

  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('/repositories').then(res => {
      setRepositories(res.data);
    });
  }, []);

  async function handleAddRepository() {
    /*This is just a Mock, a form does not exist yet.*/
    const dados = {
      id: '123',
      url: 'https://github.com/AlvaroIsrael',
      title: 'Desafio ReactJS',
      techs: ['React', 'Node.js', 'React Native'],
    };
    const response = await api.post('/repositories', dados);
    setRepositories([...repositories, response.data]);
  }

  async function handleRemoveRepository(id) {
    // TODO
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => {
          return <li key={repository.id}>
            {repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>;
        })}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
