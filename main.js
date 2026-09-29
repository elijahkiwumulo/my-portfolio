import { profileData } from '../data/profile.js';

document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize Icons
    lucide.createIcons();

    // 2. Populate Profile Data
    populateProfile();
    populateSkills();
    populateProjects();
    populateMediaTools();
    populateExperience();
    populateEducation();
    populateCertifications();

    // 3. Fetch GitHub Repos
    if (profileData.github.username) {
        fetchGitHubRepos(profileData.github.username);
    } else {
        document.getElementById('github-loading').classList.add('hidden');
        document.getElementById('github-error').classList.remove('hidden');
    }

    // 4. Setup Interactivity
    setupAnimations();
    setupMobileMenu();
    setupNavbar();
    
    // Set current year
    document.getElementById('year').textContent = new Date().getFullYear();
});

function populateProfile() {
    const { personal } = profileData;
    
    // Texts
    document.getElementById('nav-name').textContent = personal.name.split(' ')[0] + '.';
    document.getElementById('hero-name').textContent = personal.name;
    document.getElementById('hero-headline').textContent = personal.headline;
    document.getElementById('hero-desc').textContent = personal.shortDescription;
    document.getElementById('about-text').textContent = personal.about;
    document.getElementById('footer-name').textContent = personal.name;
    
    // Links
    document.getElementById('cv-btn').href = personal.cvLink;
    
    document.getElementById('contact-email').href = `mailto:${personal.email}`;
    document.getElementById('contact-email-text').textContent = personal.email;
    
    if(personal.whatsapp) {
        document.getElementById('contact-whatsapp').href = personal.whatsapp;
    }
    
    if(personal.linkedin) {
        document.getElementById('contact-linkedin').href = personal.linkedin;
    }

    document.getElementById('github-profile-btn').href = `https://github.com/${profileData.github.username}`;
    
    // Footer Socials
    const footerSocials = document.getElementById('footer-socials');
    footerSocials.innerHTML = `
        <a href="${personal.github}" target="_blank" class="text-slate-400 hover:text-white transition-colors">
            <i data-lucide="github"></i>
        </a>
        <a href="${personal.linkedin}" target="_blank" class="text-slate-400 hover:text-primary transition-colors">
            <i data-lucide="linkedin"></i>
        </a>
        <a href="${personal.whatsapp}" target="_blank" class="text-slate-400 hover:text-[#25D366] transition-colors">
            <i data-lucide="message-circle"></i>
        </a>
        <a href="mailto:${personal.email}" class="text-slate-400 hover:text-white transition-colors">
            <i data-lucide="mail"></i>
        </a>
    `;
    lucide.createIcons({ root: footerSocials });
}

function createSkillCard(title, skillsArray, icon) {
    const skillsHtml = skillsArray.map(skill => 
        `<span class="px-3 py-1 bg-slate-800 text-sm text-slate-300 rounded-full border border-slate-700 hover:border-primary/50 transition-colors cursor-default">${skill}</span>`
    ).join('');

    return `
        <div class="bg-cardBg p-6 rounded-2xl border border-slate-800 shadow-xl glow-card">
            <div class="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
                <i data-lucide="${icon}" class="text-primary w-6 h-6"></i>
            </div>
            <h3 class="text-xl font-bold text-white mb-4">${title}</h3>
            <div class="flex flex-wrap gap-2">
                ${skillsHtml}
            </div>
        </div>
    `;
}

function populateSkills() {
    const { skills } = profileData;
    const container = document.getElementById('skills-container');
    
    container.innerHTML = `
        ${createSkillCard('Programming & Development', skills.programming, 'terminal')}
        ${createSkillCard('IT & Computer Science', skills.itAndCs, 'server')}
        ${createSkillCard('Media & Production', skills.media, 'clapperboard')}
    `;
    lucide.createIcons({ root: container });
}

