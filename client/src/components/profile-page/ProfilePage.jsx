import { useParams, Link } from "react-router";
import { useGetUser } from "../../api/authApi";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../contexts/UserContext";
import CatalogItem from "../catalog/CatalogItem";
import styles from "./ProfilePage.module.css";

export default function ProfilePage() {
  const { fetchedUser } = useParams();
  const { user, loading } = useGetUser(fetchedUser);
  const { userId } = useContext(UserContext);

  const defaultAvatar = "/images/stock-avatar.jpg";
  const [imageSrc, setImageSrc] = useState(defaultAvatar);

  useEffect(() => {
    if (user?.profileImageUrl) {
      setImageSrc(user.profileImageUrl);
    }
  }, [user]);

  return (
    <section>
      {loading ? (
        <p>Loading...</p>
      ) : user ? (
        <div className={styles.wrapper}>
          <div className={styles.userInfo}>
            <p>{user.username}</p>
            <img
              src={imageSrc}
              alt="User Profile Photo"
              onError={() => setImageSrc(defaultAvatar)}
            />
            <h3>Bio:</h3>
            <article>
              <p>{user.bio}</p>
            </article>

            {userId === user._id ? (
              <div id="profileButtons">
                <Link to={`/user/${user._id}/edit`}>
                  <button>Edit Profile</button>
                </Link>
              </div>
            ) : (
              <> </>
            )}
          </div>

          <div className={styles.likedPosts}>
            <h3>Recommended Cameras</h3>
            <div className={styles.postHolder}>
              {user.likedPosts?.length > 0 ? (
                user.likedPosts.map((post) => (
                  <div key={post._id}>
                    <CatalogItem {...post} />
                  </div>
                ))
              ) : (
                <p>No liked posts yet</p>
              )}
            </div>
          </div>
          <div className={styles.likedPosts}>
            <h3>Created Posts</h3>
            <div className={styles.postHolder}>
              {user.createdPosts?.length > 0 ? (
                user.createdPosts.map((post) => (
                  <div key={post._id}>
                    <CatalogItem {...post} />
                  </div>
                ))
              ) : (
                <p>No liked posts yet</p>
              )}
            </div>
          </div>
        </div>
      ) : (
        <p>Can't find user</p>
      )}
    </section>
  );
}
