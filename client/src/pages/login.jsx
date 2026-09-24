import { Link } from "react-router-dom";
import "./auth.css";

function Login() {
  return (
    <div className="auth-page">
      <div className="auth-side">
        <Link to="/" className="auth-brand">MyProgress</Link>
        <div>
          <h2>Welcome back</h2>
          <p>Pick up where you left off and keep your progress moving.</p>
        </div>
        <span>© 2026 MyProgress</span>
      </div>

      <div className="auth-main">
        <div className="auth-form-wrap">
          <h1>Log in</h1>
          <p className="auth-subtitle">Welcome back! Please enter your details.</p>

          <form>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="you@example.com"
            />

            <div className="auth-row">
              <label htmlFor="password">Password</label>
              <Link to="/forgot-password" className="auth-forgot">
                Forgot password?
              </Link>
            </div>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
            />

            <button type="submit">Log in</button>
          </form>

          <p className="auth-switch">
            Don't have an account? <Link to="/signup">Sign up</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;