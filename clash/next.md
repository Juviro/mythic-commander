# Bugs

- card position change only works sometimes

# Current feature

- sidebar

  - track commander damage
  - current turn
  - restart game

- display active player differently? Maybe icon next to name. The current implementation takes up too much space.

# MVP

- only show card tooltip on right click?

* layout:

  - exile

* snap

  - to grid
  - to other cards
  - enchant / equip

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

* library

  - search
  - shuffle
  - scry, mill
  - put card on bottom, on nth position

* graveyard

  - search

* hand

  - discard random card

* shortcuts for every action

* game
  - mulligan

# Backlog

- message in the center of the screen for

  - active player changes
  - animated (grow)

- flip coin, roll dice

- stack

  - movable popup?
  - only visible when it contains cards or when dragging

- allow setting stop point in phase in opponent's turn
- display number of cards in hand, lib, graveyard, exile
- when playing alone, display partner commanders next to each other
- store currentGames (in redis?)

# Backlog Bugs

- cards form other players have wrong sleeve color in hand
