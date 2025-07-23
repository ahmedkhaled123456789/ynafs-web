/**
 * @typedef {Object} IBook
 * @property {string} title
 * @property {boolean} isActive
 * @property {string} imagePath
 * @property {string} createdDate
 * @property {string} path
 */

/**
 *
 * @param {IBook[]} books
 */
export const filterCurrentYearBooks = (books) => {
  const currentYear = new Date().getFullYear();
  return books.map((e) => {
    const books = [...(e.books || [])];
    return {
      ...e,
      books: books.filter((e) => {
        const isNotDuplicated =
          books.filter(
            (a) => a.title.split("/")[0].trim() === e.title.split("/")[0].trim()
          ).length > 1
            ? e.createdDate.includes(currentYear.toString())
            : true;
        return isNotDuplicated;
      }),
    };
  });
};
