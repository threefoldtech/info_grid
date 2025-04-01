import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import styles from './HomepageFeatures.module.css';

// FontAwesome icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faServer, faCode } from '@fortawesome/free-solid-svg-icons';

const FeatureList = [
  {
    title: 'For Users',
    icon: faUser,
    iconColor: '#1ba18e',
    description: (
      <>
        Documentation for deploying and using ThreeFold Grid services.
        Deploy VMs, set up Mycelium and web gateways, connect securely to your workloads.
      </>
    ),
    buttonText: 'Deploy Now',
    buttonLink: '/users/intro',
  },
  {
    title: 'For Farmers',
    icon: faServer,
    iconColor: '#1ba18e',
    description: (
      <>
        Step-by-step guidance for setting up and maintaining ThreeFold farms.
        Learn farm setup, basic operations, and maintenance procedures.
      </>
    ),
    buttonText: 'Farm Now',
    buttonLink: '/farmers/intro',
  },
  {
    title: 'Advanced Labs',
    icon: faCode,
    iconColor: '#1ba18e',
    description: (
      <>
        Comprehensive documentation for advanced users and farmers.
        Explore advanced guides, configurations, and experimental features.
      </>
    ),
    buttonText: 'Dive In',
    buttonLink: '/labs/intro',
  },
];

function Feature({icon, iconColor, title, description, buttonText, buttonLink}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <div className={styles.featureIconContainer}>
          <FontAwesomeIcon icon={icon} className={styles.featureIcon} style={{color: iconColor}} />
        </div>
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
        <div className={styles.featureButtonContainer}>
          <Link
            className="button button--primary button--md"
            to={buttonLink}>
            {buttonText}
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
