# Bugs

# Current feature


# MVP

* graveyard, exile
  - search


* card actions
  - tap
  - flip
  - counter
    - +1/+1
    - -1/-1
    - loyalty (maybe automatically)
    - saga (maybe automatically)
    - ??? maybe retrieve from database (search for "XXX counter")

* battlefield
  - emblems
  - select multiple cards
    - tap
    - move to different zone
  - context menu
    - create token


* hand
  - discard random card

* shortcuts for every action

* game
  - mulligan

- only show card tooltip on right click? - do this once the context menues are implemented

# Backlog

- defeated player / ff

- adjust colors to work on every background
  - black and red are too dark

- track commander damage

- message in the center of the screen for

  - active player changes
  - animated (grow)

- flip coin, roll dice

- long clicking life buttons adds in 10s

- stack ?
  - movable popup?
  - only visible when it contains cards or when dragging

- allow setting stop point in phase in opponent's turn
- display number of cards in hand, lib, graveyard, exile
- when playing alone, display partner commanders next to each other
- store currentGames (in redis?)

- show last games in lobby
- display confirm when user closes tab
- add route /playtest/:deckId
  - no stored game state in backend
  - reloading resets the game (destroy game state on socket disconnect)

# Backlog Bugs

- cards from other players have wrong sleeve color in hand
- on page load, cards in exile are animated
- milling action animation is wrong on flipped board
- prevent interacting with own lib when someone is peeking it (self or opponent)