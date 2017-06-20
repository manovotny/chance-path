const {isAbsolute, parse} = require('path');

const Chance = require('chance');

const path = require('./index');

describe('index.js', () => {
    const chance = new Chance();
    const pool = 'abcd';

    let bool,
        d6,
        word;

    beforeEach(() => {
        bool = chance.bool();
        d6 = chance.d6();
        word = chance.word();

        spyOn(Chance.prototype, 'bool').and.returnValue(bool);
        spyOn(Chance.prototype, 'd6').and.returnValue(d6);
        spyOn(Chance.prototype, 'word').and.returnValue(word);

        chance.mixin({
            path
        });
    });

    describe('depth', () => {
        it('should return default depth', () => {
            const result = chance.path();
            const parsed = parse(result);
            const parts = parsed.dir.split('/');
            const depth = isAbsolute(result) ? parts.length - 1 : parts.length;

            expect(depth).toEqual(d6);
        });

        it('should return custom depth', () => {
            const d8 = chance.d8();
            const result = path({depth: d8});
            const parsed = parse(result);
            const parts = parsed.dir.split('/');
            const depth = isAbsolute(result) ? parts.length - 1 : parts.length;

            expect(depth).toEqual(d8);
        });
    });

    describe('ext', () => {
        it('should return default ext', () => {
            const result = chance.path();
            const parsed = parse(result);

            expect(parsed.ext).toEqual(`.${word}`);
        });

        it('should return custom ext', () => {
            const ext = `.${chance.string({pool})}`;
            const result = path({ext});
            const parsed = parse(result);

            expect(parsed.ext).toEqual(ext);
        });

        it('should return custom ext and add leading `.` if missing', () => {
            const ext = chance.string({pool});
            const result = path({ext});
            const parsed = parse(result);

            expect(parsed.ext).toEqual(`.${ext}`);
        });
    });

    describe('name', () => {
        it('should return default name', () => {
            const result = chance.path();
            const parsed = parse(result);

            expect(parsed.name).toEqual(word);
        });

        it('should return custom name', () => {
            const name = `.${chance.string({pool})}`;
            const result = path({name});
            const parsed = parse(result);

            expect(parsed.name).toEqual(name);
        });
    });

    describe('root', () => {
        it('should return default root', () => {
            const result = chance.path();

            expect(isAbsolute(result)).toEqual(bool);
        });

        it('should return custom root', () => {
            const root = chance.pickone([true, false]);
            const result = chance.path({root});

            expect(isAbsolute(result)).toEqual(root);
        });
    });
});
