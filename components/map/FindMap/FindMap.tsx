import React, {
  MutableRefObject,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import Link from 'next/link';
import GoogleMapReact from 'google-map-react';
import useSupercluster from 'use-supercluster';
import cn from 'classnames';
import { useMediaQueries } from '@react-hook/media-query';
import dynamic from 'next/dynamic';
import { Business, BusinessDeals } from '../../../generated/graphql';
import s from './FindMap.module.css';
import {
  DEFAULT_USER_LOCATION,
  getBrowserUserLocation,
  useCurrentLocationDynamic,
} from '../../../services/location';
import { Marker } from '../Marker/Marker';
import { MarkerGroup } from '../MarkerGroup/MarkerGroup';
import {
  getFillColor,
  getMapColor,
  isPinBigger,
  MAP_OPTIONS,
} from '../../../services/map';
import { CheckBox } from '../../icons/CheckBox';
import { MapCard } from '../MapCard/MapCard';
import { Route } from '../../../config/Routes';
import { ChevronLeft } from '../../icons/ChevronLeft';
import { getImageLink } from '../../../utils/image';
import { MapFilter } from '../MapFilter/MapFilter';
import { GOOGLE_MAPS_API_KEY } from '../../../config/Constants';
import { LocationMarker } from '../LocationMarker/LocationMarker';

const ReactTooltip = dynamic<any>(
  // @ts-ignore
  () => import('react-tooltip'),
  {
    ssr: false,
  },
);

export interface FindMapProps {
  isMapLoading?: boolean;
  businesses?: Business[];
  deals?: BusinessDeals[];
  onBoundsChanged?: (
    lat1: number,
    lnt1: number,
    lat2: number,
    lng2: number,
    businessType?: 'delivery' | 'dispensary' | null,
    sorting?: 'rating' | 'largest' | 'distance' | null,
  ) => void;
}

export const FindMap = React.memo(
  ({ businesses, deals, onBoundsChanged, isMapLoading }: FindMapProps) => {
    const mapRef = useRef<any>();
    const itemsScrollViewRef = useRef<HTMLDivElement>();

    const { selectedLocation: location } = useCurrentLocationDynamic();

    const { matches } = useMediaQueries({
      isMobile: 'only screen and (max-width: 860px)',
    });

    const [mapInitialMoved, setMapInitialMoved] = useState<boolean>(false);
    const [searchEnabled, setSearchEnabled] = useState<boolean>(false);
    const searchParams = useRef<number[]>([]);
    const [sideBarOpened, setSideBarOpened] = useState<boolean>(true);
    const [selectedBusinessId, setSelectedBusinessId] = useState<
      number | string | null
    >(null);
    const [hoverBusiness, setHoverBusiness] = useState<{
      businessId: number | string;
      lat: number;
      lng: number;
    } | null>(null);

    const [selectedTabIndex, setSelectedTabIndex] = useState<number>(0);
    const [clusteringEnabled, setClusteringEnabled] = useState<boolean>(true);
    const [bounds, setBounds] = useState<number[]>([-180, -85, 180, 85]);
    const [zoom, setZoom] = useState<number>(12);

    const [selectedBusinessType, setSelectedBusinessType] = useState<
      'delivery' | 'dispensary' | null
    >(null);
    const [selectedSorting, setSelectedSorting] = useState<
      'rating' | 'largest' | 'distance' | null
    >(null);
    const prevBusinessType = useRef<'delivery' | 'dispensary' | null>(
      selectedBusinessType,
    );
    const prevSorting = useRef<'rating' | 'largest' | 'distance' | null>(
      selectedSorting,
    );

    const disabledSearch =
      zoom < 10 || !searchEnabled || (matches?.isMobile && sideBarOpened);
    const hiddenSearch =
      !isMapLoading &&
      zoom >= 10 &&
      (!searchEnabled || (matches?.isMobile && sideBarOpened));

    const markersData = useMemo(
      () =>
        (businesses || []).map((business: Business) => {
          let lat: number = 0;
          let lng: number = 0;
          if (business.contact?.bizLatitude && business.contact?.bizLongitude) {
            if (
              Math.abs(business.contact?.bizLatitude) > 90 &&
              Math.abs(business.contact?.bizLongitude) < 90
            ) {
              lat = business.contact?.bizLongitude;
              lng = business.contact?.bizLatitude;
            } else {
              lat = business.contact?.bizLatitude;
              lng = business.contact?.bizLongitude;
            }
          }
          return {
            type: 'Feature',
            properties: {
              cluster: false,
              businessId: business.bizBusinessID,
              name: business.bizName,
              type: business.plType,
              showImage: !!business.bizHasMapPin,
              image: getImageLink(business.mdaLocalFileName, 72),
              color: getMapColor(business),
              fillColor: getFillColor(business),
              bigger: isPinBigger(business),
            },
            geometry: {
              type: 'Point',
              coordinates: [lng, lat],
            },
          };
        }),
      [businesses],
    );

    const onMapLoaded = useCallback(({ map }) => {
      mapRef.current = map;
    }, []);

    const onDrag = useCallback(() => {
      if (selectedBusinessId) {
        setSelectedBusinessId(null);
        itemsScrollViewRef.current?.scrollTo({
          left: 0,
          top: 0,
          behavior: 'smooth',
        });
      }
      if (!searchEnabled) {
        setSearchEnabled(true);
      }
      if (!mapInitialMoved) {
        setMapInitialMoved(true);
      }
    }, [selectedBusinessId, searchEnabled, mapInitialMoved]);

    const onMapChange = useCallback(
      ({
        zoom: zoomParam,
        bounds: boundsParam,
      }: {
        zoom: number;
        bounds: any;
      }) => {
        setZoom(zoomParam);
        setBounds([
          boundsParam.nw.lng,
          boundsParam.se.lat,
          boundsParam.se.lng,
          boundsParam.nw.lat,
        ]);
        searchParams.current = [
          boundsParam.nw.lat,
          boundsParam.nw.lng,
          boundsParam.se.lat,
          boundsParam.se.lng,
        ];
      },
      [],
    );

    const defaultCenter = useRef<{ lat: number; lng: number }>({
      lat: location?.plLatitude || DEFAULT_USER_LOCATION.plLatitude,
      lng: location?.plLongitude || DEFAULT_USER_LOCATION.plLongitude,
    });

    useEffect(() => {
      if (location?.plLatitude && location?.plLongitude) {
        if (
          defaultCenter.current.lat !== location?.plLatitude &&
          defaultCenter.current.lng !== location?.plLongitude
        ) {
          mapRef.current?.setZoom(12);
          mapRef.current?.panTo({
            lat: location?.plLatitude,
            lng: location?.plLongitude,
          });
          defaultCenter.current = {
            lat: location?.plLatitude,
            lng: location?.plLongitude,
          };
        }
      }
    }, [location?.plLatitude, location?.plLongitude]);

    const toggleCluster = useCallback(
      () => setClusteringEnabled(!clusteringEnabled),
      [clusteringEnabled],
    );

    const { clusters, supercluster } = useSupercluster({
      points: markersData,
      bounds,
      zoom,
      options: { radius: 50, maxZoom: 19, minPoints: 4 },
    });

    const onClusterClick = useCallback(
      (clusterId: number, latitude: number, longitude: number) => {
        const expansionZoom = Math.min(
          supercluster.getClusterExpansionZoom(clusterId),
          20,
        );
        mapRef.current?.setZoom(expansionZoom);
        mapRef.current?.panTo({ lat: latitude, lng: longitude });
      },
      [supercluster],
    );

    const onMarkerClick = useCallback(
      (businessId: number | string, latitude: number, longitude: number) => {
        setSideBarOpened(true);
        setSelectedTabIndex(0);
        setSelectedBusinessId(businessId);
        mapRef.current?.panTo({ lat: latitude, lng: longitude });
        const businessItem = document.getElementById(`business-${businessId}`);
        if (businessItem) {
          itemsScrollViewRef.current?.scrollTo({
            left: 0,
            top: (businessItem.offsetTop || 0) - 116,
            behavior: 'smooth',
          });
        }
      },
      [supercluster],
    );

    const changeTab = useCallback(
      (tabIndex: number) => setSelectedTabIndex(tabIndex),
      [],
    );

    const seeAllDeals = useMemo(
      () =>
        `${Route.Deals}/${location?.province.plInitials.toLowerCase()}/${
          location?.plSlug
        }`,
      [location],
    );

    const toggleSideBar = useCallback(
      () => setSideBarOpened(!sideBarOpened),
      [sideBarOpened],
    );

    useEffect(() => {
      if (selectedSorting !== prevSorting.current) {
        if (onBoundsChanged && searchParams.current.length >= 4) {
          onBoundsChanged(
            searchParams.current[0],
            searchParams.current[1],
            searchParams.current[2],
            searchParams.current[3],
            selectedBusinessType,
            selectedSorting,
          );
        }
        prevSorting.current = selectedSorting;
      }
      if (selectedBusinessType !== prevBusinessType.current) {
        if (onBoundsChanged && searchParams.current.length >= 4) {
          onBoundsChanged(
            searchParams.current[0],
            searchParams.current[1],
            searchParams.current[2],
            searchParams.current[3],
            selectedBusinessType,
            selectedSorting,
          );
        }
        prevBusinessType.current = selectedBusinessType;
      }
    }, [onBoundsChanged, selectedSorting, selectedBusinessType]);

    const searchThisLocation = useCallback(() => {
      if (
        !disabledSearch &&
        onBoundsChanged &&
        searchParams.current.length >= 4
      ) {
        setSearchEnabled(false);
        onBoundsChanged(
          searchParams.current[0],
          searchParams.current[1],
          searchParams.current[2],
          searchParams.current[3],
          selectedBusinessType,
          selectedSorting,
        );
      }
    }, [
      onBoundsChanged,
      disabledSearch,
      selectedBusinessType,
      selectedSorting,
    ]);

    const [userLocation, setUserLocation] = useState<{
      lat: number;
      lng: number;
    } | null>(null);

    useEffect(() => {
      getBrowserUserLocation().then(locationCoords => {
        if (locationCoords.lat && locationCoords.lng) {
          setUserLocation(locationCoords);
        }
      });
    }, []);

    const sideWrapperClass = cn(s.sideWrapper, {
      [s.sideWrapperClosed]: !sideBarOpened,
    });

    const handleClass = cn(s.handle, {
      [s.handleClosed]: !sideBarOpened,
    });

    const chevronClass = cn(s.chevron, {
      [s.chevronClosed]: !sideBarOpened,
    });

    const searchClass = cn(s.searchButton, {
      [s.searchButtonClosed]: disabledSearch,
      [s.searchButtonHidden]: hiddenSearch || !mapInitialMoved,
    });

    return (
      <>
        <div className={s.root}>
          <div className={s.mapContainer}>
            <GoogleMapReact
              bootstrapURLKeys={{ key: GOOGLE_MAPS_API_KEY }}
              yesIWantToUseGoogleMapApiInternals
              options={MAP_OPTIONS}
              onGoogleApiLoaded={onMapLoaded}
              onChange={onMapChange}
              onDrag={onDrag}
              defaultCenter={defaultCenter.current}
              defaultZoom={12}>
              {userLocation ? (
                <LocationMarker
                  lat={userLocation.lat || 0}
                  lng={userLocation.lng || 0}
                />
              ) : null}
              {(clusteringEnabled && zoom < 16 ? clusters : markersData).map(
                cluster => {
                  const [longitude, latitude] = cluster.geometry.coordinates;
                  const {
                    cluster: isCluster,
                    point_count: pointCount,
                    businessId,
                    bigger,
                  } = cluster.properties;

                  if (isCluster) {
                    return (
                      <MarkerGroup
                        id={cluster.id}
                        key={`cluster-${cluster.id}`}
                        markerCount={pointCount}
                        lat={latitude || 0}
                        lng={longitude || 0}
                        onClick={onClusterClick}
                      />
                    );
                  }
                  return (
                    <Marker
                      id={cluster.properties.businessId}
                      key={`marker-${cluster.properties.businessId}`}
                      lat={latitude || 0}
                      lng={longitude || 0}
                      type={cluster.properties.type}
                      showImage={cluster.properties.showImage}
                      image={cluster.properties.image}
                      color={cluster.properties.color}
                      fillColor={cluster.properties.fillColor}
                      onClick={onMarkerClick}
                      bigger={bigger}
                      selected={
                        (selectedBusinessId !== null &&
                          businessId === selectedBusinessId) ||
                        (hoverBusiness !== null &&
                          businessId === hoverBusiness.businessId)
                      }
                    />
                  );
                },
              )}
            </GoogleMapReact>
          </div>
          <div onClick={toggleCluster} className={s.groupContainer}>
            <div className={s.checkBoxText}>Group locations</div>
            {clusteringEnabled ? (
              <div className={s.checkBox}>
                <CheckBox />
              </div>
            ) : (
              <div className={s.checkBoxDisabled} />
            )}
          </div>
          <div
            data-tip
            data-for="map-tooltip"
            onClick={searchThisLocation}
            className={searchClass}>
            {isMapLoading ? 'Searching...' : 'Search This Area'}
          </div>
          <div className={sideWrapperClass}>
            <div className={s.sideContainer}>
              <div className={s.sideTabs}>
                <div
                  onClick={() => changeTab(0)}
                  className={
                    selectedTabIndex === 0 ? s.sideTabSelected : s.sideTab
                  }>
                  Listings
                </div>
                <div
                  onClick={() => changeTab(1)}
                  className={
                    selectedTabIndex === 1 ? s.sideTabSelected : s.sideTab
                  }>
                  Deals
                </div>
              </div>
              {selectedTabIndex === 0 ? (
                <MapFilter
                  selectedBusinessType={selectedBusinessType}
                  onSelectBusinessType={setSelectedBusinessType}
                  selectedSorting={selectedSorting}
                  onSelectSorting={setSelectedSorting}
                />
              ) : null}
              <div
                ref={itemsScrollViewRef as MutableRefObject<HTMLDivElement>}
                className={s.itemsContainer}>
                {selectedTabIndex === 0 ? (
                  <>
                    {(businesses || []).map(business => (
                      <MapCard
                        key={`business-listing-${business.bizBusinessID}`}
                        business={business}
                        setHoverBusiness={setHoverBusiness}
                        selected={
                          selectedBusinessId !== null &&
                          business.bizBusinessID === selectedBusinessId
                        }
                        sendGTMAction="show_map_clicks"
                      />
                    ))}
                  </>
                ) : selectedTabIndex === 1 ? (
                  <>
                    {(deals || []).map(deal => (
                      <MapCard
                        key={`deal-listing-${deal.dlsDealsID}`}
                        deal={deal}
                      />
                    ))}
                  </>
                ) : null}
                {selectedTabIndex === 1 ? null : <div className={s.fade} />}
              </div>
              {selectedTabIndex === 1 ? (
                <Link prefetch={false} href={seeAllDeals}>
                  <a href={seeAllDeals} className={s.sellAllDeals}>
                    See all Deals
                  </a>
                </Link>
              ) : null}
            </div>
            <div onClick={toggleSideBar} className={handleClass}>
              <ChevronLeft className={chevronClass} />
            </div>
          </div>
        </div>
        <ReactTooltip place="bottom" id="map-tooltip">
          {zoom < 10 ? (
            <div className={s.mapPopup}>Not available at this zoom level</div>
          ) : (
            <div />
          )}
        </ReactTooltip>
      </>
    );
  },
);
