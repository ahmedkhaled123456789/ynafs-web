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

/**
 * @typedef {Object} IUnitsAndChaptersData
 * @property {string} _id
 * @property {Category} category
 * @property {any[]} chapters
 * @property {string} codeId
 * @property {string} codeType
 * @property {string} createdAt
 * @property {string} lessons
 * @property {Level} level
 * @property {Semester} semester
 * @property {Stage} stage
 * @property {Subject} subject
 * @property {any[]} subjectBooks
 * @property {any[]} teacherGuides
 * @property {string} title
 * @property {Parent} parent
 */
/**
 * @typedef {Object} Category
 * @property {string} _id
 * @property {string} title
 */
/**
 * @typedef {Object} Level
 * @property {string} _id
 * @property {string} title
 */
/**
 * @typedef {Object} Semester
 * @property {string} _id
 * @property {string} title
 */
/**
 * @typedef {Object} Stage
 * @property {string} _id
 * @property {string} title
 */
/**
 * @typedef {Object} Subject
 * @property {string} _id
 * @property {string} title
 */
/**
 * @typedef {Object} SubjectBooks
 * @property {string} title
 * @property {boolean} isActive
 * @property {string} imagePath
 * @property {string} path
 */
/**
 * @typedef {Object} Parent
 * @property {string} _id
 * @property {string} title
 */

/**
 *
 * @param {IUnitsAndChaptersData[]} items
 */
export const assignChaptersToUnits = (items) => {
  const results = [];
  for (const item of items) {
    if (item.chapters.length) {
      item.chapters = item.chapters.map((e) => items.find((a) => a._id === e));
      results.push(item);
    } else if (!item.parent) {
      results.push(item);
    }
  }

  return results;
};
