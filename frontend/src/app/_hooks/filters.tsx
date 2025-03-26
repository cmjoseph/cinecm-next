export const getAllActors = (array: any) => {
    const data = Array();
    const uniqueNames = Array();
    array.map((item: any, index: number) => data.push(item.actors));
    const merge = data.flat(1);
    let sortedArray = merge.sort();
    let cleanDup = new Set(sortedArray);
    let items = [...cleanDup];
    return items;
};

export const getAllDirectors = (array: any) => {
    const data = Array();
    const uniqueNames = Array();
    array.map((item: any, index: number) => data.push(item.directors));
    const merge = data.flat(1);
    let sortedArray = merge.sort();
    let cleanDup = new Set(sortedArray);
    let items = [...cleanDup];
    return items;
};

export const getAllYears = (array: any) => {
    const data = Array();
    const uniqueNames = Array();
    array.map((item: any, index: number) => data.push(item.year));
    const merge = data.flat(1);
    let sortedArray = merge.sort();
    let cleanDup = new Set(sortedArray);
    let items = [...cleanDup];
    return items;
};

export const getAllGenres = (array: any) => {
    const data = Array();
    const uniqueNames = Array();
    array.map((item: any, index: number) => data.push(item.genres));
    const merge = data.flat(1);
    let sortedArray = merge.sort();
    let cleanDup = new Set(sortedArray);
    let items = [...cleanDup];
    return items;
};