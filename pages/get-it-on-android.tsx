import type { GetServerSidePropsContext } from 'next';
import { getContentfulClient } from '../api/client';
import {
  GooglePlayLinkDocument,
  GooglePlayLinkQuery,
  GooglePlayLinkQueryVariables,
} from '../generated/contentful';

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { data: googlePlayData } = await getContentfulClient().query<
    GooglePlayLinkQuery,
    GooglePlayLinkQueryVariables
  >({
    fetchPolicy: 'cache-first',
    query: GooglePlayLinkDocument,
  });
  return {
    redirect: !!googlePlayData?.socialLink?.url && {
      destination: googlePlayData?.socialLink?.url,
      permanent: false,
    },
    props: {
      googlePlay: googlePlayData?.socialLink?.url || [],
    },
  };
}

const GooglePlay = () => {
  return null;
};

export default GooglePlay;
