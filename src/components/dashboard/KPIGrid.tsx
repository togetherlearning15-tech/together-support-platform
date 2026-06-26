type KPICard = {
  title: string;
  value: number;
  description: string;
  action: string;
  page: string;
};

type KPIGridProps = {
  cards: KPICard[];
  onSelectPage: (page: string) => void;
};

export function KPIGrid({ cards, onSelectPage }: KPIGridProps) {
  return (
    <section className="dashboardGrid">
      {cards.map((card) => (
        <article className="dashboardCard" key={card.title}>
          <div>
            <strong>{card.value}</strong>
            <span>{card.title}</span>
          </div>
          <p>{card.description}</p>
          <button
            className="miniButton"
            type="button"
            onClick={() => onSelectPage(card.page)}
          >
            {card.action}
          </button>
        </article>
      ))}
    </section>
  );
}