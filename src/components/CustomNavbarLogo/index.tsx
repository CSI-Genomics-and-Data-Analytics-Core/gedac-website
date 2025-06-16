import React from 'react';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';

export default function CustomNavbarLogo(): React.JSX.Element {
  const logoUrl = useBaseUrl('/img/csi_nus_logo.png');
  const gedacLogoUrl = useBaseUrl('/img/gedac.png');

  return (
    <Link
      to="/"
      className="navbar__brand"
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '15px',
        textDecoration: 'none',
      }}
    >
      <img
        src={logoUrl}
        alt="CSI Logo"
        style={{ height: '80px' }}
        className="navbar__logo"
      />
      <img
        src={gedacLogoUrl}
        alt="GEDAC Logo"
        style={{ height: '60px' }}
        className="navbar__logo"
      />
      <span
        className="navbar__title"
        style={{
          fontSize: '34px',
          fontWeight: '600',
          lineHeight: '1.2',
        }}
      >
        Genomics and Data Analytics Core
      </span>
    </Link>
  );
}
