import type { ReactNode } from 'react';

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
}: SEOProps): ReactNode => {
  
  const siteTitle = "VPrime Lights";
  const fullTitle = `${title} | ${siteTitle}`;

  return (
    <>
      <title>{fullTitle}</title> 
      <meta name="description" content={description} />
      
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
    </>
  );
};

export default SEO;