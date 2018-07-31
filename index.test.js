const {isAbsolute, parse} = require('path');

const Chance = require('chance');

const path = require('./index');

const chance = new Chance();
const pool = 'abcd';

let bool, d6, word;

beforeEach(() => {
    bool = chance.bool();
    d6 = chance.d6();
    word = chance.word();

    Chance.prototype.bool = jest.fn(() => bool);
    Chance.prototype.d6 = jest.fn(() => d6);
    Chance.prototype.word = jest.fn(() => word);

    chance.mixin({
        path
    });
});

describe('depth', () => {
    test('default', () => {
        const result = chance.path();
        const parsed = parse(result);
        const parts = parsed.dir.split('/');
        const depth = isAbsolute(result) ? parts.length - 1 : parts.length;

        expect(depth).toEqual(d6);
    });

    test('custom', () => {
        const d8 = chance.d8();
        const result = chance.path({depth: d8});
        const parsed = parse(result);
        const parts = parsed.dir.split('/');
        const depth = isAbsolute(result) ? parts.length - 1 : parts.length;

        expect(depth).toEqual(d8);
    });
});

describe('ext', () => {
    test('default', () => {
        const result = chance.path();
        const parsed = parse(result);

        expect(parsed.ext).toEqual(`.${word}`);
    });

    test('custom', () => {
        const ext = `.${chance.string({pool})}`;
        const result = chance.path({ext});
        const parsed = parse(result);

        expect(parsed.ext).toEqual(ext);
    });

    test('custom ext without leading `.`', () => {
        const ext = chance.string({pool});
        const result = chance.path({ext});
        const parsed = parse(result);

        expect(parsed.ext).toEqual(`.${ext}`);
    });
});

describe('name', () => {
    test('default', () => {
        const result = chance.path();
        const parsed = parse(result);

        expect(parsed.name).toEqual(word);
    });

    test('custom', () => {
        const name = `.${chance.string({pool})}`;
        const result = chance.path({name});
        const parsed = parse(result);

        expect(parsed.name).toEqual(name);
    });
});

describe('root', () => {
    test('default', () => {
        const result = chance.path();

        expect(isAbsolute(result)).toEqual(bool);
    });

    test('custom true', () => {
        const root = true;
        const result = chance.path({root});

        expect(isAbsolute(result)).toEqual(root);
    });

    test('custom false', () => {
        const root = false;
        const result = chance.path({root});

        expect(isAbsolute(result)).toEqual(root);
    });
});
