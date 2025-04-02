import { useNavigate, useParams, Navigate } from "react-router";
import { useEditUser, useGetUser } from "../../api/authApi";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../contexts/UserContext";
import styles from "./EditProfile.module.css";

export default function EditProfile() {
  const { editUserProfile } = useEditUser();
  const navigate = useNavigate();
  const { fetchedUser } = useParams();
  const { user, loading } = useGetUser(fetchedUser);
  const [error, setError] = useState(null);
  const { userId } = useContext(UserContext);
  const [formData, setFormData] = useState(
    { profileImageUrl: user?.imageUrl, bio: user?.bio } || {}
  );
  const [isDisabled, setDisabled] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData({
        profileImageUrl: user.profileImageUrl || "",
        bio: user.bio || "",
      });
    }
  }, [user]);
  if (loading) {
    return <p>Loading info...</p>;
  }

  if (user._id !== userId) {
    return <Navigate to="/" replace />;
  }

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitEditAction = async (e) => {
    const { profileImageUrl, bio } = formData;
    let isValid = profileImageUrl && bio;
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
      await editUserProfile(user._id, { profileImageUrl, bio });
      navigate(`/user/${user._id}`);
    } catch (err) {
      setError(err.message);
      setTimeout(() => {
        setError(null);
      }, 3000);
    }
  };

  return (
    <div id="formHolder">
      <form className={styles.loginForm} action={submitEditAction}>
        <div className={styles.headers}>
          <h1>Update user info</h1>
        </div>
        <div className={styles.groups}>
          <div className={styles.formGroup}>
            <label htmlFor="profileImageUrl">Image Url:</label>
            <input
              type="text"
              id="profileImageUrl"
              name="profileImageUrl"
              value={formData.profileImageUrl}
              onChange={handleInputChange}
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="bio">Bio:</label>
            <input
              type="text"
              id="bio"
              name="bio"
              value={formData.bio}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <input
          type="submit"
          className="btn submit"
          value="Edit Profile Info"
          disabled={isDisabled}
        />
        {error ? <p className={styles.errorMessage}>{error}</p> : <></>}
      </form>
    </div>
  );
}
