import './FlyingPosters.css';

export type FlyingPosterItem = {
  time: string;
  title: string;
  text: string;
};

type FlyingPostersProps = {
  items: (FlyingPosterItem | string)[];
  variant?: 'text' | 'image';
};

export function FlyingPosters({ items, variant = 'text' }: FlyingPostersProps) {
  return (
    <div className={`flying-posters flying-posters--${variant}`}>
      <div className="flying-posters__track">
        {items.map((item, index) => (
          <article className="flying-posters__card" key={getItemKey(item, index)}>
            {typeof item === 'string' ? (
              <img className="flying-posters__image" src={item} alt="Богдан и Вероника" />
            ) : (
              <>
                <span className="flying-posters__index">{String(index + 1).padStart(2, '0')}</span>
                <p className="flying-posters__time">{item.time}</p>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </>
            )}
          </article>
        ))}
      </div>
    </div>
  );
}

function getItemKey(item: FlyingPosterItem | string, index: number) {
  return typeof item === 'string'
    ? `${item}-${String(index)}`
    : `${item.time}-${item.title}-${String(index)}`;
}
