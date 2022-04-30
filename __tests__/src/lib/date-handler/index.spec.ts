import { HOUR_IN_MS } from '../../../../src/constants/time-units';

class DateHandler {
  private readonly defaultTimezone: string;
  public date: Date;

  constructor(date?: string | Date | number) {
    this.date = this.__initHandler(date);
    this.defaultTimezone = 'America/Sao_Paulo';
  }

  private __initHandler(date?: string | Date | number) {
    if (!date) return this.__handleDefaultTimezone(new Date());

    const isDateInvalid = Number.isNaN(new Date(date).valueOf());

    if (isDateInvalid) {
      throw new Error('Invalid Date.');
    }

    return this.__handleDefaultTimezone(new Date(date));
  }

  private __handleDefaultTimezone(date: Date) {
    const withUsTimezone = new Date(
      date.toLocaleString('en-US', { timeZone: this.defaultTimezone }),
    );

    const brUsDiffHours = 3;

    return new Date(withUsTimezone.getTime() - brUsDiffHours * HOUR_IN_MS);
  }
}

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
