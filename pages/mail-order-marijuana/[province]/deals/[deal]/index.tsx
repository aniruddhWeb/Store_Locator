import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from 'next';
import { checkIfRegion } from '../../../../../utils/region';
import { Route } from '../../../../../config/Routes';
import { useBreadCrumbStatic } from '../../../../../services/breadCrumb';
import { useDealStatic, withDealPage } from '../../../../../services/deals';
import { getCleanUrl, getParentUrl } from '../../../../../utils/link';

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { business, deal } = await useDealStatic(context);
  return {
    redirect:
      (!checkIfRegion(context.query.province as string) &&
        (!business || !deal) && {
          destination: Route.Root,
          permanent: false,
        }) ||
      ((!!business?.bizClaim || !!business?.bizClaimUnblurred) && {
        destination: getParentUrl(
          getParentUrl(getCleanUrl(context.resolvedUrl)),
        ),
        permanent: false,
      }),
    props: {
      breadCrumb: await useBreadCrumbStatic(context),

      deal,
    },
  };
}

const Deal = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>,
) => {
  return withDealPage(null, props, true);
};

export default Deal;
