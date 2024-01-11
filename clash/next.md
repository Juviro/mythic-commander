# Current feature

* Bugs:

* card actions
  * counter
    * +1/+1
    * -1/-1
    * loyalty / chapter(?) (maybe automatically)
    * ??? maybe retrieve from database (search for "XXX counter")

# Bugs



# MVP

* card previews
  * for hand to see backside  
  * maybe display them over the chat instead of in-place?


* battlefield
  * context menu
    * create token, including emblems

* hand
  * play card face-down (e.g. fortell, morph) -> type already defined: FaceDownCard

* shortcuts for every action

* game
  * mulligan

* when aligning a card stacked with lower x/y, put it behind the other card


# Backlog

* animate card when moved from any zone to battlefield (?)

* dragging a card briefly shows the card in the original position (prod only because of latency)
  * add context that stores new card positions whenever they are dropped in BattlefieldDropzone.
  * check for that position in BattlefieldCard and overwrite original position
  * delete it from that context whenever the cardId is in an update

* save gamestate whenever a player leaves

* add notes to card

* defeated player / ff

* adjust colors to work on every background
  * black and red are too dark

* track commander damage

* message in the center of the screen for
  * active player changes
  * animated (grow)

* flip coin, roll dice

* long clicking life buttons adds in 10s

* stack ?
  * movable popup?
  * only visible when it contains cards or when dragging

* allow setting stop point in phase in opponent's turn
* display number of cards in hand, lib, graveyard, exile
* when playing alone, display partner commanders next to each other
* store currentGames (in redis?)

* show last games in lobby
* display confirm when user closes tab
* add route /playtest/:deckId
  * no stored game state in backend
  * reloading resets the game (destroy game state on socket disconnect)

* display which players are connected
  * display connect / disconnect messages

* prevent interacting with own lib when someone is peeking it (self or opponent)

* keep cards tapped when moving them to battlefield
  * allow aligning as if the cards was untapped

* distinguish between flipped and face-down. There can be a two-faced card that is face-down and therefore not visible

* shuffle library animation

# Optimizations

* prevent re-render of interface components when menu changes, e.g. when changing life
* use transform to set card position on battlefield
* when moving multiple cards, only send one request and update (e.g. move all cards from graveyard to exile)

# Backlog Bugs

* when going back to gamebrowser, the url changes, making it impossible to use browser forward button to get back to game
* cards from other players have wrong sleeve color in hand
* when moving a peeking card into hand, the draw animation is used
* on page load, cards in exile are animated
* milling action animation is wrong on flipped board
* align indicator when aligning both x and y not in center of card when it's left and/or top aligned
* after moving all cards from graveyard -> library, whenever you draw a card after that, an animation is played fom graveyard to library
