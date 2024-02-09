# Current feature


# Bugs

* opponet's hand have hover animation
* hovered hand card is too high when playing with 4 players
* windows (mac too): hand with a lot of cards; rightmost cards not draggable
* don't allow selection rect with only one card
* planeswalker copies don't enter with counters

# MVP

* logs for new actions?
  * create tokens
  * add counters
  * copy card
  * flip card
  * turn card face down/up


* when aligning a card stacked with lower x/y, put it behind the other card


* icons for card actions:
  * tap (tap)
  * flip (dfc-front, dfc-back)
  * turn face-down (dfc-facedown)

* flip coin, roll dice
  * chat commands? /coin, /dice 3d6

* Lobby
  * Allow selecting non-active decks as well
  * display link in lobby to create a deck
  * when going back to gamebrowser, the url changes, making it impossible to use browser forward button to get back to game

* defeated player / ff
  * remove all cards from all other players' zones
  * move commander to command zone
  * grey out commandzone, name
  * write "Defeated" instead of life total

* card selection: 
  * display how many cards are selected
  * allow aligning selected cards, use top-left card for alignment



# Easter Eggs

# Backog

* add to battlefield actions: untap all [u]

* allow joining lobby via url (e.g. http://localhost:1235/#4fqufdulls6ckz15)

* allow copying selection?

* when dragging card over hand, it should have the hand card size

* display warning for users with small screens

* special sleeve for commander, visible in lib as well?

* win animation when all opponents are defeated (maybe fireworks from todo app)

* allow dragging card selection into graveyard, exile, hand

* animate card when moved from any zone to battlefield (?)

* in card previed, show related cards as well

* dragging a card briefly shows the card in the original position (prod only because of latency)
  * add context that stores new card positions whenever they are dropped in BattlefieldDropzone.
  * check for that position in BattlefieldCard and overwrite original position
  * delete it from that context whenever the cardId is in an update


* put reminder token onto library (e.g. for Mana Crypt)

* add notes to card

* adjust colors to work on every background
  * black and red are too dark

* track commander + infect damage

* message in the center of the screen for
  * active player changes
  * animated (grow)

* long clicking life buttons adds in 10s

* select all lands -> click "organize" -> all lands are neatly organized

* when searching lib, add quick filter for lands with basic land types

* stack ?
  * movable popup?
  * only visible when it contains cards or when dragging

* allow setting stop point in phase in opponent's turn
* when playing alone, display partner commanders next to each other
* store currentGames (in redis?)

* show last games in lobby
* display confirm when user closes tab
* add route /playtest/:deckId
  * no stored game state in backend
  * reloading resets the game (destroy game state on socket disconnect)

* display which players are connected
  * display connect / disconnect messages
  * show message when you are disconnected
  * auto-reconnect

* prevent interacting with own lib when someone is peeking it (self or opponent)

* keep cards visually tapped when moving them to battlefield
  * allow aligning as if the cards was untapped

* shuffle library animation

* add option to play with planechase

* allow rotating cards by 90, 180deg. Auto rotate battles

* document all shortcuts

* allow peeking at face-down cards

* add sounds
  * when you become the active player
  * drawing
  * on chat message
  * when a card is moved, flipped, tapped, untapped, turned face down/up ?

# Optimizations

* prevent re-render of interface components when menu changes, e.g. when changing life
* use transform to set card position on battlefield
* when moving multiple cards, only send one request and update (e.g. move all cards from graveyard to exile)

# Backlog Bugs

* sometimes tokens are suggested twice
* when opening the card context menu on hand, sometines the next card is hovered due to the mouse moving
* cards from other players have wrong sleeve color in hand
* when moving a peeking card into hand, the draw animation is used
* on page load, cards in exile are animated
* milling action animation is wrong on flipped board
* align indicator when aligning both x and y not in center of card when it's left and/or top aligned
* after moving all cards from graveyard -> library, whenever you draw a card after that, an animation is played fom graveyard to library
