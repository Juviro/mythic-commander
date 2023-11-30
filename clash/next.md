# Bugs

- card position change only works sometimes

# Current feature

- display active player differently? Maybe icon next to name. The current implementation takes up too much space.

- sidebar

  - current turn
  - restart game


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

- defeated player / ff

- adjust colors to work on every background
  - black and red are too dark

- track commander damage

- message in the center of the screen for

  - active player changes
  - animated (grow)

- flip coin, roll dice

- long clicking life buttons adds in 10s

- stack

  - movable popup?
  - only visible when it contains cards or when dragging

- allow setting stop point in phase in opponent's turn
- display number of cards in hand, lib, graveyard, exile
- when playing alone, display partner commanders next to each other
- store currentGames (in redis?)

# Backlog Bugs

- cards form other players have wrong sleeve color in hand
