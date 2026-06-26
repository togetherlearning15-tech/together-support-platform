type AttentionItem = {
  label: string;
  value: number;
  tone: 'red' | 'amber' | 'green' | 'blue' | 'purple';
  page: string;
};

type AttentionPanelProps = {
  items: AttentionItem[];
  onSelectPage: (page: string) => void;
};

export function AttentionPanel({ items, onSelectPage }: AttentionPanelProps) {
  return (
    <section className="dashboardPanel">
      <div>
        <p className="eyebrow">Needs Attention</p>
        <h2>Today’s priorities</h2>
        <p>Items that may need follow-up from the management team.</p>

        <div className="attentionList">
          {items.map((item) => (
            <button
              key={item.label}
              type="button"
              className={`attentionItem ${item.tone}`}
              onClick={() => onSelectPage(item.page)}
            >
              <strong>{item.value}</strong>
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}