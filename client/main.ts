async function loadProfile() {
  try {
    const response = await fetch('http://localhost:3000/api/profile');
    const data = await response.json();

    (document.getElementById('fullName') as HTMLElement).textContent = data.fullName;
    (document.getElementById('bio') as HTMLElement).textContent = data.bio;
    (document.getElementById('email') as HTMLElement).textContent = data.email;

    const skillsList = document.getElementById('skillsList') as HTMLElement;
    skillsList.innerHTML = '';
    data.skills.forEach((skill: string) => {
      const li = document.createElement('li');
      li.textContent = skill;
      skillsList.appendChild(li);
    });

    const projectsList = document.getElementById('projectsList') as HTMLElement;
    projectsList.innerHTML = '';
    data.projects.forEach((project: any) => {
      const div = document.createElement('div');
      div.className = 'project';
      div.innerHTML = `
        <h3>${project.title}</h3>
        <p>${project.description}</p>
        ${project.link ? `<a href="${project.link}" target="_blank">Voir le projet</a>` : ''}
      `;
      projectsList.appendChild(div);
    });

  } catch (error) {
    console.error('Erreur lors du chargement du profil :', error);
  }
}

loadProfile();
