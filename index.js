const getBase = (name, ext) => {
    let base = '';

    if (name) {
        base += name;
    }

    if (ext) {
        if (!ext.startsWith('.')) {
            base += '.';
        }

        base += ext;
    }

    return base;
};

module.exports = ({depth = chance.d6(), ext = `.${chance.word()}`, name = chance.word(), root = chance.bool()} = {}) => { // eslint-disable-line no-undef
    const path = chance.n(chance.word, depth); // eslint-disable-line no-undef
    const base = getBase(name, ext);

    if (base) {
        path.push(base);
    }

    if (root) {
        path.unshift('');
    }

    return path.join('/');
};
