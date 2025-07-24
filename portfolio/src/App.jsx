
import React from 'react';
import SectionRenderer from './components/SectionRenderer';
import data from './data.json';
import './App.css';

function App() {
  return (
    <>
      <header>
        <h1>{data.perfil.usuario}</h1>
        <h2>{data.perfil.nombre}</h2>
        <h3>{data.perfil.titulo}</h3>
        <p>{data.perfil.descripcion}</p>
      </header>
      <main>
        <SectionRenderer title="Experiencia" items={data.experiencia} />
        <SectionRenderer title="Estudios" items={data.estudios} />
        <SectionRenderer title="Proyectos" items={data.proyectos} />
      </main>
      <footer>
        <div>
          <h2>Contacto</h2>
          <p>Email: <a href={`mailto:${data.contacto.email}`}>{data.contacto.email}</a></p>
        </div>
        <div>
          <h2>Redes</h2>
          <p><a href={data.redes.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a></p>
          <p><a href={data.redes.github} target="_blank" rel="noopener noreferrer">GitHub</a></p>
        </div>
      </footer>
    </>
  );
}

export default App;
