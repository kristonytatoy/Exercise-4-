"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (event) => {
    event.preventDefault();
    setError("");

    const cleanEmail = email.trim();
    if (!cleanEmail) {
      setError("Please enter your email address.");
      return;
    }
    if (!/^[^\s@]+@gmail\.com$/i.test(cleanEmail)) {
      setError("Please use a valid Gmail address ending in @gmail.com.");
      return;
    }
    if (password.length <= 5) {
      setError("Password must be more than 5 characters.");
      return;
    }

    // This is a front-end class exercise, not secure authentication.
    localStorage.setItem("notepadLoggedIn", "true");
    router.push("/notes");
  };

  return (
    <main className="login-page">
      <section className="login-card">
        <div className="login-mark" aria-hidden="true">N<span>+</span></div>
        <p className="login-eyebrow">YOUR SPACE, YOUR THOUGHTS</p>
        <h1 className="login-title">Welcome back<span>.</span></h1>
        <p className="login-description">Sign in to keep your ideas organized.</p>

        <form className="login-form" onSubmit={handleLogin} noValidate>
          <label htmlFor="email">Email address</label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            placeholder="you@gmail.com"
            value={email}
            onChange={(event) => { setEmail(event.target.value); setError(""); }}
          />

          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            autoComplete="current-password"
            placeholder="Enter at least 6 characters"
            value={password}
            onChange={(event) => { setPassword(event.target.value); setError(""); }}
          />

          <button className="login-button" type="submit">Login <span>→</span></button>
          <p className={error ? "login-error" : "login-hint"} aria-live="polite">
            {error || "Use a Gmail address and a password longer than 5 characters."}
          </p>
        </form>
        <div className="login-footer"><p>Don&apos;t have an account?{" "}
    <a href="/signup">Sign up</a>
  </p>
</div>
      </section>
      <div className="login-decoration decoration-one" />
      <div className="login-decoration decoration-two" />
    </main>
  );
}
