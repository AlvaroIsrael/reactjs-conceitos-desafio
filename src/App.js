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
    const repos = [
      {
        url: 'https://github.com/Shofnip/front-end-reactjs',
        title: 'Front-end ReactJS',
        techs: ['ReactJS'],
      },
      {
        url: 'https://github.com/Shofnip/back-end-Nodejs',
        title: 'Back-end NodeJS',
        techs: ['NodeJS'],
      },
      {
        url: 'https://github.com/AlvaroIsrael/SQLiteForExcel',
        title: 'Mobile React Native',
        techs: ['SQLiteForExcel'],
      },
      {
        url: 'https://github.com/AlvaroIsrael/vscode-one-monokai',
        title: 'VsCode is aewsome',
        techs: ['VSCode'],
      },
      {
        url: 'https://github.com/AlvaroIsrael',
        title: 'ReactJS Challenge',
        techs: ['React', 'Node.js', 'React Native'],
      }];

    const repository = repos[Math.floor(Math.random() * repos.length)];

    const response = await api.post('/repositories', {...repository});
    setRepositories([...repositories, response.data]);
  }

  async function handleRemoveRepository(id) {
    try {
      await api.delete(`/repositories/${id}`);
      setRepositories(repositories.filter(repository => repository.id !== id));
    } catch (e) {
      alert('Could not delete repository.');
    }
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
