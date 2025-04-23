export const toSlug = (str: string) => {
    return str
      .toString()
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]+/g, "");
};

export const removePTags = (str: string) => {
    return str.replace(/<\/?p>/g, '');
}

export const youTubeGetID = (url: string) => {
    const [a, , b] = url.replace(/(>|<)/gi, '').split(/^.*(?:(?:youtu\.?be(\.com)?\/|v\/|vi\/|u\/\w\/|embed\/|shorts\/)|(?:(?:watch)?\?v(?:i)?=|\&v(?:i)?=))([^#\&\?]*).*/)
    if (b !== undefined) {
        return b.split(/[^0-9a-z_-]/i)[0]
    } else {
        return a
    }
}