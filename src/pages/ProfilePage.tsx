import React, { useEffect } from "react";
import { useUnit } from "effector-react";
import { authModel } from "../features/auth/model/store";

const ProfilePage: React.FC = () => {
  const auth = useUnit(authModel.$auth);

  useEffect(() => {
    if (!auth.user) {
      authModel.meFx();
    }
  }, []);

  return (
    <div style={{ padding: 24 }}>
      <h2>Profile</h2>
      {auth.user ? (
        <div>
          <p>Name: {auth.user.name}</p>
          <p>Email: {auth.user.email}</p>
          <p>Roles: {auth.user.roles.join(", ")}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ProfilePage;
