import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from 'next';
import { withBusinessDealsGrid } from '../../../../../../services/business';
import { Route } from '../../../../../../config/Routes';
import { useBreadCrumbStatic } from '../../../../../../services/breadCrumb';
import { useBusinessStatic } from '../../../../../../hooks/business/useBusinessStatic';
import { getCleanUrl, getParentUrl } from '../../../../../../utils/link';

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const business = await useBusinessStatic(context);
  return {
    redirect:
      (!business && {
        destination: Route.Root,
        permanent: false,
      }) ||
      ((!!business?.bizClaim || !!business?.bizClaimUnblurred) && {
        destination: getParentUrl(getCleanUrl(context.resolvedUrl)),
        permanent: false,
      }),
    props: {
      breadCrumb: await useBreadCrumbStatic(context),

      business,
    },
  };
}

const BusinessDeals = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>,
) => {
  return withBusinessDealsGrid(props);
};

export default BusinessDeals;
