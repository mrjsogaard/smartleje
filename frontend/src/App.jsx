import React from 'react';
import { useCriiptoVerify, AuthMethodSelector } from '@criipto/verify-react';

function App() {
  const { login, user, logout } = useCriiptoVerify({
    domain: 'test.verify.criipto.com',
    clientID: 'urn:criipto:demo:app',
    redirectUri: window.location.origin
  });

  if (user) {
    return (
      <div style={{ padding: 20, fontFamily: 'Arial' }}>
        <h1>✅ MitID godkendt!</h1>
        <p>Navn: <strong>{user.name}</strong></p>
        <p>CPR-hash: <code>{user.sub}</code></p>
        <button onClick={logout}>Log ud</button>
        <p><i>Send hash til blockchain → logget i Notion</i></p>
      </div>
    );
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>SmartLeje – Log ind med MitID</h1>
      <AuthMethodSelector onChoose={(method) => login({ method })} />
    </div>
  );
}

export default App;
