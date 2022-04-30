function addTime(date: Date) {
  if (!date) {
    throw new Error('Missing date.');
  }
}

describe('Add time', () => {
  it('should throws if no data is provided.', () => {
    //eslint-disable-next-line
    //@ts-ignore
    expect(() => addTime()).toThrow(new Error('Missing date.'));
  });
});
