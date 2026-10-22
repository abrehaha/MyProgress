import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import { supabase } from "../supabaseClient";

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
  logoutBtn: {
    background: "white",
    color: "#1f2937",
    border: "1px solid #d1d5db",
    padding: "0.5rem 1rem",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "0.95rem",
  },
  userEmail: { color: "#6b7280", fontSize: "0.95rem" },
  hero: { textAlign: "center", padding: "3rem 2rem 2rem" },
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
  targetsWrap: { padding: "0 2rem 3rem", maxWidth: "900px", margin: "0 auto" },
  targetsHeading: { fontSize: "1.5rem", marginBottom: "1rem" },
  targetsGrid: {
    display: "flex",
    gap: "1.25rem",
    flexWrap: "wrap",
  },
  targetCard: {
    flex: "1 1 180px",
    border: "1px solid #e5e7eb",
    borderRadius: "12px",
    padding: "1.5rem",
    textAlign: "center",
  },
  targetValue: { fontSize: "2rem", fontWeight: "bold", color: accent, margin: 0 },
  targetLabel: { color: "#6b7280", marginTop: "0.4rem" },
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

function calculateTargets(profile) {
  const { age, height_in, weight_lb, sex, goal } = profile;
  const weightKg = weight_lb / 2.205;
  const heightCm = height_in * 2.54;

  let bmr =
    sex === "male"
      ? 10 * weightKg + 6.25 * heightCm - 5 * age + 5
      : 10 * weightKg + 6.25 * heightCm - 5 * age - 161;

  let calories = bmr * 1.55;
  if (goal === "lose") calories -= 500;
  if (goal === "gain") calories += 300;
  calories = Math.round(calories);

  const protein = Math.round(weight_lb * 0.8);
  const fat = Math.round((calories * 0.25) / 9);
  const carbs = Math.round((calories - protein * 4 - fat * 9) / 4);

  return { calories, protein, fat, carbs };
}

function Home() {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [profileLoading, setProfileLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setProfileLoading(false);
      return;
    }

    supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single()
      .then(({ data, error }) => {
        if (!error) setProfile(data);
        setProfileLoading(false);
      });
  }, [user]);

  async function handleLogout() {
    await supabase.auth.signOut();
  }

  const targets = profile ? calculateTargets(profile) : null;

  return (
    <div style={styles.page}>
      <nav style={styles.nav}>
        <span style={styles.logo}>MyProgress</span>
        <div style={styles.navLinks}>
          {user ? (
            <>
              <span style={styles.userEmail}>{user.email}</span>
              <button style={styles.logoutBtn} onClick={handleLogout}>
                Log out
              </button>
            </>
          ) : (
            <>
              <Link to="/login" style={styles.link}>Log in</Link>
              <Link to="/signup" style={styles.signupBtn}>Sign up</Link>
            </>
          )}
        </div>
      </nav>

      <section style={styles.hero}>
        <h1 style={styles.title}>Track your progress. Reach your goals.</h1>
        <p style={styles.subtitle}>
          MyProgress helps you stay consistent and see how far you've come.
        </p>
        {!user && (
          <Link to="/signup" style={styles.cta}>Get started</Link>
        )}
        {user && !authLoading && !profileLoading && !profile && (
          <Link to="/onboarding" style={styles.cta}>Finish setting up your profile</Link>
        )}
      </section>

      {user && targets && (
        <div style={styles.targetsWrap}>
          <h2 style={styles.targetsHeading}>Your daily targets</h2>
          <div style={styles.targetsGrid}>
            <div style={styles.targetCard}>
              <p style={styles.targetValue}>{targets.calories}</p>
              <p style={styles.targetLabel}>Calories</p>
            </div>
            <div style={styles.targetCard}>
              <p style={styles.targetValue}>{targets.protein}g</p>
              <p style={styles.targetLabel}>Protein</p>
            </div>
            <div style={styles.targetCard}>
              <p style={styles.targetValue}>{targets.fat}g</p>
              <p style={styles.targetLabel}>Fat</p>
            </div>
            <div style={styles.targetCard}>
              <p style={styles.targetValue}>{targets.carbs}g</p>
              <p style={styles.targetLabel}>Carbs</p>
            </div>
          </div>
        </div>
      )}

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