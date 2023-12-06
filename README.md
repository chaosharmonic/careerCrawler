# careerCrawler

(For more detail on the below, see DESIGN.md)

## What? (Overview)

This is a loose collection of tooling I've been building as a side project to automate my job search habits. Primarily, this has involved building scrapers to grab results from job boards and output the results as JSON, and up until now it's mostly been [an extended experiment in Web scraping](https://bhmt.dev/blog/scraping) (hence the name).

Now, its an experiment in a *few* different things -- the database schema are a first crack at using TypeScript, I'm taking Deno KV (and `kvdex`) for a spin for data persistence, and I've been toying around with a few different options for an eventual UI.

The code in this repo is a bit of a skeleton, mostly because it contains the pieces I'm building *around* the platform-specific scraping code (and some loosely anonymized examples), and not the scraping code itself.

## Why? (Goals and non-goals)

Primarily, it's a tool I've been building for me -- as an experiment, a learning exercise, and a tech demo to show off to anyone that it's aided me in connecting with. Mostly, it's because I believe in building the thing you want to use.

A *secondary* purpose is as a tool for others, but while I'm sharing this as I build it out, my core use case is speed up/scale up my own workflow. so while I have a backlog of "features" I want to add, they prioritize practical uses more than things that might enable, say, setting this up as a hosted service. Once I at least have a UI that I like (and somebetter definition aroudn the db modeling), I'll probably throw together some test data as a demo, to aid in setting this up locally, but I'm trying to *reduce* tedium so I'm not especially interested in the maintenance burden of maintaining the scraping code for public consumption.

(If you don't mind that I have no intention of *supporting* it, though, feel free to reach out for a private repo containing my site-specific implementatons.)

That said, part of removing tedium here is to keep the project as self-contained as possible -- using what comes out of the box first, and then leaning on third-party libraries only where I *need* them. It's not *entirely* free of them -- and that's not an explicit goal -- but by using something with batteries included and keeping the toolchain lean I don't have to think about every individual piece of it.

## How? (Running this project)

(Note: this section should get more organized as I actually flesh out the *application* around the data)

### Prerequisites

- Make sure a recent version of [Deno](https://deno.land/) is installed on your operating system of choice.
  - Deno doesn't have an equivalent to the `engines` field in `package.json`, but if you're troubleshooting generally speaking I keep my local install up to date with current releases.

For now, that's it. Dependencies are pulled in using import maps and HTTP, so you don't need to install any of them up front.

### Usage

The core workflow is built around using Deno's standard task runner. Currently I'm leveraging this for gathering new listings, and that'll expand as I'm 

And tasks are run using the standard task runner -- define them in `deno.jsonc` and run them using `deno task {name}`. Whatever API that I eventually flesh out around the data will eventually run in the same fashion, and if you do make use of this to do any similar data gathering on your own, you'll want to use the config file to manage these.

I've left the one to get "who is hiring" threads from a Hacker News API intact, for example's sake. But it's not going to give you structured responses, and is really just there for the sake of having *a* task to illustrate this with. (Plus, your workflow isn't necessarily my workflow, so if you're so inclined you might find better use out of just the forum posts than I did.)

Otherwise, what you'll want to do is modify the scraping code provided to fit your platform of choice. I've provided loose examples of scraping both paginated lists and infinite scrolls. They're based on the ones I'm using myself, but have been adapted to be a little more generic. Note that (for similar reasons to the above) this doesn't cover beating things like CAPTCHAs or nagging auth popups, so you'll have to write those handlers on your own.