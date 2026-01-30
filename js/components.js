/* ============================================
   AMBLITZ DESIGN - Component Loader
   Loads reusable header and footer components
   ============================================ */

/**
 * Loads an HTML component from a file and injects it into a placeholder element.
 * @param {string} componentPath - Path to the component HTML file
 * @param {string} placeholderId - ID of the placeholder element
 * @param {Function} callback - Optional callback after component is loaded
 */
async function loadComponent(componentPath, placeholderId, callback) {
    try {
        const response = await fetch(componentPath);

        if (!response.ok) {
            throw new Error(`Failed to load component: ${componentPath}`);
        }

        const html = await response.text();
        const placeholder = document.getElementById(placeholderId);

        if (placeholder) {
            placeholder.innerHTML = html;
            placeholder.classList.add('component-loaded');

            if (callback && typeof callback === 'function') {
                callback();
            }
        }
    } catch (error) {
        console.error('Component loading error:', error);
    }
}

/**
 * Sets the active navigation link based on current page
 */
function setActiveNavLink() {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-menu a');

    navLinks.forEach(link => {
        link.classList.remove('active');

        const linkPath = link.getAttribute('href');
        const dataPage = link.getAttribute('data-page');

        // Check if current path matches
        if (currentPath === linkPath ||
            currentPath.endsWith(linkPath) ||
            (dataPage === 'home' && (currentPath === '/' || currentPath.endsWith('index.html')))) {
            link.classList.add('active');
        }
    });
}

/**
 * Initialize all components on page load
 */
async function initComponents() {
    // Determine base path based on current page location
    const isInSubfolder = window.location.pathname.includes('/pages/');
    const basePath = isInSubfolder ? '..' : '.';

    // Load header
    await loadComponent(
        `${basePath}/components/header.html`,
        'header-placeholder',
        () => {
            setActiveNavLink();
            window.initMobileMenu(); // Re-initialize mobile menu after header loads
            window.initHeader(); // Re-initialize header scroll effect
        }
    );

    // Load footer
    await loadComponent(
        `${basePath}/components/footer.html`,
        'footer-placeholder'
    );
}

// Initialize components when DOM is ready
document.addEventListener('DOMContentLoaded', initComponents);
