import { DAY_IN_MS, HOUR_IN_MS, MINUTE_IN_MS } from '@/constants/time-units';

type TTimeUnits = 'minute' | 'hour' | 'day' | 'week';
type TAddTimeConfig = {
  timeUnit: TTimeUnits;
  qtd?: number;
};

const TIME_UNITS = {
  minute: MINUTE_IN_MS,
  hour: HOUR_IN_MS,
  day: DAY_IN_MS,
  week: DAY_IN_MS * 7,
};

function addTime(date: Date, config: TAddTimeConfig) {
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

describe('Add time', () => {
  it('should throws if no data is provided.', () => {
    //eslint-disable-next-line
    //@ts-ignore
    expect(() => addTime()).toThrow(new Error('Missing date.'));
  });

  it('Should throws if no unit is provided.', () => {
    //eslint-disable-next-line
    //@ts-ignore
    expect(() => addTime(new Date())).toThrow(new Error('Missing time unit.'));
  });

  it('Should throws if provided unit time is invalid.', () => {
    expect(() =>
      addTime(new Date(), {
        timeUnit: 'invalid-time-unit',
      }),
    ).toThrow(new Error('Invalid time unit.'));
  });

  it('Should add correct time to provided date.', () => {
    type TOptions = {
      timeUnit: TTimeUnits;
      qtd: number;
      expect: number;
    };

    const options: TOptions[] = [
      {
        timeUnit: 'minute',
        qtd: 1,
        expect: MINUTE_IN_MS,
      },
      {
        timeUnit: 'hour',
        qtd: 1,
        expect: HOUR_IN_MS,
      },
      {
        timeUnit: 'day',
        qtd: 1,
        expect: DAY_IN_MS,
      },
      {
        timeUnit: 'week',
        qtd: 1,
        expect: DAY_IN_MS * 7,
      },
    ];

    options.forEach((option) => {
      const date = new Date();

      const updatedDate = addTime(date, {
        timeUnit: option.timeUnit,
        qtd: option.qtd,
      });

      const diff = updatedDate.getTime() - date.getTime();

      expect(diff).toBe(option.expect);
    });
  });

  it('Should add 1 of provided time unit if no qtd is provided.', () => {
    const date = new Date();
    const updatedDate = addTime(date, { timeUnit: 'day' });

    const diff = updatedDate.getTime() - date.getTime();

    expect(diff).toBe(DAY_IN_MS);
  });
});
