import { DAY_IN_MS, HOUR_IN_MS, MINUTE_IN_MS } from '@/constants/time-units';
import { TTimeUnits } from '@/@types';
import { addTime } from '@/lib/date-handler/resources';

describe('Add time', () => {
  it('should throws if no data is provided.', () => {
    //eslint-disable-next-line
    //@ts-ignore
    const sut = () => addTime();

    expect(sut).toThrow(new Error('Missing date.'));
  });

  it('Should throws if no unit is provided.', () => {
    //eslint-disable-next-line
    //@ts-ignore
    const sut = () => addTime(new Date());

    expect(sut).toThrow(new Error('Missing time unit.'));
  });

  it('Should throws if provided unit time is invalid.', () => {
    //eslint-disable-next-line
    //@ts-ignore
    const sut = () => addTime(new Date(), { timeUnit: 'invalid-time-unit' });

    expect(sut).toThrow(new Error('Invalid time unit.'));
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
