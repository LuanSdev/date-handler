import { HOUR_IN_MS } from '@/constants/time-units';
import DateHandler from '@/lib/date-handler';

describe('Date handler', () => {
  it('should thows if an invalid date is provided.', () => {
    expect(() => new DateHandler('invalid-date')).toThrow(
      new Error('Invalid Date.'),
    );
  });

  it('should not throws if a valid or none date is provided.', () => {
    const tests = [
      '01/01/2022',
      '2022-01-01',
      '2022-01-01T00:00:00z',
      new Date(),
      1651280685731,
    ];

    tests.forEach((test) => {
      expect(() => new DateHandler(test)).not.toThrow();
    });
  });

  it('Should set timezone correctly', () => {
    const usDate = new Date(new Date().toLocaleString('en-US')).getTime();
    const sut = new DateHandler(usDate).date.getTime();

    const diff = usDate - sut;
    const diffInHour = diff / HOUR_IN_MS;

    expect(diffInHour).toBe(3);
  });
});
