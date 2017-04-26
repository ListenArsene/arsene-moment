import chai, { expect } from 'chai';
import dirtyChai from 'dirty-chai';

import { isValidSupportedDate }
  from '../src/utils';

chai.use(dirtyChai);

describe('Date and stuffs', () => {
  it('can distinct a valid date from a non date', () => {
    expect(isValidSupportedDate(null)).to.be.false();
    expect(isValidSupportedDate(undefined)).to.be.false();
    expect(isValidSupportedDate('string')).to.be.false();
    expect(isValidSupportedDate('')).to.be.false();
    expect(isValidSupportedDate(0)).to.be.false();
    expect(isValidSupportedDate(10)).to.be.false();
    expect(isValidSupportedDate(1.1)).to.be.false();
    expect(isValidSupportedDate({})).to.be.false();
    expect(isValidSupportedDate(true)).to.be.false();
    expect(isValidSupportedDate(false)).to.be.false();
  });
});
