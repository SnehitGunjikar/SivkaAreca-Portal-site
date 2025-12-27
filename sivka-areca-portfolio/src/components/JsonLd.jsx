import React from 'react';
import { Helmet } from 'react-helmet-async';

const JsonLd = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Sivka Areca Enterprises",
    "image": "https://www.sivkaareca.com/og-image.jpg",
    "@id": "https://www.sivkaareca.com/",
    "url": "https://www.sivkaareca.com/",
    "telephone": ["+91-8104478208", "+91-95912-53590"],
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Khanapur",
      "addressLocality": "Khanapur",
      "addressRegion": "Karnataka",
      "postalCode": "591302",
      "addressCountry": "IN"
    },
    "sameAs": [
      "https://www.facebook.com/sivkaareca",
      "https://www.instagram.com/sivkaareca"
    ]
  };

  return (
    <script type="application/ld+json">
      {JSON.stringify(structuredData)}
    </script>
  );
};

export default JsonLd;
