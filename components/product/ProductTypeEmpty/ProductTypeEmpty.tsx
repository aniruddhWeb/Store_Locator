import React, { useCallback, useEffect, useState } from 'react';
import {
  NearRegionByProductTypeDocument,
  NearRegionByProductTypeQuery,
  NearRegionByProductTypeQueryVariables,
  Region,
} from '../../../generated/graphql';
import s from './ProductTypeEmpty.module.css';
import { getImageLink, setDefaultImageOnError } from '../../../utils/image';
import { useCurrentLocationDynamic } from '../../../services/location';
import { apolloClient } from '../../../api/client';
import { Loader } from '../../common/Loader/Loader';
import { Marquee } from '../../common/Marquee/Marquee';

type Props = {
  productTypeName: string;
  productsFilter: any;
  showWithExistingFilters: boolean;
};

export const ProductTypeEmpty = React.memo(
  ({ productTypeName, productsFilter, showWithExistingFilters }: Props) => {
    const { selectedLocation, setCurrentLocation } =
      useCurrentLocationDynamic();

    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [productRegions, setProductRegions] = useState<Region[]>([]);

    const getProductRegions = useCallback(async () => {
      if (
        selectedLocation?.plRegionID &&
        (productsFilter?.prdProductType || []).length > 0
      ) {
        setIsLoading(true);
        const { data } = await apolloClient.query<
          NearRegionByProductTypeQuery,
          NearRegionByProductTypeQueryVariables
        >({
          query: NearRegionByProductTypeDocument,
          fetchPolicy: 'no-cache',
          errorPolicy: 'all',
          variables: {
            prdProductType: productsFilter?.prdProductType || [],
            prdProductCategories: productsFilter?.prdProductCategories || [],
            plRegionID: selectedLocation?.plRegionID,
          },
        });
        setProductRegions((data?.nearRegionByProductType || []) as Region[]);
        setIsLoading(false);
      }
    }, [JSON.stringify(productsFilter), JSON.stringify(selectedLocation)]);

    useEffect(() => {
      getProductRegions();
    }, [getProductRegions]);

    const onRegionPress = useCallback(
      async (regionItem: Region) => {
        await setCurrentLocation(regionItem);
      },
      [setCurrentLocation],
    );

    if (isLoading) {
      return (
        <Loader
          size={40}
          isLoading={isLoading}
          overlay={false}
          overlayProducts={false}
        />
      );
    }
    if (
      !productRegions ||
      productRegions.length === 0 ||
      showWithExistingFilters
    ) {
      return (
        <Marquee
          variant="second"
          showOnEmpty
          noTopMargin
          emptyView={undefined}
          hideControls
          noTitleMargin>
          {null}
        </Marquee>
      );
    }
    return (
      <div className={s.root}>
        <div
          className={s.title}>{`${productTypeName} in regions near you`}</div>
        <div className={s.container}>
          {(productRegions || []).map(regionItem => (
            <div
              key={regionItem.plRegionID}
              className={s.regionContainer}
              onClick={() => onRegionPress(regionItem)}>
              <img
                src={getImageLink(regionItem.mdaLocalFileName)}
                onError={setDefaultImageOnError}
                className={s.regionImage}
                alt={regionItem.plName}
              />
              <div className={s.regionTitle}>{regionItem.plName}</div>
              <div className={s.regionDescription}>
                {regionItem.province.plName}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  },
);
