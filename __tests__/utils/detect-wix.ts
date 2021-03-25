import { hasBinary, hasCandle, hasLight } from '../../src/utils/detect-wix';

beforeAll(() => {
  jest.mock('child_process', () => ({
    execSync(name: string) {
      if (name === 'node -v') {
        return new Buffer('8.0.0');
      }

      if (name.includes('light') || name.includes('candle')) {
        return new Buffer(' version 3.11.0.1701');
      }

      throw new Error('Command not found');
    }
  }));
});

afterAll(() => {
  jest.resetAllMocks();
});

test('hasBinary() returns true for "node -v"', () => {
  expect(hasBinary('node -v')).toEqual({ has: true, version: null });
});

test('hasBinary() returns false for "there-is-no-way-i-exist"', () => {
  expect(hasBinary('there-is-no-way-i-exist')).toEqual({ has: false, version: null });
});

test('hasCandle() returns true and correct version', () => {
  expect(hasCandle()).toEqual({ has: true, version: '3.11.0.1701' });
});

test('hasLight() returns true and correct version', () => {
  expect(hasLight()).toEqual({ has: true, version: '3.11.0.1701' });
});
