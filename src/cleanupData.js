const forbiddenTitles = [
  'director',
  'principal',
  'lead',
  'manager',
  'founding',
  'staff',
  'junior',
  'jr',
  'intern',
  'internship',
  'coop',
  'clearance',
  'crypto',
  'web3',
]

const forbiddenDetails = [
  'clearance',
  'crypto',
  'dapp',
  'web3',
]

export const forbiddenWords = {
  title: [...forbiddenTitles, ...forbiddenDetails],
  details: forbiddenDetails,
}

export const flagForbiddenWords = (text, section) =>
  forbiddenWords[section]
    .every((w) => {
      const formatted = text[section]
        ?.toLowerCase()
        .replace(/\W/g, ' ')
        .split(' ')

      return !formatted.includes(w)
    })

// TODO: some kind of markdown config
//  also, probably to move this entire section

// import a markdown parser
// convert HN results, as well as HTML sections of Indeed listings
// maybe JSDOM could also be useful to prune some of these HTML trees...

// browser automation for getting the real links from Indeed

/*
import { DOMParser }
import { TDService } from 'npm:turndown'

const html2md = html => {
  const doc = new DOMParser().parseFromString(html, 'text/html')
  const list = [...doc.querySelectorAll]

  list.forEach(e => { e.parentNode.innerHTML = e.innerHTML })

  return new TDService().turndown(doc.body.innerHTML)
}





import { unified } from 'npm:unified'
import rehypeParse from 'npm:rehype-parse'
import remarkParse from 'npm:remark-parse'
import rehypeStringify from 'npm:rehype-stringify'
import remarkStringify from 'npm:remark-stringify'
import rehypeRemark from 'npm:rehype-remark'
import remarkRehype from 'npm:remark-rehype'

const html2md = async (html) => await unified(doc.body.innerHTML)
  .use(rehypeParse)
  .use(rehypeRemark)
  .use(remarkStringify)
  .process(html) // this outputs an object...
  .then(({ value: v }) => v) // ... with 'value' containing the actual string



const md2html` = md => await unified()
  .use(remarkParse)
  .use(remarkRehype)
  .use(rehypeStringify)
  .process(md) // this outputs an object...
  .then(({value: v}) => v)...

*/
