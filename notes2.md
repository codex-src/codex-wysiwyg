backspace
inserting (rename write to insert? so we have insert and input?)
non-standard components (1 of 2)

# data serialization

we already know how to deserialize react elements
(children). now we need to possibly support deserializing
dom nodes or even a string (preferable); we want to simulate
reading html from a server and parsing. i don't think
reading and writing state to json actually makes sense
because it's harder to reason about and way more susceptible
to deprecated api practices / changes. this is why html
seems highly preferable so long as it's in 'standard form'

finally, we want to make sure we can easily save and
validate state. it seems to make sense to save to html. the
caveats are possibly escaping and de-escaping the necessary
html (which may be annoying) and make sure the html is in
'proper form'. maybe we can use an alternative to
reactrenderer to render to a string? note that the lack of
spacing and padding may become problematic or hard to reason
about. alternatively we can just recurse on state.elements

# formatting

formatting will probably be easy considering the data
structure. the only unknown is how to deal with the first
character of an unprocessed format

changing formatting for top-level elements is less obvious;
can all elements convert from one type to another? what
happens to props?

# backspace

backspace isn’t terribly hard to reason about, there are
essentially two fronts to cover; backspace needs to work on
different references pathways depending based on types; this
shouldn’t be that much more work, but we need to be mindful
of multi-paragraph components. note that in theory we need
to accommodate string and span-deletion, dependent on the
host type

committing backspaces in it of itself isn't hard but there
are two considerations to account for: we probably want to
change the iterators api to return x and y offsets, not just
total offsets. this makes more sense because we don’t have a
concept of absolute positions anymore. secondly, we need to
be able to deal with nested non-span elements

make sure that after processing any array of spans that we
commit the necessary post-processing merge and sort higher-
order functions. use Spans.postProcess or similar?

# inserting

...
