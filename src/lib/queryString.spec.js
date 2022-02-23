const { queryString, parseQueryString } = require('./queryString');

describe('Query Strings', () => {
  describe('should create a valid query string', () => {
    it('when an object is valid', () => {
      const obj = {
        name: 'Juliano',
        profession: 'developer',
      };

      expect(queryString(obj)).toBe('name=Juliano&profession=developer');
    });

    it('when recive a value with an array of string', () => {
      const obj = {
        name: 'Juliano',
        profession: ['developer', 'ux'],
      };

      expect(queryString(obj)).toBe('name=Juliano&profession=developer,ux');
    });

    it('and avoid keys with null value or empty', () => {
      const obj1 = {
        name: 'Fabio',
        profession: null,
      };

      expect(queryString(obj1)).toBe('name=Fabio');

      const obj2 = {
        name: 'Fabio',
        profession: '',
      };

      expect(queryString(obj2)).toBe('name=Fabio');
    });
  });

  describe('should parse a query string to an object', () => {
    it('when a queryString is valid', () => {
      const queryString = 'name=Juliano&profession=developer';

      expect(parseQueryString(queryString)).toEqual({
        name: 'Juliano',
        profession: 'developer',
      });
    });

    it('when a queryString has a uniq value', () => {
      const queryString = 'name=Juliano';

      expect(parseQueryString(queryString)).toEqual({ name: 'Juliano' });
    });

    it('when a queryString has a key has multiple values splited by comma', () => {
      const queryString = 'name=Juliano&profession=developer,ux';

      expect(parseQueryString(queryString)).toEqual({
        name: 'Juliano',
        profession: ['developer', 'ux'],
      });
    });
  });

  describe('should throw a error', () => {
    it('when try to create a query string and a key have an invalid value', () => {
      const obj = {
        name: 'Fabio',
        profession: {
          test: '1',
        },
      };
      expect(() => {
        queryString(obj);
      }).toThrowError();
    });
  });
});
