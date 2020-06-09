i think we need some rules for fields;

a*b*c
*a*bc
ab*c*


# sort
- unstyled fields should not under or over-extend
- all fields in it of themselves must have a length
- all consecutive fields must run forwards -- fields must
start on or at least the same start-offset
- all consecutive fields must be contained in the previous
field, partially contained to the right, or not contained at
all
- partially contained fields need not be split into two or
more subfields. such fields should be joined if detected; by
joining such fields, this does not violate conditions a or b
- all combinations of fields must be described in a two-
dimensional array, and at most, describe any possible dom
state
- in theory, any combination of random fields is allowable
*if* properly sorted based on the previous conditions
- sort order only impacts consecutive elements that share
the start-offset
- duplicate fields are not allowed; once a field is
declared, for the entirety of that scope no such further
fields may be used or adjacent
- some attributes may de-attribute nested attributes, such
as code (perhaps this should be configurable)

# validatation
- note that sorting and validating are not the same; sorting
guarantees that all consecutive fields start on or at least
the same start-offset and are contained, partially
contained, or not contained at all with the previous field.
however, this may still yield an invalid state; for example,
a code field cannot belong inside of a code field
- a valid field can be described as an ordered-by-precedece
field that is not self-similar; these should be treating as
warnings or no-ops
- the precedence order itself is arbitrary but must be
internally consistent; a best practice may be a > em >
strong > code > ... but not that the order itself should not
matter. the one exception to this rule is link fields,
because links should be treated as 'greedy' fields
- any field that is a hyperlink is considered a 'greedy'
field, greedy fields in it of themselves should also be
ordered-by-precedence and be internally consistent
- an editor must describe a validated, sorted array of
fields based on these rulesets
- note that validation influences the sort-order due to
field precedence and 'greedy' field precedence

sortedFields = fields.sort()
validatedSortedFields = sortedFields.validate()

[
	[
		[
			[
		]
			]
		[

		]






	]
]
