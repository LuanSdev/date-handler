class DateHandler {
  private date: Date;

  constructor(date?: string | Date | number) {
    this.date = this.__initHandler(date);
  }

  private __initHandler(date?: string | Date | number) {
    if (!date) return new Date();

    const isDateInvalid = Number.isNaN(new Date(date).valueOf());

    if (isDateInvalid) {
      throw new Error('Invalid Date.');
    }

    return new Date(date);
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
});
