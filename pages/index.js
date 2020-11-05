import React from 'react';
import { Client, manageLocal } from '../utils/prismicHelpers';

import SliceZone from '../components/SliceZone';
import  { Layout, SetupRepo } from '../components';

/**
 * Homepage component
 */
const Homepage = ({ doc, menu, currentLang, isMyMainLanguage }) => {
  if (doc && doc.data) {
    return (
      <Layout
        altLangs={doc.alternate_languages}
        currentLang={currentLang}
        isMyMainLanguage={isMyMainLanguage}
        menu={menu}
      >
        <SliceZone sliceZone={doc.data.body} />
      </Layout>
    );
  }

  // Message when repository has not been setup yet
  return <SetupRepo />;
};

export async function getStaticProps({
  preview = null,
  previewData = {},
  locale,
  locales,
}) {
  const { ref } = previewData;
  const client = Client();
  const doc =
    (await client.getSingle('homepage', ref ? { ref } : { lang: locale })) ||
    {};
  const menu =
    (await client.getSingle('top_menu', ref ? { ref } : { lang: locale })) ||
    {};

  const {mainLanguage, currentLang, isMyMainLanguage} = manageLocal(locales, locale)

  return {
    props: {
      preview,
      menu,
      doc,
      locales,
      mainLanguage,
      currentLang,
      isMyMainLanguage,
    },
  };
}

export default Homepage;
