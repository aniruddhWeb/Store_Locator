import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from 'next';
import { withBusinessProductsGrid } from '../../../../../../services/business';
import { Route } from '../../../../../../config/Routes';
import { useDispensaryStatic } from '../../../../../../services/dispensary';
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

      dispensary: await useDispensaryStatic(context),
      business,
    },
  };
}

const BusinessProducts = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>,
) => {
  return withBusinessProductsGrid(props);
};

export default BusinessProducts;
