import { notification } from '../index';

describe('notification', () => {
  it('default', () => {
    const result = notification();
    expect(result).toBeCalled();
  });
});
