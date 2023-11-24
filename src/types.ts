// WIP. Built for

export interface Person {
  name: string
  title?: string
  email?: string
  notes: string // Markdown
  // ...other contact info?
  // contactHistory??
  // also this should account for personal outreach
}

// this *seems* like it could feasibly be used
//  for reviews *or* job listings, honestly
// I'm actually not sure I need anything more
//  specific than this
export interface SearchSource {
  name: string
  postDate?: Date // if available
  retrievalDate: Date // this needs to account for recruiters
  retrievalLink: string // is URL a valid TS type?
}

// export interface ReviewSearchParams?
// do I want to specifically filter for, say, rating?

export interface JobSearchParams { // more?
  searchTerms: string
  location: string
  maxAge?: number
  salary?: number
}

type JobSearchSource = SearchSource & JobSearchParams & {
  redirectLink?: string
  easyApply?: boolean // mostly for validation, assuming it's there even
  // (not every platform exposes this if you're not logged in)
}

// interface Referral {
//     company: string,
//     contact: Person
// }

// TODO: parse these from a Markdown file?
//  take that file as an an upload
// at least, *maybe*... need to handle input
//  sanitization for that but I should theoretically
//  be doing that anyway... even if I could otherwise
//  just scaffold them from a list of inputs
//  from a set of default parameters
// but, properly sanitized, separating by newline
//  would be an easy way to setup a list of these
// the other fields *do* all start blank...
export interface InterviewQuestion {
  isRecon: boolean // indicates that this question is mine
  // (that name is temporary though)
  question: string
  answer: string // could include 'n/a' if not relevant
  // could be parsed during recon and not actually
  //  asked *during an interview*
  children?: InterviewQuestion[] // follow-up questions
}

export interface Interview {
  round: number
  category: string // 'phone screen', 'technical', etc
  notes: string // Markdown
  questions: InterviewQuestion[]
}

export interface JobPost {
  title: string
  company: string
  location: string
  notes: string // Markdown
  sources?: JobSearchSource[]
  // prune all posts >90 days old and not at least swiped right
  //  (that date should be user-configurable)
  // entry *could* be manual, since this is kind of a CRM ofc --
  //  should maybe have something for that actually
  // duplicate stacking should be default only if associated company
  //   isn't a recruiting firm (else, those could actually be
  //   different jobs)
  referral?: Person
  // not just internal can be a recruiter
  // I might want to set person as an ID reference though
  pay?: string | number
  // probably should keep as a string, unless I can
  //  reliably parse both range and time interval
  //  it... seems on a test like Mistral can do this though?
  directApply?: boolean // for recruiting firms
  applyLink?: string
  applyEmail?: string // this is different from a contact
  // because it *could* just be a generic email
  lifecycle: string
  // needs custom params, since not all interviews look the same
  // this should be fleshed out w interview types and notes, too
  //  but that can be for later, and *either way* I still need
  //  some kind of init state
  shortDescription?: string
  fullDescription?: string
  interviews?: {
    totalRounds: number
    details: Interview[]
  }
}

enum Reviewer {
    Customer = 'customer',
    Employee = 'employee'
}

export interface CompanyReview {
  rating: number
  detail: string
  source: SearchSource // should job boards have enums?
  date: Date
  createdBy: Reviewer
}

export interface Company {
  name: string // assume public-facing for now
  // dba?: string,
  website: string
  // locations??
  size: number // this data should maybe be prioritized
  // by source, or level of detail, or something...
  recruitingFirm?: boolean
  industry?: string // (this is loose)
  funding?: string // enum for this?
  ownership?: string // enum for this?
  employeeReviews: CompanyReview[] // maybe also capture customer reviews
  // ignorePosts: boolean, // should this be a user setting instead?
  // user settings should also include cover letter overrides
  jobs?: JobPost[] // id references?
  contacts?: Person[] // separate model for this?
  bio?: string // this one should also be prioritized somehow
  // also (while 'bio' is a little more scoped) 'about' can mean
  //  a *lot* of things
  // see also: benefits, culture stuff, remote, etc
  // this is a later recon thing anyway, but *still*
  // this might *also* be a job for an llm
  // recentNews?, // {source, headline, date}
  //  define recent?
  // redFlags?: string[] // enum?
  // greenFlags?: string[] // enum?
  // outreach history?
}
