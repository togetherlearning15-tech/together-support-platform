type QuickActionsProps = {
  onSelectPage: (page: string) => void;
};

const actions = [
  { label: 'New Property', icon: '🏠', page: 'properties' },
  { label: 'New Resident', icon: '🧍', page: 'residents' },
  { label: 'New Support Plan', icon: '📄', page: 'supportPlans' },
  { label: 'New Risk Assessment', icon: '🛡️', page: 'riskAssessments' },
  { label: 'New Incident', icon: '⚠️', page: 'incidents' }
];

export function QuickActions({ onSelectPage }: QuickActionsProps) {
  return (
    <section className="dashboardPanel">
      <div>
        <p className="eyebrow">Quick Actions</p>
        <h2>Start common tasks</h2>
        <p>Create records quickly from the dashboard.</p>

        <div className="quickActions">
          {actions.map((action) => (
            <button
              key={action.label}
              type="button"
              className="quickActionButton"
              onClick={() => onSelectPage(action.page)}
            >
              <span>{action.icon}</span>
              {action.label}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}