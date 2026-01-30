# Amblitz Design - Luxury Interior Design Website

A luxurious, elegant website for Amblitz Design interior design company featuring a black and rich gold color scheme.

## 🌐 Pages

1. **Home** (`index.html`) - Hero section, services, featured projects, about preview, testimonials, CTA
2. **About** (`pages/about.html`) - Company story, design philosophy, team members, process
3. **Projects** (`pages/projects.html`) - Portfolio with filterable project categories
4. **Gallery** (`pages/gallery.html`) - Image gallery with lightbox functionality
5. **Contact** (`pages/contact.html`) - Contact form with EmailJS integration, FAQ

## 🎨 Design Features

- **Color Scheme**: Black (#0A0A0A) + Rich Gold (#D4AF37)
- **Typography**: Playfair Display (headings) + Lato (body)
- **Fully Responsive**: Mobile-first design
- **Animations**: Scroll-triggered animations, hover effects
- **Lightbox**: Gallery image viewer with navigation

## 📁 Project Structure

```
amblitz/
├── index.html              # Home page
├── css/
│   └── styles.css          # Main stylesheet
├── js/
│   ├── main.js             # Main JavaScript (navigation, animations, lightbox)
│   ├── contact.js          # Contact form with EmailJS
│   └── components.js       # Component loader for header/footer
├── components/
│   ├── header.html         # Reusable header component
│   └── footer.html         # Reusable footer component
├── pages/
│   ├── about.html          # About page
│   ├── projects.html       # Projects/Portfolio page
│   ├── gallery.html        # Gallery page
│   └── contact.html        # Contact page
└── images/                 # (Add your images here)
```

## 🧩 Component System

The header and footer are maintained as separate reusable components:

- **`components/header.html`** - Navigation header (edit once, updates everywhere)
- **`components/footer.html`** - Site footer with links and contact info

Components are loaded dynamically via `js/components.js`. This ensures:
- **DRY principle**: No repeated code across pages
- **Easy maintenance**: Update header/footer in one place
- **Automatic active states**: Navigation highlights current page automatically

## 📧 EmailJS Setup (Contact Form)

To enable the contact form to send emails to your inbox:

1. **Create EmailJS Account**: Go to [emailjs.com](https://www.emailjs.com/) and sign up (free tier: 200 emails/month)

2. **Add Email Service**:
   - Dashboard → Email Services → Add New Service
   - Connect your Gmail/Outlook/other email

3. **Create Email Template**:
   - Dashboard → Email Templates → Create New Template
   - Use these template variables:
     ```
     From: {{first_name}} {{last_name}}
     Email: {{email}}
     Message: {{message}}
     ```

4. **Update Configuration**:
   - Open `js/contact.js`
   - Replace these values with your actual IDs:
     ```javascript
     const EMAILJS_PUBLIC_KEY = 'YOUR_PUBLIC_KEY';
     const EMAILJS_SERVICE_ID = 'YOUR_SERVICE_ID';
     const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID';
     ```

## 🚀 Deployment on Hostinger

1. **Prepare Files**: Ensure all files are ready in your local project folder

2. **Upload to Hostinger**:
   - Log in to Hostinger → File Manager
   - Navigate to `public_html`
   - Upload all files maintaining the folder structure

3. **Verify**: Visit your domain to confirm the site is live

## 🛠️ Local Development

Simply open `index.html` in a browser, or use a local server:

```bash
# Using Python
python -m http.server 8000

# Using Node.js (npx)
npx serve

# Using PHP
php -S localhost:8000
```

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## 🔧 Customization

### Changing Colors
Edit CSS variables in `css/styles.css`:
```css
:root {
    --gold: #D4AF37;          /* Primary gold */
    --gold-light: #E8C547;    /* Light gold */
    --black: #0A0A0A;         /* Primary black */
    --black-light: #1A1A1A;   /* Card backgrounds */
}
```

### Changing Fonts
Update Google Fonts link in HTML files and CSS:
```css
:root {
    --font-heading: 'Playfair Display', serif;
    --font-body: 'Lato', sans-serif;
}
```

### Adding Real Images
Replace Unsplash URLs with your own images. Recommended sizes:
- Hero images: 2000px wide
- Project cards: 800px wide
- Gallery images: 800px wide
- Team photos: 600px wide

## 📄 License

© 2026 Amblitz Design. All rights reserved.
