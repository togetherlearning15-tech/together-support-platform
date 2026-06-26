type Props = {
  referral: any;
  onBack: () => void;
};

export function ReferralDetails({ referral, onBack }: Props) {
  return (
    <main className="dashboardContent">

      <button className="miniButton" onClick={onBack}>
        ← Back
      </button>

      <div className="pageHeader">
        <div>
          <p className="eyebrow">Referral</p>
          <h1>{referral.referrer_name}</h1>
          <p>{referral.organisation}</p>
        </div>

        <span className="statusPill">
          {referral.status}
        </span>
      </div>

      <section className="dashboardPanel">

        <h2>Contact Information</h2>

        <div className="detailsGrid">

          <div>
            <strong>Name</strong>
            <p>{referral.referrer_name}</p>
          </div>

          <div>
            <strong>Email</strong>
            <p>{referral.email}</p>
          </div>

          <div>
            <strong>Telephone</strong>
            <p>{referral.telephone}</p>
          </div>

          <div>
            <strong>Organisation</strong>
            <p>{referral.organisation}</p>
          </div>

        </div>

      </section>

      <section className="dashboardPanel">

        <h2>Support Needs</h2>

        <p>{referral.support_needs}</p>

      </section>

      <section className="dashboardPanel">

        <h2>Case Management</h2>

        <button className="miniButton">
          Mark Contacted
        </button>

        <button className="miniButton">
          Accept
        </button>

        <button className="miniButton">
          Close
        </button>

      </section>

    </main>
  );
}