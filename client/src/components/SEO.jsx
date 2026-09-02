import React, { useEffect } from 'react';

const setMetaTag = (attrName, attrValue, content) => {
  let element = document.querySelector(`meta[${attrName}="${attrValue}"]`);
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attrName, attrValue);
    document.head.appendChild(element);
  }
  element.setAttribute('content', content);
};

export default function SEO({
  title = 'Pune to Mumbai Cab Service | One Way & Round Trip Taxi',
  description = 'Book Pune to Mumbai & Mumbai to Pune cabs at best fares. Sedan, Ertiga SUV & Innova Crysta one-way or round-trip taxi with zero advance fee.',
  keywords = 'pune to mumbai cab, mumbai to pune cab, pune mumbai taxi service, expressway cab service, pune airport cab, mumbai airport drop, innova crysta cab pune to mumbai, ertiga taxi pune mumbai',
  canonicalUrl,
  jsonLd
}) {
  useEffect(() => {
    // 1. Title (Optimal 50-60 characters)
    document.title = title;

    // 2. Description (Optimal 150-160 characters)
    setMetaTag('name', 'description', description);

    // 3. Keywords Meta Tag
    setMetaTag('name', 'keywords', keywords);

    // 4. Author & Publisher Meta Tags
    setMetaTag('name', 'author', 'Pune ↔ Mumbai Cabs');
    setMetaTag('name', 'publisher', 'Pune ↔ Mumbai Cab Services Ltd');

    // 5. Robots Meta Tag
    setMetaTag('name', 'robots', 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1');

    // 6. Open Graph Tags
    setMetaTag('property', 'og:title', title);
    setMetaTag('property', 'og:description', description);
    setMetaTag('property', 'og:type', 'website');
    setMetaTag('property', 'og:url', canonicalUrl || window.location.href);
    setMetaTag('property', 'og:site_name', 'Pune ↔ Mumbai Cabs');

    // 7. Twitter Card Tags
    setMetaTag('name', 'twitter:card', 'summary_large_image');
    setMetaTag('name', 'twitter:title', title);
    setMetaTag('name', 'twitter:description', description);

    // 8. Canonical Link Tag
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = canonicalUrl || window.location.href;

    // 9. JSON-LD Schema Script
    if (jsonLd) {
      const scriptId = 'json-ld-schema';
      let existingScript = document.getElementById(scriptId);
      if (existingScript) {
        existingScript.remove();
      }
      const script = document.createElement('script');
      script.id = scriptId;
      script.type = 'application/ld+json';
      script.text = JSON.stringify(jsonLd);
      document.head.appendChild(script);
    }
  }, [title, description, keywords, canonicalUrl, jsonLd]);

  return null;
}
