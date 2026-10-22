import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";
import { useAuth } from "../AuthContext";
import "./auth.css";

function Onboarding() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [goal, setGoal] = useState("maintain");
  const [age, setAge] = useState("");
  const [heightFt, setHeightFt] = useState("");
  const [heightIn, setHeightIn] = useState("");
  const [weight, setWeight] = useState("");
  const [sex, setSex] = useState("male");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    const ageNum = Number(age);
    const weightNum = Number(weight);
    const totalHeightIn = Number(heightFt) * 12 + Number(heightIn || 0);

    if (ageNum < 14 || ageNum > 100) {
      setError("Age must be between 14 and 100.");
      return;
    }
    if (totalHeightIn < 48 || totalHeightIn > 90) {
      setError("Height must be between 4'0\" and 7'6\".");
      return;
    }
    if (weightNum < 70 || weightNum > 650) {
      setError("Weight must be between 70 and 650 lb.");
      return;
    }

    setLoading(true);
    const { error } = await supabase.from("profiles").upsert({
      id: user.id,
      goal,
      age: ageNum,
      height_in: totalHeightIn,
      weight_lb: weightNum,
      sex,
    });
    setLoading(false);

    if (error) {
      setError(error.message);
      return;
    }
    navigate("/");
  }

  return (
    <div>
      <nav className="auth-topbar">
        <span className="auth-topbar-brand">MyProgress</span>
      </nav>

      <div className="auth-page">
        <div className="auth-card">
          <h1>Tell us about you</h1>
          <p className="auth-subtitle">
            This sets up your daily calorie and macro targets.
          </p>

          {error && <div className="auth-error">{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="auth-field">
              <label htmlFor="goal">Goal</label>
              <select
                id="goal"
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
                style={{
                  width: "100%",
                  padding: "0.85rem 1rem",
                  border: "1px solid #d1d5db",
                  borderRadius: "10px",
                  fontSize: "1rem",
                  boxSizing: "border-box",
                }}
              >
                <option value="lose">Lose weight</option>
                <option value="maintain">Maintain weight</option>
                <option value="gain">Gain weight</option>
              </select>
            </div>

            <div className="auth-field">
              <label htmlFor="age">Age</label>
              <input
                type="number"
                id="age"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                placeholder="25"
                required
                style={{
                  width: "100%",
                  padding: "0.85rem 1rem",
                  border: "1px solid #d1d5db",
                  borderRadius: "10px",
                  fontSize: "1rem",
                  boxSizing: "border-box",
                }}
              />
            </div>

            <div className="auth-field">
              <label>Height</label>
              <div style={{ display: "flex", gap: "0.75rem" }}>
                <input
                  type="number"
                  value={heightFt}
                  onChange={(e) => setHeightFt(e.target.value)}
                  placeholder="Feet"
                  required
                  style={{
                    width: "100%",
                    padding: "0.85rem 1rem",
                    border: "1px solid #d1d5db",
                    borderRadius: "10px",
                    fontSize: "1rem",
                    boxSizing: "border-box",
                  }}
                />
                <input
                  type="number"
                  value={heightIn}
                  onChange={(e) => setHeightIn(e.target.value)}
                  placeholder="Inches"
                  style={{
                    width: "100%",
                    padding: "0.85rem 1rem",
                    border: "1px solid #d1d5db",
                    borderRadius: "10px",
                    fontSize: "1rem",
                    boxSizing: "border-box",
                  }}
                />
              </div>
            </div>

            <div className="auth-field">
              <label htmlFor="weight">Weight (lb)</label>
              <input
                type="number"
                id="weight"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                placeholder="176"
                required
                style={{
                  width: "100%",
                  padding: "0.85rem 1rem",
                  border: "1px solid #d1d5db",
                  borderRadius: "10px",
                  fontSize: "1rem",
                  boxSizing: "border-box",
                }}
              />
            </div>

            <div className="auth-field">
              <label htmlFor="sex">Sex</label>
              <select
                id="sex"
                value={sex}
                onChange={(e) => setSex(e.target.value)}
                style={{
                  width: "100%",
                  padding: "0.85rem 1rem",
                  border: "1px solid #d1d5db",
                  borderRadius: "10px",
                  fontSize: "1rem",
                  boxSizing: "border-box",
                }}
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>

            <button type="submit" className="auth-submit" disabled={loading}>
              {loading ? "Saving..." : "Save and continue"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Onboarding;