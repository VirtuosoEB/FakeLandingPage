import { supabase } from "./supabaseClient.js";

document.addEventListener("DOMContentLoaded", async () => {
  console.log("Hello World!");

  // --- Check if user is already logged in ---
  const { data: { user } } = await supabase.auth.getUser();
  if (user) {
    console.log("Already logged in:", user.email);
    window.location.href = "./index.html";
  }

  // --- Monitor auth state ---
  supabase.auth.onAuthStateChange((event, session) => {
    if (session?.user) {
      console.log("logged in");
      window.location.href = "./index.html";
    } else {
      console.log("logged out");
    }
  });

  // --- Signup ---
  const signupForm = document.getElementById("signupForm");
  if (signupForm) {
    signupForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const email = e.target.email.value;
      const password = e.target.password.value;

      const { data, error } = await supabase.auth.signUp({ email, password });
      if (error) alert(error.message);
      else alert("Signed up: " + data.user.email);
    });
  }

  // --- Login ---
  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const email = e.target.email.value;
      const password = e.target.password.value;

      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) alert(error.message);
      else alert("Logged in: " + data.user.email);
    });
  }

  // --- Logout ---
  const logoutBtn = document.getElementById("logoutBtn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", async () => {
      const { error } = await supabase.auth.signOut();
      if (error) alert(error.message);
      else alert("Logged out!");
    });
  }

  // --- Password reset ---
  const resetBtn = document.getElementById("resetBtn");
  if (resetBtn) {
    resetBtn.addEventListener("click", async () => {
      const email = prompt("Enter your email for password reset:");
      if (!email) return;

      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: window.location.origin + "/reset-password.html",
      });

      if (error) alert(error.message);
      else alert("Reset email sent!");
    });
  }
});
