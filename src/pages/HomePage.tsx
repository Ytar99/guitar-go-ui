import React from "react";

const HomePage: React.FC = () => (
  <div style={{ padding: 24 }}>
    <h2>Welcome</h2>
    <p>Public content</p>
    <p>
      This is a public page accessible to all users. You can navigate to the
      <a href="/login"> Login</a> page to access your account or the <a href="/profile">Profile</a> page to view your
      profile information.
    </p>
  </div>
);

export default HomePage;
