const Chance = require('chance');

const chance = new Chance();

module.exports = ({
    depth = chance.d6(),
    ext = `.${chance.word()}`,
    name = chance.word(),
    root = chance.bool()
} = {}) => {
    const path = chance.n(chance.word, depth);
    const extension = ext.startsWith('.') ? ext : `.${ext}`;
    const base = name + extension;

    path.push(base);

    if (root) {
        path.unshift('');
    }

    return path.join('/');
};
