// string.js slugify drops non ascii chars so we have to
// use a custom implementation here
import diacritics from 'diacritics'
const removeDiacritics = diacritics.remove
// eslint-disable-next-line no-control-regex
const rControl = /[\u0000-\u001f]/g
const rSpecial = /[\s~`!@#$%^&*()\-_+=[\]{}|\\;:"'<>,.?/]+/g

export const slugify = (str: string): string => {
  return (
    removeDiacritics(str)
      // Remove control characters
      .replace(rControl, '')
      // Replace special characters
      .replace(rSpecial, '-')
      // Remove continuos separators
      .replace(/\-{2,}/g, '-')
      // Remove prefixing and trailing separtors
      .replace(/^\-+|\-+$/g, '')
      // ensure it doesn't start with a number (#121)
      .replace(/^(\d)/, '_$1')
    // lowercase
    // .toLowerCase()
  )
}
