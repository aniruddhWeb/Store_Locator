import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from 'next';
import { Route } from '../../../../../config/Routes';
import { checkIfRegion } from '../../../../../utils/region';
import { useBreadCrumbStatic } from '../../../../../services/breadCrumb';
import { withProductAlsoAvailableGrid } from '../../../../../services/product';
import { useProductStatic } from '../../../../../hooks/product/useProductStatic';
import { getCleanUrl, getParentUrl } from '../../../../../utils/link';

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { business, product } = await useProductStatic(context);
  return {
    redirect:
      ((!!business?.bizClaim || !!business?.bizClaimUnblurred) && {
        destination: getParentUrl(
          getParentUrl(getCleanUrl(context.resolvedUrl)),
        ),
        permanent: false,
      }) ||
      (!checkIfRegion(context.query.province as string) &&
        (!business || !product) && {
          destination: Route.Root,
          permanent: false,
        }),
    props: {
      breadCrumb: await useBreadCrumbStatic(context),

      business,
      product,
    },
  };
}

const ProductAvailableAt = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>,
) => {
  return withProductAlsoAvailableGrid(props, true);
};

export default ProductAvailableAt;
