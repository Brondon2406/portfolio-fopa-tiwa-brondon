interface Profile {
  name: string;
  title: string;
  bio: string;
  skills: string[];
  projects: { name: string; description: string; link: string }[];
  contact: {
    email: string;
    linkedin: string;
    github: string;
  };
}

const API_URL = "http://localhost:3000/api/profile"; // À modifier lors du déploiement

const form = document.getElementById("profileForm") as HTMLFormElement;
const message = document.getElementById("message") as HTMLParagraphElement;

async function loadProfile() {
  const res = await fetch(API_URL);
  const data: Profile = await res.json();

  (document.getElementById("name") as HTMLInputElement).value = data.name;
  (document.getElementById("title") as HTMLInputElement).value = data.title;
  (document.getElementById("bio") as HTMLTextAreaElement).value = data.bio;
  (document.getElementById("skills") as HTMLInputElement).value = data.skills.join(", ");
  
  const project = data.projects[0] || { name: "", description: "", link: "" };
  (document.getElementById("projectName") as HTMLInputElement).value = project.name;
  (document.getElementById("projectDescription") as HTMLTextAreaElement).value = project.description;
  (document.getElementById("projectLink") as HTMLInputElement).value = project.link;

  (document.getElementById("email") as HTMLInputElement).value = data.contact.email;
  (document.getElementById("linkedin") as HTMLInputElement).value = data.contact.linkedin;
  (document.getElementById("github") as HTMLInputElement).value = data.contact.github;
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const updatedProfile: Profile = {
    name: (document.getElementById("name") as HTMLInputElement).value,
    title: (document.getElementById("title") as HTMLInputElement).value,
    bio: (document.getElementById("bio") as HTMLTextAreaElement).value,
    skills: (document.getElementById("skills") as HTMLInputElement).value.split(",").map(s => s.trim()),
    projects: [
      {
        name: (document.getElementById("projectName") as HTMLInputElement).value,
        description: (document.getElementById("projectDescription") as HTMLTextAreaElement).value,
        link: (document.getElementById("projectLink") as HTMLInputElement).value,
      }
    ],
    contact: {
      email: (document.getElementById("email") as HTMLInputElement).value,
      linkedin: (document.getElementById("linkedin") as HTMLInputElement).value,
      github: (document.getElementById("github") as HTMLInputElement).value,
    }
  };

  const res = await fetch(API_URL, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedProfile)
  });

  const result = await res.json();
  message.textContent = result.message || "Données mises à jour !";
});

loadProfile();
