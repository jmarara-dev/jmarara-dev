import React, { useState, useEffect } from "react";

/**
 * Componente reutilizable para mostrar cualquier sección del JSON.
 * Recibe un título y un array de elementos, renderiza cada uno según sus propiedades.
 */
const DEFAULT_IMG = import.meta.env.BASE_URL + 'images/default.png';

const SectionRenderer = ({ title, items }) => {
  const [startIdx, setStartIdx] = useState(0);
  const [cardsToShow, setCardsToShow] = useState(3);
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 930) {
        setCardsToShow(1);
      } else if (window.innerWidth <= 1055) {
        setCardsToShow(2);
      } else {
        setCardsToShow(3);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  if (!items || items.length === 0) return null;

  const visibleItems = items.length <= cardsToShow
    ? items
    : Array.from({ length: cardsToShow }, (_, i) => items[(startIdx + i) % items.length]);

  // Flecha derecha: avanza una posición
  const scroll = (dir) => {
    if (items.length <= 3) return;
    setStartIdx((prev) => {
      if (dir === 1) {
        return (prev + 1) % items.length;
      } else {
        return (prev - 1 + items.length) % items.length;
      }
    });
  };

  return (
    <section
      aria-labelledby={`section-${title}`}
      className="section section-centered"
    >
      <h2 id={`section-${title}`} className="section-title">{title}</h2>
      <div className="section-carrusel">
        <button
          aria-label="Scroll left"
          className="section-arrow section-arrow-left"
          onClick={() => scroll(-1)}
        >&#8592;</button>
        <ul className="section-list section-list-carrusel">
          {visibleItems.map((item, idx) => (
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
                    <a href={item.url} target="_blank" rel="noopener noreferrer" style={{ color: '#0077b6', fontWeight: 'bold', display: 'inline-block', marginTop: '0.5rem' }} aria-label={`Ir al repositorio de ${item.nombre}`}>Ir al repositorio</a>
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
          className="section-arrow section-arrow-right"
          onClick={() => scroll(1)}
        >&#8594;</button>
      </div>
    </section>
  );
};

export default SectionRenderer;
