export default function Home() {
  return (
    <div style={styles.page}>
      {/* NAVBAR */}
      <div style={styles.nav}>
        <div style={styles.logo}>NILLOHIT</div>
        <div style={styles.navLinks}>
          <a href="/login">Login</a>
          <a href="/signup" style={styles.signupBtn}>Sign Up</a>
        </div>
      </div>

      {/* HERO */}
      <section style={styles.hero}>
        <h1 style={styles.heroTitle}>
          Complete Tasks.<br />Earn Real Money.
        </h1>
        <p style={styles.heroSub}>
          NILLOHIT connects task providers with genuine users who complete Reddit tasks
          and earn rewards in USD.
        </p>
        <div style={styles.heroActions}>
          <a href="/signup" style={styles.primaryBtn}>Get Started</a>
          <a href="/login" style={styles.secondaryBtn}>Login</a>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>How It Works</h2>
        <div style={styles.cards}>
          <div style={styles.card}>
            <h4>1. Sign Up</h4>
            <p>Create an account using email OTP and submit your Reddit profile.</p>
          </div>
          <div style={styles.card}>
            <h4>2. Get Verified</h4>
            <p>Our team reviews your Reddit account for eligibility.</p>
          </div>
          <div style={styles.card}>
            <h4>3. Complete Tasks</h4>
            <p>Claim tasks, complete them honestly, and submit proof.</p>
          </div>
          <div style={styles.card}>
            <h4>4. Earn USD</h4>
            <p>Get paid after approval. Withdraw via UPI or USDT.</p>
          </div>
        </div>
      </section>

      {/* RULES */}
      <section style={styles.sectionAlt}>
        <h2 style={styles.sectionTitle}>Task Rules</h2>
        <ul style={styles.list}>
          <li>Tasks are first-come-first-serve</li>
          <li>Minimum gap of 6 hours between tasks</li>
          <li>Screenshot proof is mandatory (max 5MB)</li>
          <li>Rejected tasks must be deleted by the user</li>
          <li>4 consecutive rejections = 24 hour temporary ban</li>
          <li>Cheating or fraud = permanent ban</li>
        </ul>
      </section>

      {/* PAYMENTS */}
      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>Payments & Withdrawals</h2>
        <ul style={styles.list}>
          <li>Currency: USD only</li>
          <li>Minimum withdrawal: $1</li>
          <li>Maximum 2 withdrawals per month</li>
          <li>Minimum 15 days gap between withdrawals</li>
          <li>Payment methods: UPI or USDT</li>
        </ul>
      </section>

      {/* FAQ */}
      <section style={styles.sectionAlt}>
        <h2 style={styles.sectionTitle}>FAQs</h2>

        <div style={styles.faq}>
          <strong>What happens if my task is rejected?</strong>
          <p>
            You must delete the task from your side. The provider may re-upload it
            after review.
          </p>
        </div>

        <div style={styles.faq}>
          <strong>When do I get paid?</strong>
          <p>
            After the provider approves your task and admin processes the withdrawal.
          </p>
        </div>

        <div style={styles.faq}>
          <strong>Is NILLOHIT free to join?</strong>
          <p>Yes. There is no joining fee.</p>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={styles.footer}>
        <p>© {new Date().getFullYear()} NILLOHIT. All rights reserved.</p>
        <p>Contact: support@nillohit.com</p>
      </footer>
    </div>
  );
}

const styles = {
  page: {
    fontFamily: "Inter, sans-serif",
    background: "#ffffff",
    color: "#1f2937",
  },

  nav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "18px 32px",
    borderBottom: "1px solid #e5e7eb",
  },
  logo: {
    fontSize: "20px",
    fontWeight: "700",
    color: "#0b3c8d",
  },
  navLinks: {
    display: "flex",
    gap: "16px",
    alignItems: "center",
  },
  signupBtn: {
    padding: "8px 14px",
    background: "#0b3c8d",
    color: "#fff",
    borderRadius: "8px",
    textDecoration: "none",
  },
  loginBtn: {
    padding: "8px 14px",
    background: "#0b3c8d",
    color: "#fff",
    borderRadius: "8px",
    textDecoration: "none",
  },
  hero: {
    padding: "80px 24px",
    textAlign: "center",
    maxWidth: "900px",
    margin: "0 auto",
  },
  heroTitle: {
    fontSize: "42px",
    color: "#0b3c8d",
    marginBottom: "16px",
  },
  heroSub: {
    color: "#6b7280",
    fontSize: "18px",
    marginBottom: "32px",
  },
  heroActions: {
    display: "flex",
    justifyContent: "center",
    gap: "16px",
  },
  primaryBtn: {
    background: "#0b3c8d",
    color: "#fff",
    padding: "12px 22px",
    borderRadius: "10px",
    textDecoration: "none",
  },
  secondaryBtn: {
    border: "1px solid #0b3c8d",
    color: "#0b3c8d",
    padding: "12px 22px",
    borderRadius: "10px",
    textDecoration: "none",
  },

  section: {
    padding: "56px 24px",
    maxWidth: "1100px",
    margin: "0 auto",
  },
  sectionAlt: {
    padding: "56px 24px",
    background: "#f9fbff",
  },
  sectionTitle: {
    fontSize: "28px",
    color: "#0b3c8d",
    marginBottom: "28px",
  },

  cards: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "20px",
  },
  card: {
    border: "1px solid #e5e7eb",
    borderRadius: "14px",
    padding: "20px",
    background: "#ffffff",
  },

  list: {
    maxWidth: "800px",
    margin: "0 auto",
    color: "#374151",
    lineHeight: "1.8",
  },

  faq: {
    maxWidth: "800px",
    margin: "0 auto 16px",
    padding: "16px",
    border: "1px solid #e5e7eb",
    borderRadius: "12px",
    background: "#ffffff",
  },

  footer: {
    padding: "24px",
    textAlign: "center",
    fontSize: "14px",
    color: "#6b7280",
    borderTop: "1px solid #e5e7eb",
  },
};
