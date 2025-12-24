import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description?: string;
  image?: string; // Optional: URL to an image for social media previews
  url?: string;   // Optional: Canonical URL for this page
  type?: string;  // Optional: 'website' or 'article'
}

export const SEO = ({ 
  title, 
  description = "Професионални услуги за вашия дом и бизнес.", // Default description if none provided
  image, 
  url,
  type = 'website' 
}: SEOProps) => {
  
  return (
    <Helmet>
      {/* Standard Metadata */}
      <title>{title}</title>
      <meta name="description" content={description} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      {image && <meta property="og:image" content={image} />}
      {url && <meta property="og:url" content={url} />}

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      {image && <meta name="twitter:image" content={image} />}
    </Helmet>
  );
};