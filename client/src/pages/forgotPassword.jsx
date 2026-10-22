import { useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../supabaseClient";
import "./auth.css";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });

    setLoading(false);
    if (error) {
      setError(error.message);
      return;
    }
    setSent(true);
  }

  return (
    <div>
      <nav className="auth-topbar">
        <Link to="/" className="auth-topbar-brand">← MyProgress</Link>
        <Link to="/login" className="auth-topbar-link">Back to log in</Link>
      </nav>

      <div className="auth-page">
        <div className="auth-card">
          <h1>Reset password</h1>
          <p className="auth-subtitle">
            Enter your email and we'll send you a reset link.
          </p>

          {error && <div className="auth-error">{error}</div>}

          {sent ? (
            <p style={{ textAlign: "center", color: "#374151" }}>
              Check your inbox for a reset link.
            </p>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="auth-field">
                <label htmlFor="email">Email</label>
                <div className="auth-input-wrap">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M3 7l9 6 9-6M5 5h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2z" />
                  </svg>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    required
                  />
                </div>
              </div>

              <button type="submit" className="auth-submit" disabled={loading}>
                {loading ? "Sending..." : "Send reset link"}
              </button>
            </form>
          )}

          <p className="auth-switch">
            Remembered it? <Link to="/login">Log in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;