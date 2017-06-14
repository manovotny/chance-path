const Chance = require('chance');

const path = require('./index');

const chance = new Chance();

describe('index', () => {
    let expectedD6,
        expectedWord;

    beforeEach(() => {
        expectedD6 = chance.d6();
        expectedWord = chance.word();

        spyOn(Chance.prototype, 'd6').and.returnValue(expectedD6);
        spyOn(Chance.prototype, 'word').and.returnValue(expectedWord);

        chance.mixin({
            path
        });
    });

    it('should return a path', () => {
        const result = chance.path();
        const parts = result.split('/');

        expect(result.startsWith('/')).toEqual(false);
        expect(parts.length).toEqual(expectedD6);
    });

    it('should return a path with a custom depth', () => {
        const sample = require('lodash.sample');
        const expectedDepth = sample([1, 2, 3, 4, 5]);
        const result = path({depth: expectedDepth});
        const actualDepth = result.split('/');

        expect(actualDepth.length).toEqual(expectedDepth);
    });

    it('should return a path with a custom ext', () => {
        const expectedExt = `.${chance.word()}`;
        const result = path({ext: expectedExt});
        const pathParts = result.split('/');
        const base = pathParts[pathParts.length - 1];
        const baseParts = base.split('.');
        const actualName = baseParts[0];
        const actualExt = baseParts[1];

        expect(`.${actualExt}`).toEqual(expectedExt);
        expect(actualName).toBe(expectedWord);
    });

    it('should return a path with a custom name', () => {
        const expectedName = chance.word();
        const result = path({name: expectedName});
        const parts = result.split('/');
        const actualName = parts[parts.length - 1];

        expect(actualName).toEqual(expectedName);
    });

    it('should return a root path', () => {
        const result = path({root: true});

        expect(result.startsWith('/')).toEqual(true);
    });
});
