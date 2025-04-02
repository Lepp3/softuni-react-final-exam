import { Link, useNavigate } from "react-router";
import { useContext, useState } from "react";
import { useLogin } from "../../api/authApi";
import { UserContext } from "../../contexts/UserContext";
import styles from "./Login.module.css";

export default function Login() {
  const { login } = useLogin();
  const navigate = useNavigate();
  const { userLoginHandler } = useContext(UserContext);

  const [error, setError] = useState(null);
  const [touched, setTouched] = useState({});
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [isDisabled, setDisabled] = useState(false);

  const handleTouch = (e) => {
    setTouched({ ...touched, [e.target.name]: true });
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const loginHandler = async (e) => {
    const { email, password } = formData;
    let isValid = email && password;
    if (!isValid) {
      setError("All fields are required!");
      setDisabled(true);
      setTimeout(() => {
        setError(null);
        setDisabled(false);
      }, 3000);
      return;
    }

    try {
      const result = await login(email, password);

      userLoginHandler(result);

      navigate("/");
    } catch (err) {
      setError(err.message);
      setDisabled(true);
      setTimeout(() => {
        setError(null);
        setDisabled(false);
      }, 3000);
    }
  };

  return (
    <section>
      <form className={styles.loginForm} action={loginHandler}>
        <div className={styles.headers}>
          <h1>Login</h1>
        </div>

        <div className={styles.groups}>
          <div className={styles.formGroup}>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="email@domain.com"
              onBlur={handleTouch}
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              onBlur={handleTouch}
              value={formData.password}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <input
          type="submit"
          className="btn submit"
          value="Login"
          disabled={isDisabled}
        />
        <div className={styles.afterField}>
          <span>
            If you don't have a profile click <Link to="/register">here</Link>
          </span>
        </div>
        {error ? <p className={styles.errorMessage}>{error}</p> : <></>}
      </form>
    </section>
  );
}
