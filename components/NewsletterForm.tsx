'use client';

import { useState } from 'react';

export default function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      // Ici vous pouvez appeler votre API d'inscription
      console.log('Inscription newsletter:', email);
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  return (
    <form className="newsletter-form" onSubmit={handleSubmit}>
      <input
        type="email"
        placeholder="Votre adresse email"
        className="newsletter-input"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <button type="submit" className="newsletter-button">
        S'abonner
      </button>
      {subscribed && (
        <p className="text-green-200 text-sm mt-2">✅ Merci pour votre inscription !</p>
      )}
    </form>
  );
}