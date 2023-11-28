# Career-Crawler

## What? (Overview)

This is a loose collection of tooling I've been building as a side project to automate my job search habits. Primarily, this has involved building scrapers to grab results from job boards and output the results as JSON, and up until now it's mostly been [an extended experiment in Web scraping](https://bhmt.dev/blog/scraping) (hence the name).

But the longer-term goal is I *guess* closer to a minimalist CRM. Ultimately, I want to also be able to do recon on *companies* this way, and use the data to automate more of this process. Varying ideas I've been throwing around include:

- tracking interactions with a company over time, referrals, etc
  - automating basic recon on companies that I'm potentially interested in
- cover letter generation
- a frontend loosely resembling Tinder for "swiping" through results (conceptually anyway, because I don't really care specifically about that design language)
  - a super-*dis*like, where "swiping" *down* means you never see posts from that company again

But you shouldn't assume the above is necessarily a roadmap, because this *isn't* a product.

## Why? (Goals and non-goals)

Primarily, it's a tool I've been building for me -- as an experiment, a learning exercise, and a tech demo to show off to anyone that it's aided me in connecting with. It's still not the *most* efficient way of doing this, necessarily -- I know there's a scattering of platforms with more modern ways of streamlining this process than what's offered by traditional job boards -- but I believe that there's value in building the things you want to use.

As for why it's not more than that:

- First of all, the point of this is to *remove* tedium, and maintaining scraping code in public, or for anything I could hypothetically sell, is an arms race I really don't want to deal with. I'll have some examples in the `scripts/` folder, but you'll want to modify them to suit your own targets. (I'm also being generic when I say "targets" because the *long* long-term plan is to automate other personal nonsense like apartment searching with this. The whole process of scrolling through listings, filtering them down by overall feasibility, and drafting a whole cover letter only to probably get ghosted is *infuriatingly* identical.)
- I'm also not sure I'll ever specifically care about deploying a live version of this, because it's mostly annoyance- and ego-driven development. My use cases are to save myself a bunch of time and have something interesting that I can then link back to in all of my cover letters. My primary use case is to run it locally, so while I might *build* a Web interface for it later, and I do have a loose backlog of personal feature requests (see above), that list doesn't necessarily prioritize things I'd need in order to deploy it in public (auth, for instance). It's mostly going to evolve as I use it, and you shouldn't assume there's *planning* or *direction* so much as just a loose barometer of what would make it more immediately useful to me in the moment.
- Moreover, I'm using it as a testing ground for various tools I haven't used before -- I'm still toying with some new options for data persistence, and as a prerequisite to even getting that running I've also been taking a first crack at TypeScript for modeling out its contents. (My use cases mostly prioritize brevity, so using it for the whole codebase also explicitly isn't a goal here.) So while I'm aiming to clean up the parts of this that I do make public, pieces of this I consider to be reasonably *good*, and pieces of this are experiments.

*But*, because the whole point here is to remove tedium, it *also* isn't heavily reliant on third-party libraries in order to run. The whole thing is built using Deno, and aims at avoiding excessive use of outside dependences. Not counting the Deno stdlib (or `jsonfile`, which *used* to be in the stdlib), dependencies I *am* using right now -- outside of any eventual UI -- are limited to polyfills (`DenoDOM`) and browser automation (`astral`).

I don't expect it to *stay* that way as I eventually flesh out the various pieces of this -- it isn't an explicit goal, and I can already think of several places where I'd hit walls if it were -- but my bias is to default to built-in tooling wherever it makes sense to do so, and scale past that only as I *need* outside libs. So what you *won't* need is to run a heavy toolchain of third-party dependencies in order to handle basic functionality.

## How? (Running this project)

- Make sure a recent version of [Deno](https://deno.land/) is installed on your operating system of choice.
  - Deno doesn't have an equivalent to the `engines` field in `package.json`, but if you're troubleshooting generally speaking I keep my local install up to date with current releases.

For now, that's it. Dependencies are pulled in using import maps and HTTP, so you don't need to install any of them up front. And tasks are run using the standard task runner -- define them in `deno.jsonc` and run them using `deno task {name}`. Whatever API that I eventually flesh out around the data will eventually run in the same fashion, and if you do make use of this to do any similar data gathering on your own, you'll want to use the config file to manage these.

I've left the one to get "who is hiring" threads from a Hacker News API intact, for example's sake. But it's not going to give you structured responses, and is really just there for the sake of having *a* task to illustrate this with. (Plus, your workflow isn't necessarily my workflow, so if you're so inclined you might find better use out of just the forum posts than I did.)

Otherwise, what you'll want to do is modify the scraping code provided to fit your platform of choice. I've provided loose examples of scraping both paginated lists and infinite scrolls. They're based on the ones I'm using myself, but have been adapted to be a little more generic. Note that (for similar reasons to the above) this doesn't cover beating things like CAPTCHAs or nagging auth popups, so you'll have to write those handlers on your own.

(If you don't mind that I have no intention of *supporting* it, though, feel free to reach out for a private repo containing my site-specific implementatons.)
