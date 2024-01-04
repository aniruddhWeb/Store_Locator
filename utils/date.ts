import { DateTime } from 'luxon';

export const getInterval = (start: string, end: string) => {
  const startDate = DateTime.fromISO(start, { zone: 'utc' });
  const endDate = DateTime.fromISO(end, { zone: 'utc' });
  const days = endDate.diff(startDate, 'days').toObject().days || 0;
  const hours = endDate.diff(startDate, 'hours').toObject().hours || 0;
  return { days, hours };
};
