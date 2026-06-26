type DashboardHeaderProps = {
  name?: string;
};

export function DashboardHeader({ name = 'Abdullahi' }: DashboardHeaderProps) {
  const today = new Date().toLocaleDateString('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  return (
    <header className="dashboardHeader">
      <div>
        <p className="eyebrow">Together Support Admin</p>
        <h1>Welcome, {name}</h1>
        <p>{today}</p>
      </div>
    </header>
  );
}