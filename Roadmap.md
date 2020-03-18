BUGFIXES: \*
Card view jumpts to page top when switching set
demigod listed under god

NEXT:

IMPROVEMENTS:

FEATURES:

- searchable, paginated cards list

* Wants list (text export, proxie printer)
* on card overview, show which decks include that card
* add set view: display all cards from a set, allow search/filter. Just add this as a filter to _all cards_ view

REFACTORINGS:

    * Add Skeleton component that wraps around other components ?
    * Check query fetching (re-rendering) in search bar
    * Add db constraint, if amount + amountFoil = 0 => delete row
    * evaluate moving collection to provider, just updating it - CURRENTLY NOT NECESSARY (collection is unused) - is it?

---

- Don't show app skeleton when user is not authenticated yet?
- add support for multiple commanders to commander color identity etc (low prio)
