BUGFIXES:
\_ demigod listed under god

NEXT:

IMPROVEMENTS: \* hide cards search filters except for name

FEATURES: - Multiple (Want-) list

- Wants list (text export, proxie printer)
- on card overview, show which decks include that card
- add set view: display all cards from a set, allow search/filter. Just add this as a filter to _all cards_ view

REFACTORINGS:

    * Add db constraint, if amount + amountFoil = 0 => delete row
