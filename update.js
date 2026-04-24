const fs = require('fs');
const path = require('path');

const dir = __dirname;
const files = ['index.html', 'services.html', 'projects.html', 'booking.html', 'admin.html'];

files.forEach(file => {
    const filePath = path.join(dir, file);
    if (fs.existsSync(filePath)) {
        let content = fs.readFileSync(filePath, 'utf8');

        // Extract and replace <style> block
        content = content.replace(/<style>[\s\S]*?<\/style>/, '<link rel="stylesheet" href="style.css">');

        // Extract and replace <script> block for toggleMenu and others
        content = content.replace(/<script>[\s\S]*?<\/script>/, '<script src="script.js"></script>');

        // Enhance sections by adding 'reveal' class where appropriate (for services, etc)
        // Avoid touching already revealed sections
        if (file === 'services.html') {
            content = content.replace(/class="services-grid"/, 'class="services-grid reveal"');
            content = content.replace(/class="page-header"/, 'class="page-header reveal"');
        } else if (file === 'projects.html') {
            content = content.replace(/class="projects-grid"/, 'class="projects-grid reveal"');
            content = content.replace(/class="page-header"/, 'class="page-header reveal"');
        } else if (file === 'booking.html') {
            content = content.replace(/class="booking-section"/, 'class="booking-section reveal"');
            content = content.replace(/class="page-header"/, 'class="page-header reveal"');
            content = content.replace(/class="form-container"/, 'class="form-container reveal"');
        } else if (file === 'admin.html') {
            content = content.replace(/class="admin-container"/, 'class="admin-container reveal"');
        }

        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Updated ${file}`);
    }
});
