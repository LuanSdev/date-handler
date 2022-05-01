import { HOUR_IN_MS } from '@/constants/time-units';
import { resources } from './resources';

export default class DateHandler {
  private readonly timezone: string;
  public date: Date;

  constructor(date?: string | Date | number) {
    this.date = this.__setInitialDate(date);
    this.timezone = 'America/Sao_Paulo';

    this.__initHandler();
  }

  private __setInitialDate(date?: string | Date | number) {
    if (!date) return this.__handleTimezone(new Date());

    const isDateInvalid = Number.isNaN(new Date(date).valueOf());

    if (isDateInvalid) {
      throw new Error('Invalid Date.');
    }

    return this.__handleTimezone(new Date(date));
  }

  private __handleTimezone(date: Date) {
    const withUsTimezone = new Date(
      date.toLocaleString('en-US', { timeZone: this.timezone }),
    );

    const brUsDiffHours = 3;

    return new Date(withUsTimezone.getTime() - brUsDiffHours * HOUR_IN_MS);
  }

  private __initHandler() {
    const methods = Object.keys(resources);

    methods.forEach((method) => {
      this[method] = () => {
        const response = resources[method];

        if (response instanceof Date) {
          return this.__handleTimezone(response);
        }

        return response;
      };
    });
  }
}
