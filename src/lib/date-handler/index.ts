import { HOUR_IN_MS } from '@/constants/time-units';

export default class DateHandler {
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
