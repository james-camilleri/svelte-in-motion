# Svelte in Motion

Procedurally-generated video using everyone's favourite framework and ungodly hackery.

## Outline

- hello
- short intro
  - james
  - front-end dev, have been doing it for a while
  - originally from Malta, been in London a few years
  - overlay Malta on London map
  - first exposed to front-end dev through neopets (picture of Kau) and I apparently enjoyed the ride
  - also interested in graphic design and animation
  - this talk is a fusion of those interests
- quick timeline of animation
  - hand-drawing: hassle, time-consuming
  - flash & after effects: keyframes, still very hands-on
  - WHAT IF CODE
  - scripting after effects
  - can we cut out the middleman entirely?
- video through code
  - the concept - let's use front-end animation tools to generate actual video files
  - prior art: the react thing
  - walkthrough of how I hacked together the same thing in svelte from first principles
  - DISCLAIMER
  - side note: why would you do this?
    - definitely not worth the hassle for a one-off video
    - if you need lots of subtly different videos though, or personalised videos, this can get handy
- problems to solve:
  - how do we get the front-end scene out of the browser?
    - playwright!
    - screenshot tool
    - why don't we just record the thing (?)
      - more stable
      - can pause and resume rendering
      - can split into multiple machines if you want to get fancy
  - how do we make this deterministic? (i.e. how do we ensure each frame is just as we expect it to be?)
    - don't rely on the computer clock - manually set your counter
    - we can drive this through the url to render whichever frame we want
    - this makes us immune to the whims of computer gremlins and timing fuckery (can I say fuckery?)
    - the additional benefit is that you can render particular sections or parallelise work
  - how do we actually turn this into a usable video?
    - ffmpeg to the rescue
- adding pizazz / multiple universes - controlled randomness
  - technique really shines when you need to produce multiple variations of a thing (title cards for example)
  - using the same template and some parametrised components we can generate variations of the same video using a different random seed
  - ant parameters can be passed through the URL, just like the frame number
  - here's one I made earlier
  - we can also pair this with cool stuff like svelte cubed to create some very nifty clips
  - (let me know if you need a hand with the next svelte summit titles)

Disclaimer: This is not a product, library, or project, in any way shape or form. It is a haphazard collection of hackery and botches that did what I needed it to do at the time. You are free to use and abuse it as you see fit, but I would hardly call it a production-ready solution.
