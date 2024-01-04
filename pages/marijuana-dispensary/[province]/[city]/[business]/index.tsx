import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from 'next';
import { withBusinessPage } from '../../../../../services/business';
import { Route } from '../../../../../config/Routes';
import { useBreadCrumbStatic } from '../../../../../services/breadCrumb';
import { useBusinessStatic } from '../../../../../hooks/business/useBusinessStatic';

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const business = await useBusinessStatic(context);
  return {
    redirect: !business && {
      destination: Route.Root,
      permanent: false,
    },
    props: {
      breadCrumb: await useBreadCrumbStatic(context),

      business,
    },
  };
}

const Dispensary = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>,
) => {
  return withBusinessPage(null, props, true);
};

export default Dispensary;
