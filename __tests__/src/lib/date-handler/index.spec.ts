class DateHandler {
  private date: Date;

  constructor(date?: string | Date | number) {
    this.date = this.__initHandler(date);
  }

  private __initHandler(date?: string | Date | number) {
    if (!date) return new Date();

    const isDateInvalid = Number.isNaN(Date.parse(String(date)));

    if (isDateInvalid) {
      throw new Error('Invalid Date.');
    }

    return new Date(date);
  }
}

describe('Date handler', () => {
  it('Should thows if an invalid date is provided.', () => {
    expect(() => new DateHandler('invalid-date')).toThrow(
      new Error('Invalid Date.'),
    );
  });
});
