const getBase = (name, ext) => {
    if (name && ext) {
        return name + ext;
    }

    if (name && !ext) {
        return name;
    }

    if (!name && ext) {
        return chance.word() + ext; // eslint-disable-line no-undef
    }

    return '';
};

module.exports = ({depth = chance.d6(), ext = '', name = '', root = false} = {}) => { // eslint-disable-line no-undef
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
