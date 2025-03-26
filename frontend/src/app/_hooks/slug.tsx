export const toSlug = (str: string) => {
    return str
      .toString()
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]+/g, "");
};

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