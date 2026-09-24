import { Link } from "react-router-dom";
import "./auth.css";

function Signup() {
  return (
    <div className="auth-page">
      <div className="auth-side">
        <Link to="/" className="auth-brand">MyProgress</Link>
        <div>
          <h2>Start tracking today</h2>
          <p>Create your free account and see how far you can go.</p>
        </div>
        <span>© 2026 MyProgress</span>
      </div>

      <div className="auth-main">
        <div className="auth-form-wrap">
          <h1>Create an account</h1>
          <p className="auth-subtitle">Sign up to get started.</p>

          <form>
            <label htmlFor="name">Name</label>
            <input type="text" id="name" name="name" placeholder="Your name" />

            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="you@example.com"
            />

            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="At least 8 characters"
            />

            <label htmlFor="confirm">Confirm password</label>
            <input
              type="password"
              id="confirm"
              name="confirm"
              placeholder="Re-enter your password"
            />

            <button type="submit">Sign up</button>
          </form>

          <p className="auth-switch">
            Already have an account? <Link to="/login">Log in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;