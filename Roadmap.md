# PRIORITY BUGFIXES

- auto update cards on prod not working

# BUGFIXES:

# CURRENT:

# NEXT:

- add tags (sort by type (ramp, card draw, ...))
- allow editing wantsname and delete wants in deck sidebar

# FOLLOW-UP MIGRATION:

- re-enable deck card selection for mobile
- display eur prices in collection value + graphs
- display how many cards are included in eur/usd price (collection)

# IMPROVEMENTS:

- redesign moveTo modal, especially for mobile
- mobile card list preview: allow swipe to next card
- move to new image service
- deck: check for illegal dupliactions

- add deck colors to deck overview list
- improve re-rendering of table columns and grid card. especially table.
- added to collection notification -> show amount as well
- add optimistic response to card delete in deck (esp. mobile)

# PERFORMANCE:

- remove elements/shared/index.js, same for mobile and desktop -> evaluate if this has an effect on the bundle sizes
- wrap expensive calculations and small components in GridCard in memo and useMemo

# FEATURES:

- show last search when no input in searchbar
- check for multiple copies of one card for deck legality check
- show if deck is legal in deck overview, order by legality (similar to magic arena)

# REFACTORINGS:

- Split more code with React.lazy
- evaluate removing some caching, using network-only more
- add field to cards table: version number (1 or 2 in most cases) for:
  - Not having to calc it again in oracleCard -> allSets
  - When adding a card to collection/deck avoid version numbers other than 1. I think that means preferring version 1 for distinctCards

# BACKLOG:

- select cards -> copy to some deck -> selection should be cleared, but isn't
- when adding basics to deck, default to full art that as an mkm price
- remove all cards < 0.2\$ from collection value , rename value to estimation (?)

- refresh google access ?
- better tooltips for multi input icon
- swipe card preview on mobile
- going back to list should preserve scroll position (desktop)
- advanced adding:
  - display all versions from a card + their setname, maybe with preview
- when opening login, redirect to "/" if user is logged in
- add to advanced search: number of owned copies
- allow searching for multiple sets/types/subtypes?
- add error page (should be already started, search for branch)
- clickable creature type in card details?
- home page:
  - quick stats for collection
  - quick access for last edited decks + wants ?
- show % owned of all cards (unique cards / distinct cards)
- prevent user from adding amount / amount foil if card is not available in foil / non-foil
- prefer owned versions when adding to deck or wants
- suggest similar cards when having invalid cardname in multiinput
- dark mode
- allow text export of selected cards
- rework advanced search:
  - show all current search options for advanced search
- use first card / 4-split card as wants list image

# BACKLOG BUGFIXES:

- sometimes rules of previously viewed cards displayed instead of current card
- Deck dropzone is small if only commanders are in the deck
- advanced search -> add card to collection: owned badge not displayed
- collection: when one price is null, 0 is displayed even if one owned card has a value
- add to collection mobile: after adding prev unowned card (gitrok monster), wrong minPrice in wantsList
- mobile: collection -> card details view -> remove from collection -> back to collection: card not deleted
- when sorting by price high to low, cards are displayed with min price instead of max price
