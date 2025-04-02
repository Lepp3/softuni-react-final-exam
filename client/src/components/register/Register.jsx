import { Link, useNavigate } from "react-router";

import { useContext, useState } from "react";
import { useRegister } from "../../api/authApi";
import { UserContext } from "../../contexts/UserContext";
import styles from "./Register.module.css";

export default function Register() {
  const [error, setError] = useState(null);
  const { register } = useRegister();
  const { userLoginHandler } = useContext(UserContext);
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    username: "",
    password: "",
    rePassword: "",
  });

  const [touched, setTouched] = useState({});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleTouch = (e) => {
    setTouched({ ...touched, [e.target.name]: true });
  };

  const validateEmail = (email) => {
    const emailPattern = /^[A-z0-9]+@[a-z]{3,7}\.[a-z]{2,5}$/;
    return emailPattern.test(email);
  };

  const validateUsername = (username) =>
    username.length >= 4 && username.length <= 15;

  const validatePassword = (password) => password.length >= 4;

  const validatePasswords = (password, rePassword) => password === rePassword;

  const isFormValid = () => {
    return (
      validateEmail(form.email) &&
      validateUsername(form.username) &&
      validatePassword(form.password) &&
      validatePasswords(form.password, form.rePassword) &&
      Object.keys(touched).length === Object.keys(form).length
    );
  };

  const registerHandler = async (e) => {
    const { email, username, password, rePassword } = form;

    const isValid = email && username && password && rePassword;
    if (!isValid) {
      setError("All fields are required!");

      setTimeout(() => {
        setError(null);
      }, 3000);
      return;
    }

    try {
      const result = await register({ email, username, password });
      userLoginHandler(result);
      navigate("/");
    } catch (err) {
      setError(err.message);
      setTimeout(() => setError(null), 3000);
    }
  };

  return (
    <section>
      <form className={styles.loginForm} action={registerHandler}>
        <div className={styles.headers}>
          <h1>Register</h1>
        </div>
        <div className={styles.groups}>
          <div className={styles.formGroup}>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={form.email}
              className={
                touched.username && !validateEmail(form.email) ? "invalid" : ""
              }
              onChange={handleChange}
              onBlur={handleTouch}
            />
            {touched.email && !validateEmail(form.email) && (
              <p className={styles.errorMessage}>Invalid email format</p>
            )}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="username">Username:</label>
            <input
              type="username"
              id="username"
              name="username"
              className={
                touched.username && !validateUsername(form.username)
                  ? "invalid"
                  : ""
              }
              value={form.username}
              onChange={handleChange}
              onBlur={handleTouch}
            />
            {touched.username && !validateUsername(form.username) && (
              <p className={styles.errorMessage}>
                Username should be between 4 and 15 characters!
              </p>
            )}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              onBlur={handleTouch}
              className={
                touched.password && !validatePassword(form.password)
                  ? "invalid"
                  : ""
              }
            />
            {touched.password && !validatePassword(form.password) && (
              <p className={styles.errorMessage}>
                Password should be atleast 4 characters!
              </p>
            )}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="rePassword">Repeat password:</label>
            <input
              type="password"
              id="rePassword"
              name="rePassword"
              value={form.rePassword}
              onChange={handleChange}
              onBlur={handleTouch}
              className={
                touched.rePassword &&
                !validatePasswords(form.password, form.rePassword)
                  ? "invalid"
                  : ""
              }
            />
            {touched.rePassword &&
              !validatePasswords(form.password, form.rePassword) && (
                <p className={styles.errorMessage}>Passwords don't match!</p>
              )}
          </div>
        </div>
        <input
          type="submit"
          className="btn submit"
          value="Register"
          disabled={!isFormValid()}
        />
        <div className={styles.afterField}>
          <span>
            Already have an account? Click <Link to="/login">here</Link>
          </span>
        </div>
        {error ? <p className={styles.errorMessage}>{error}</p> : <></>}
      </form>
    </section>
  );
}
