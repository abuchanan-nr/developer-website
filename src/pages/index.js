import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { graphql } from 'gatsby';

import Layout from '../components/Layout';
import SEO from '../components/Seo';
import GuideListing from '../components/GuideListing/GuideListing';
import GuideTile from '../components/GuideTile';
import PageTitle from '../components/PageTitle';
import Section from '../components/Section';
import Video from '../components/Video';
import FeatherIcon from '../components/FeatherIcon';
import ExternalLink from '../components/ExternalLink';
import { PageContext } from '../components/PageContext';
import { pageContext } from '../types';
import styles from './index.module.scss';

const getStartedGuides = [
  {
    duration: '5 min',
    title: 'Create custom events',
    description:
      'Define, visualize, and get alerts on the data you want using custom events',
    path: '/collect-data/custom-events',
    icon: 'collectData',
  },
  {
    duration: '7 min',
    title: 'Add tags to apps',
    description: `Add tags to applications you instrument for easier filtering and organization`,
    path: '/automate-workflows/add-tags-to-apps',
    icon: 'automation',
  },
  {
    duration: '12 min',
    title: 'Build a Hello, World! app',
    description: `Build a Hello, World! app and publish it to your local New Relic One Catalog`,
    path: '/build-apps/build-hello-world-app',
    icon: 'buildApps',
  },
];

// TODO: Remove the following after the guides have been created
// const guides = [
//   {
//     minutes: 25,
//     title: 'Provision with Terraform',
//     description: 'Provision an alert policy with notifications using Terraform',
//     path: '/',
//   },
//   {
//     minutes: 15,
//     title: ' Set up dev tools',
//     description: 'Get an API key, download the CLI, and start building apps',
//     path: '/build-apps/set-up-dev-env',
//   },
//   {
//     minutes: 30,
//     title: 'Add a table to your app',
//     description: 'Use New Relic One components to add a table to your app',
//     path: '/build-apps/howto-use-nrone-table-components',
//   },
// ];

const IndexPage = ({ data, pageContext }) => {
  const {
    allMdx: { nodes },
  } = data;

  return (
    <PageContext.Provider value={pageContext}>
      <Layout>
        <SEO />
        <PageTitle>Observability for every developer</PageTitle>

        <section className={styles.intro}>
          <div className={styles.introText}>
            <p>
              Whether you're new to New Relic or already a data nerd, you can
              start building right now. For free.
            </p>
            <p>
              With our platform as your foundation, create custom observability
              apps fast. Answer your unique questions, improve your software,
              and deliver new value to your business.
            </p>
            <p>We're glad you are here. Let's start building.</p>
          </div>
          <Video
            className={styles.introVideo}
            id="ZagZfNQYJEU"
            type="youtube"
            title="Develop with New Relic"
          />
        </section>

        <Section backgroundBanner>
          <GuideListing className={styles.guideListing}>
            <header className={styles.guideListingHeader}>
              <GuideListing.Heading className={cx(styles.guideListingHeading)}>
                Get started
              </GuideListing.Heading>
              <ExternalLink href="https://newrelic.com/signup?partner=Developer+Edition">
                <button type="button">Create an account</button>
              </ExternalLink>
            </header>
            <GuideListing.List>
              {getStartedGuides.map((guide, index) => (
                <GuideTile key={index} {...guide} />
              ))}
            </GuideListing.List>
          </GuideListing>
        </Section>

        <GuideListing className={styles.guideListing}>
          <GuideListing.Heading className={styles.guideListingHeading}>
            Extend the platform
          </GuideListing.Heading>
          <GuideListing.List>
            {nodes.map(({ frontmatter }, index) => (
              <GuideTile
                key={index}
                duration={frontmatter.duration}
                title={frontmatter.callout?.title || frontmatter.title}
                description={
                  frontmatter.callout?.description || frontmatter.description
                }
                path={frontmatter.path}
              />
            ))}
          </GuideListing.List>
        </GuideListing>

        <p className={styles.inspiration}>
          Looking for inspiration? Check out the{' '}
          <ExternalLink
            className={styles.externalLink}
            href="https://opensource.newrelic.com"
          >
            open source projects
            <FeatherIcon
              className={styles.externalLinkIcon}
              name="external-link"
            />
          </ExternalLink>{' '}
          built by the New Relic community.
        </p>
      </Layout>
    </PageContext.Provider>
  );
};

IndexPage.propTypes = {
  data: PropTypes.object,
  pageContext,
};

export const pageQuery = graphql`
  query {
    allMdx(filter: { frontmatter: { promoteToHomepage: { eq: true } } }) {
      nodes {
        frontmatter {
          title
          description
          duration
          path
          callout {
            title
            description
          }
        }
      }
    }
  }
`;

export default IndexPage;
