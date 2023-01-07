import React, { useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom'

import { siteConfig } from '../config/siteConfig'

// Headコンポーネントを各ページに設置する際に使用する。
// type Props = {
//   title?: string;
//   canonical?: string;
// };

const Head: React.FC = React.memo(() => {
  const location = useLocation()
  const pageConfig = useMemo(() => {
    return siteConfig.pages.find(v => v.path === location.pathname)
  }, [location])

  return (
    <Helmet>
      <title>{pageConfig ? `${pageConfig.title} | ${siteConfig.siteTitle}` : ''}</title>
      <meta name="description" content={pageConfig ? `${pageConfig.description}` : ''} />
      <meta name="robots" content="noindex, nofollow" />
      <link rel="canonical" href={pageConfig ? `${siteConfig.siteUrl}${pageConfig.path}` : ''} />
    </Helmet>
  );
});

export default Head;
