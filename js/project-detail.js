// Project Detail Page - Dynamic Content Loader
document.addEventListener('DOMContentLoaded', async function () {
    // Get project ID from URL parameter
    const urlParams = new URLSearchParams(window.location.search);
    const projectId = urlParams.get('id');

    if (!projectId) {
        console.error('No project ID provided');
        window.location.href = 'projects.html';
        return;
    }

    try {
        // Fetch projects data
        const response = await fetch('../js/projects-data.json');
        const data = await response.json();

        // Find the specific project
        const project = data.projects.find(p => p.id === projectId);

        if (!project) {
            console.error('Project not found');
            window.location.href = 'projects.html';
            return;
        }

        // Update page title
        document.title = `${project.title} | Amblitz Design`;

        // Update meta description
        const metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc) {
            metaDesc.content = `${project.title} - ${project.description[0]}`;
        }

        // Render banner
        renderBanner(project);

        // Render project details
        renderProjectDetails(project);

        // Render related projects
        renderRelatedProjects(data.projects, project);

    } catch (error) {
        console.error('Error loading project data:', error);
    }
});

function renderBanner(project) {
    const banner = document.querySelector('.project-banner');
    banner.style.backgroundImage = `url('${project.mainImage}')`;

    const title = document.querySelector('.project-banner-title');
    const category = document.querySelector('.project-banner-category');

    title.textContent = project.title;
    category.textContent = project.category;
}

function renderProjectDetails(project) {
    const detailGrid = document.querySelector('.project-detail-grid');

    detailGrid.innerHTML = `
        <div class="project-detail-image" data-aos="fade-right">
            <img src="${project.mainImage}" alt="${project.title}">
        </div>

        <div class="project-detail-content" data-aos="fade-left">
            ${project.description.map(para => `<p>${para}</p>`).join('')}

            <div class="project-meta">
                <div class="meta-item">
                    <i class="fas fa-map-marker-alt"></i>
                    <div>
                        <strong>Location</strong>
                        <span>${project.location}</span>
                    </div>
                </div>
                <div class="meta-item">
                    <i class="fas fa-ruler-combined"></i>
                    <div>
                        <strong>Size</strong>
                        <span>${project.size}</span>
                    </div>
                </div>
                <div class="meta-item">
                    <i class="fas fa-calendar-alt"></i>
                    <div>
                        <strong>Completed</strong>
                        <span>${project.completed}</span>
                    </div>
                </div>
                <div class="meta-item">
                    <i class="fas fa-tag"></i>
                    <div>
                        <strong>Category</strong>
                        <span>${project.category}</span>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function renderGallery(project) {
    const galleryGrid = document.querySelector('.project-gallery-grid');

    // Generate gallery items
    galleryGrid.innerHTML = project.galleryImages.map((image, index) => {
        return `
            <div class="gallery-item" data-aos="fade-up">
                <img src="${image}" alt="${project.title} Gallery ${index + 1}" loading="lazy">
            </div>
        `;
    }).join('');

    // Calculate row spans after images load
    const items = galleryGrid.querySelectorAll('.gallery-item');
    items.forEach((item, index) => {
        const img = item.querySelector('img');

        // Set initial span while loading
        item.style.gridRowEnd = 'span 25';

        img.onload = function () {
            const rowHeight = 10;
            const height = img.naturalHeight;
            const width = img.naturalWidth;
            const itemWidth = item.offsetWidth;
            const scaledHeight = (height / width) * itemWidth;
            const rowSpan = Math.ceil(scaledHeight / rowHeight);
            item.style.gridRowEnd = `span ${rowSpan}`;
        };

        // Handle cached images
        if (img.complete) {
            img.onload();
        }
    });
}

function renderRelatedProjects(allProjects, currentProject) {
    const relatedGrid = document.querySelector('.projects-grid');

    // Get projects from the same category, excluding current project
    let relatedProjects = allProjects.filter(p =>
        p.category === currentProject.category && p.id !== currentProject.id
    );

    // If less than 3 related projects, fill with other projects
    if (relatedProjects.length < 3) {
        const otherProjects = allProjects.filter(p =>
            p.id !== currentProject.id && !relatedProjects.includes(p)
        );
        relatedProjects = [...relatedProjects, ...otherProjects];
    }

    // Take only first 3
    relatedProjects = relatedProjects.slice(0, 3);

    relatedGrid.innerHTML = relatedProjects.map((project, index) => {
        const delay = (index + 1) * 100;
        return `
            <a href="project-detail.html?id=${project.id}" class="project-card" data-aos="fade-up" data-aos-delay="${delay}">
                <img src="${project.mainImage}" alt="${project.title}">
                <div class="project-overlay">
                    <span>${project.category}</span>
                    <h4>${project.title}</h4>
                </div>
            </a>
        `;
    }).join('');
}
