// modules/changeManager.js
import { supabase } from "./supabaseClient.js";


export async function loadChanges() {
    console.log("test initiated");
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return console.log("No user signed in!");

  const { data, error } = await supabase
    .from("users")
    .select("changes")
    .eq("id", user.id)
    .single();

  if (error) console.error("Error loading changes:", error);
  else if (data?.changes) {
    localStorage.setItem("currentVersion", JSON.stringify(data.changes));
    console.log("Loaded changes:", data.changes);
  } else {
    console.log("No changes found for this user.");
  }
}

/**
 * Apply changes from Supabase (currentVersion) + local changes
 */
export function applyChanges() {
  const currentVersion = JSON.parse(localStorage.getItem("currentVersion")) || [];

  if (!currentVersion.length) {
    console.log("No changes to apply!");
    return;
  }
 console.log("changes to apply")

  // Apply changes from database to DOM
  currentVersion.forEach(change => {
    console.log(change.id)
    const element = document.getElementById(change.id);
    if (!element) {
        return
    };
    if (change.type === "background"){
      document.body.style.backgroundColor = change.changes.backgroundColor;
      console.log(change.changes.backgroundColor)
      return;
    };

    console.log(element);
    console.log(change)

    switch (change.type) {
      case "text":
        element.style.color = change.changes.color;
        console.log(change.color);
        element.style.fontSize = change.changes.fontSize;
        element.innerText = change.changes.text;
        break;
      case "button":
        element.style.color = change.changes.color;
        element.style.fontSize = change.changes.fontSize;
        element.style.backgroundColor = change.changes.backgroundColor;
        element.innerText = change.changes.text;
        break;
    }
  });
}
