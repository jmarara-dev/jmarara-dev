import React, { useRef } from "react";

/**
 * Componente reutilizable para mostrar cualquier sección del JSON.
 * Recibe un título y un array de elementos, renderiza cada uno según sus propiedades.
 */
const DEFAULT_IMG = import.meta.env.BASE_URL + 'images/default.png';

const SectionRenderer = ({ title, items }) => {
  const listRef = useRef(null);
  if (!items || items.length === 0) return null;

  const scroll = (dir) => {
    if (listRef.current) {
      const width = listRef.current.offsetWidth;
      listRef.current.scrollBy({ left: dir * width * 0.8, behavior: 'smooth' });
    }
  };

  return (
    <section aria-labelledby={`section-${title}`} className="section">
      <h2 id={`section-${title}`}>{title}</h2>
      <div style={{ position: 'relative' }}>
        <button
          aria-label="Scroll left"
          style={{ position: 'absolute', left: '-18px', top: '40%', zIndex: 2, background: '#0077b6', color: '#fff', border: 'none', borderRadius: '50%', width: 32, height: 32, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.10)' }}
          onClick={() => scroll(-1)}
        >&#8592;</button>
        <ul ref={listRef} className="section-list">
          {items.map((item, idx) => (
            <li key={idx} className="section-item">
              {title === 'Proyectos' ? (
                <>
                  <div style={{ fontWeight: 'bold', fontSize: '1.1rem', marginBottom: '0.5rem' }}>{item.nombre}</div>
                  <img
                    src={item.imagen ? import.meta.env.BASE_URL + 'images/' + item.imagen : DEFAULT_IMG}
                    alt={item.nombre || 'Proyecto'}
                    style={{ width: '150px', height: '150px', objectFit: 'cover', borderRadius: '8px', marginBottom: '0.5rem' }}
                    onError={e => {
                      if (e.target.src !== DEFAULT_IMG) e.target.src = DEFAULT_IMG;
                    }}
                  />
                  {item.descripcion && (
                    <div style={{ marginBottom: '0.5rem' }}>{item.descripcion}</div>
                  )}
                  {item.url && (
                    <a href={item.url} target="_blank" rel="noopener noreferrer" style={{ color: '#0077b6', wordBreak: 'break-all' }}>{item.url}</a>
                  )}
                </>
              ) : title === 'Certificaciones' ? (
                <>
                  <div style={{ fontWeight: 'bold', fontSize: '1.1rem', marginBottom: '0.5rem' }}>{item.certificacion}</div>
                  {item.descripcion && (
                    <div style={{ marginBottom: '0.5rem' }}>{item.descripcion}</div>
                  )}
                  {item.enlace && (
                    <a href={import.meta.env.BASE_URL + item.enlace.replace(/^\//, '')} target="_blank" rel="noopener noreferrer" style={{ color: '#0077b6', wordBreak: 'break-all', fontWeight: 'bold', display: 'inline-block', marginTop: '0.5rem' }} aria-label={`Descargar ${item.certificacion}`}>Ver certificado PDF</a>
                  )}
                </>
              ) : title === 'Experiencia' ? (
                <>
                  <div style={{ fontWeight: 'bold', fontSize: '1.1rem', marginBottom: '0.5rem' }}>{item.empresa}</div>
                  {item.puesto && (
                    <div>{item.puesto}</div>
                  )}
                  {item.periodo && (
                    <div style={{ color: '#555', fontSize: '0.95rem' }}>{item.periodo}</div>
                  )}
                  {item.descripcion && (
                    <div style={{ marginTop: '0.5rem' }}>{item.descripcion}</div>
                  )}
                </>
              ) : title === 'Estudios' ? (
                <>
                  <div style={{ fontWeight: 'bold', fontSize: '1.1rem', marginBottom: '0.5rem' }}>{item.institucion}</div>
                  {item.titulo && (
                    <div>{item.titulo}</div>
                  )}
                  {item.periodo && (
                    <div style={{ color: '#555', fontSize: '0.95rem' }}>{item.periodo}</div>
                  )}
                </>
              ) : (
                Object.entries(item).map(([key, value]) => (
                  key !== 'imagen' && (
                    <div key={key}>
                      <strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong> {value}
                    </div>
                  )
                ))
              )}
            </li>
          ))}
        </ul>
        <button
          aria-label="Scroll right"
          style={{ position: 'absolute', right: '-18px', top: '40%', zIndex: 2, background: '#0077b6', color: '#fff', border: 'none', borderRadius: '50%', width: 32, height: 32, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.10)' }}
          onClick={() => scroll(1)}
        >&#8594;</button>
      </div>
    </section>
  );
};

export default SectionRenderer;