function populateProjects() {
    const { projects } = profileData;
    const container = document.getElementById('projects-container');
    
    container.innerHTML = projects.map(project => {
        const featuresHtml = project.features.map(f => 
            `<li class="flex items-start gap-2 text-sm text-slate-400"><i data-lucide="check-circle-2" class="w-4 h-4 text-primary shrink-0 mt-0.5"></i> <span>${f}</span></li>`
        ).join('');
        
        const techHtml = project.technology.map(t => 
            `<span class="text-xs font-medium px-2.5 py-1 bg-slate-800 text-slate-300 rounded border border-slate-700">${t}</span>`
        ).join('');

        return `
            <div class="bg-cardBg rounded-2xl border border-slate-800 overflow-hidden shadow-xl flex flex-col h-full glow-card">
                <div class="p-6 md:p-8 flex-grow flex flex-col">
                    <h3 class="text-2xl font-bold text-white mb-3">${project.title}</h3>
                    <p class="text-slate-400 mb-6">${project.description}</p>
                    
                    <h4 class="text-sm font-semibold text-white uppercase tracking-wider mb-3">Key Features</h4>
                    <ul class="space-y-2 mb-6 flex-grow">
                        ${featuresHtml}
                    </ul>
                    
                    <div class="flex flex-wrap gap-2 mb-8">
                        ${techHtml}
                    </div>
                    
                    <div class="flex gap-4 mt-auto pt-4 border-t border-slate-800">
                        ${project.liveLink ? 
                            `<a href="${project.liveLink}" target="_blank" class="flex-1 text-center py-2 bg-primary hover:bg-sky-500 text-white font-medium rounded-lg transition-colors text-sm">
                                View Project
                            </a>` : ''
                        }
                        ${project.githubLink ? 
                            `<a href="${project.githubLink}" target="_blank" class="flex-1 text-center py-2 bg-slate-800 hover:bg-slate-700 text-white font-medium rounded-lg border border-slate-700 transition-colors text-sm flex items-center justify-center gap-2">
                                <i data-lucide="github" class="w-4 h-4"></i> GitHub
                            </a>` : ''
                        }
                    </div>
                </div>
            </div>
        `;
    }).join('');
    lucide.createIcons({ root: container });
}

function populateMediaTools() {
    const { media } = profileData.skills;
    const container = document.getElementById('media-tools-container');
    
    container.innerHTML = media.map(tool => 
        `<span class="px-4 py-2 bg-cardBg border border-slate-800 text-slate-300 rounded-lg text-sm flex items-center gap-2">
            <i data-lucide="check" class="w-4 h-4 text-primary"></i> ${tool}
        </span>`
    ).join('');
    lucide.createIcons({ root: container });
}

function populateExperience() {
    const { experience } = profileData;
    const container = document.getElementById('experience-container');
    
    container.innerHTML = experience.map(exp => `
        <div class="relative pl-8 border-l-2 border-slate-800 pb-2">
            <div class="absolute -left-[9px] top-1 w-4 h-4 bg-primary rounded-full shadow-[0_0_10px_rgba(56,189,248,0.5)]"></div>
            <h3 class="text-xl font-bold text-white">${exp.role}</h3>
            <p class="text-primary font-medium mb-3">${exp.company}</p>
            <p class="text-slate-400 mb-4">${exp.description}</p>
            <ul class="space-y-2">
                ${exp.responsibilities.map(r => 
                    `<li class="flex items-start gap-2 text-sm text-slate-300">
                        <i data-lucide="arrow-right-circle" class="w-4 h-4 text-slate-500 shrink-0 mt-0.5"></i> ${r}
                    </li>`
                ).join('')}
            </ul>
        </div>
    `).join('');
    lucide.createIcons({ root: container });
}

function populateEducation() {
    const { education } = profileData;
    const container = document.getElementById('education-container');
    
    container.innerHTML = education.map(edu => `
        <div class="bg-slate-900 p-6 rounded-xl border border-slate-800">
            <h4 class="text-xl font-bold text-white">${edu.degree}</h4>
            <div class="flex flex-wrap items-center gap-x-4 gap-y-2 mt-2 mb-4 text-sm">
                <span class="text-primary font-medium"><i data-lucide="building" class="w-4 h-4 inline mr-1"></i> ${edu.institution}</span>
                <span class="text-slate-400 px-2 py-0.5 bg-slate-800 rounded-full">${edu.status}</span>
            </div>
            <div class="flex flex-wrap gap-2 mt-4 pt-4 border-t border-slate-800/50">
                ${edu.areas.map(area => `<span class="text-xs text-slate-400 bg-slate-950 px-2 py-1 rounded border border-slate-800">${area}</span>`).join('')}
            </div>
        </div>
    `).join('');
    lucide.createIcons({ root: container });
}

