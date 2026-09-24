import { Link } from "react-router-dom";

const accent = "#4f46e5";

const styles = {
  page: { fontFamily: "sans-serif", color: "#1f2937", minHeight: "100vh" },
  nav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "1rem 2rem",
    borderBottom: "1px solid #e5e7eb",
  },
  logo: { fontWeight: "bold", fontSize: "1.25rem", color: accent },
  navLinks: { display: "flex", gap: "1.5rem", alignItems: "center" },
  link: { textDecoration: "none", color: "#1f2937" },
  signupBtn: {
    textDecoration: "none",
    background: accent,
    color: "white",
    padding: "0.5rem 1rem",
    borderRadius: "6px",
  },
  hero: { textAlign: "center", padding: "5rem 2rem" },
  title: { fontSize: "2.75rem", margin: 0 },
  subtitle: {
    fontSize: "1.2rem",
    color: "#6b7280",
    maxWidth: "500px",
    margin: "1rem auto 2rem",
  },
  cta: {
    textDecoration: "none",
    background: accent,
    color: "white",
    padding: "0.85rem 2rem",
    borderRadius: "8px",
    fontSize: "1.1rem",
  },
  features: {
    display: "flex",
    gap: "1.5rem",
    justifyContent: "center",
    flexWrap: "wrap",
    padding: "0 2rem 4rem",
  },
  card: {
    width: "250px",
    padding: "1.5rem",
    border: "1px solid #e5e7eb",
    borderRadius: "10px",
  },
  footer: { textAlign: "center", padding: "1.5rem", color: "#9ca3af" },
};

function Home() {
  return (
    <div style={styles.page}>
      <nav style={styles.nav}>
        <span style={styles.logo}>MyProgress</span>
        <div style={styles.navLinks}>
          <Link to="/login" style={styles.link}>Log in</Link>
          <Link to="/signup" style={styles.signupBtn}>Sign up</Link>
        </div>
      </nav>

      <section style={styles.hero}>
        <h1 style={styles.title}>Track your progress. Reach your goals.</h1>
        <p style={styles.subtitle}>
          MyProgress helps you stay consistent and see how far you've come.
        </p>
        <Link to="/signup" style={styles.cta}>Get started</Link>
      </section>

      <section style={styles.features}>
        <div style={styles.card}>
          <h3>Set goals</h3>
          <p>Define what you want to achieve.</p>
        </div>
        <div style={styles.card}>
          <h3>Log your progress</h3>
          <p>Record your updates in seconds.</p>
        </div>
        <div style={styles.card}>
          <h3>See your growth</h3>
          <p>Look back and watch your progress add up.</p>
        </div>
      </section>

      <footer style={styles.footer}>© 2026 MyProgress</footer>
    </div>
  );
}

export default Home;