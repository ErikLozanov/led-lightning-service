import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description?: string;
  image?: string;
  type?: string;
}

const SEO = ({ 
  title, 
  description = "Професионално реставриране и тунинг на фарове. Вижте пътя ясно отново с VPrime Lights.",
  image = "/hero-mobile.mp4", 
  type = "website" 
}: SEOProps) => {
  
  const siteTitle = "VPrime Lights";
  const fullTitle = `${title} | ${siteTitle}`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} /> 
      
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
    </Helmet>
  );
};

export default SEO;