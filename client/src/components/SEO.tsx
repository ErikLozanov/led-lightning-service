

interface SEOProps {
  title: string;
  description?: string;
  image?: string;
  type?: string;
}

const SEO = ({ 
  title, 
  description = "Професионално реставриране и тунинг на фарове. Вижте пътя ясно отново с VPrime Lights.", 
  image = "/social-image.jpg", 
  type = "website" 
}: SEOProps) => {
  
  const siteTitle = "VPrime Lights";
  const fullTitle = `${title} | ${siteTitle}`;
  const siteUrl = "https://vprimelights.com"; 

  const fullImage = image.startsWith('http') ? image : `${siteUrl}${image}`;

  return (
    <>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={siteUrl + window.location.pathname} /> 
      
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullImage} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={siteUrl + window.location.pathname} />
    </>
  );
};

export default SEO;