function populateCertifications() {
    const { certifications } = profileData;
    const container = document.getElementById('certs-container');
    
    container.innerHTML = certifications.map(cert => `
        <a href="${cert.link}" target="_blank" class="block bg-cardBg p-4 rounded-xl border border-slate-800 hover:border-primary/50 transition-colors group">
            <div class="flex items-start justify-between">
                <div>
                    <h4 class="text-white font-medium group-hover:text-primary transition-colors">${cert.name}</h4>
                    <p class="text-sm text-slate-400 mt-1">${cert.issuer} ${cert.date ? `• ${cert.date}` : ''}</p>
                </div>
                <i data-lucide="external-link" class="w-4 h-4 text-slate-600 group-hover:text-primary transition-colors"></i>
            </div>
        </a>
    `).join('');
    lucide.createIcons({ root: container });
}

async function fetchGitHubRepos(username) {
    const loading = document.getElementById('github-loading');
    const error = document.getElementById('github-error');
    const container = document.getElementById('github-container');
    
    try {
        const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=6`);
        
        if (!response.ok) {
            throw new Error('GitHub API Error');
        }
        
        const repos = await response.json();
        loading.classList.add('hidden');
        
        if (repos.length === 0) {
            container.innerHTML = `<div class="col-span-full text-center text-slate-400 py-8">No public repositories found for user ${username}.</div>`;
            return;
        }

        container.innerHTML = repos.filter(repo => !repo.fork).map(repo => `
            <a href="${repo.html_url}" target="_blank" class="bg-cardBg p-6 rounded-xl border border-slate-800 hover:border-slate-600 transition-all group flex flex-col h-full glow-card">
                <div class="flex justify-between items-start mb-4">
                    <h3 class="text-lg font-bold text-white group-hover:text-primary transition-colors truncate pr-4">${repo.name}</h3>
                    <i data-lucide="github" class="w-5 h-5 text-slate-500 group-hover:text-white transition-colors shrink-0"></i>
                </div>
                <p class="text-sm text-slate-400 mb-6 flex-grow line-clamp-3">${repo.description || 'No description provided.'}</p>
                <div class="flex items-center justify-between mt-auto">
                    <div class="flex items-center gap-4 text-xs text-slate-500">
                        ${repo.language ? `<span class="flex items-center gap-1"><span class="w-2 h-2 rounded-full bg-primary"></span> ${repo.language}</span>` : ''}
                        <span class="flex items-center gap-1"><i data-lucide="star" class="w-3 h-3"></i> ${repo.stargazers_count}</span>
                        <span class="flex items-center gap-1"><i data-lucide="git-fork" class="w-3 h-3"></i> ${repo.forks_count}</span>
                    </div>
                </div>
            </a>
        `).join('');
        lucide.createIcons({ root: container });

    } catch (err) {
        console.error("Failed to fetch GitHub repos:", err);
        loading.classList.add('hidden');
        error.classList.remove('hidden');
    }
}

function setupAnimations() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in-section').forEach(section => {
        observer.observe(section);
    });
}

function setupMobileMenu() {
    const btn = document.getElementById('mobile-menu-btn');
    const menu = document.getElementById('mobile-menu');
    const links = document.querySelectorAll('.mobile-link');
    
    btn.addEventListener('click', () => {
        menu.classList.toggle('hidden');
    });
    
    links.forEach(link => {
        link.addEventListener('click', () => {
            menu.classList.add('hidden');
        });
    });
}

function setupNavbar() {
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('shadow-lg', 'bg-slate-900/90');
            navbar.classList.remove('py-4');
            navbar.classList.add('py-3');
        } else {
            navbar.classList.remove('shadow-lg', 'bg-slate-900/90');
            navbar.classList.add('py-4');
            navbar.classList.remove('py-3');
        }
    });
}
