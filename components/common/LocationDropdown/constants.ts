export interface IFlagsCurrent {
  plCountryID: number;
  name: string;
}

interface IFlags {
  usa: IFlagsCurrent;
  canada: IFlagsCurrent;
}

interface ICurrentSorting {
  key: string;
  value: string;
}

interface ISortingType {
  alphabetic: ICurrentSorting;
  popular: ICurrentSorting;
}

export const SORTING_TYPES: ISortingType = {
  alphabetic: {
    key: 'alphabetic',
    value: 'A-Z',
  },
  popular: {
    key: 'popular',
    value: 'Popular Areas',
  },
};

export const FLAGS: IFlags = {
  usa: {
    plCountryID: 2,
    name: 'USA',
  },
  canada: {
    plCountryID: 1,
    name: 'CANADA',
  },
};

export const KEY_PRES_ENTER = 'Enter';
export const CLICK_EVENT_TYPE = 'click';
