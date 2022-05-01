import { DAY_IN_MS, HOUR_IN_MS, MINUTE_IN_MS } from '@/constants/time-units';
import { TAddTimeConfig } from '@/@types';

const TIME_UNITS = {
  minute: MINUTE_IN_MS,
  hour: HOUR_IN_MS,
  day: DAY_IN_MS,
  week: DAY_IN_MS * 7,
};

export function addTime(date: Date, config: TAddTimeConfig) {
  if (!date) {
    throw new Error('Missing date.');
  }

  if (!config || !config.timeUnit) {
    throw new Error('Missing time unit.');
  }

  const { timeUnit, qtd } = config;

  if (!TIME_UNITS[timeUnit]) {
    throw new Error('Invalid time unit.');
  }

  const MIN_QTD = 1;
  const timeToAdd = TIME_UNITS[timeUnit] * (qtd || MIN_QTD);

  return new Date(date.getTime() + timeToAdd);
}
