port module RandomGif exposing (main)

import Html exposing (program, div)
import Json exposing (Json)
import Http exposing (Http)

main =
  program { init = init, update = update, view = view, subscriptions = subscriptions }

-- MODEL

type alias Model =
  { topic : String
  , gifUrl : String
  }

init : (Model, Cmd Msg)
init =
  (Model "cats" "waiting.gif", Cmd.none)

-- UPDATE

type Msg
  = MorePlease
  | NewGif (Result Http.Error String)

update : Msg -> Model -> (Model, Cmd Msg)
update msg model =
  case msg of
    MorePlease ->
      (model, getRandomGif model.topic)

    NewGif (Ok newUrl) ->
      ({model| gifUrl = newUrl }, Cmd.none)

    NewGif (Err _) ->
      (model, Cmd.none)

getRandomGif : String -> Cmd Msg
getRandomGif topic =
  let
    url =
      "https://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag=" ++ topic

    request =
      Http.get url decodeGifUrl
  in
  -- Http.send turns the request into a Cmd Msg
    Http.send NewGif request

decodeGifUrl : Json.Decoder String
decodeGifUrl =
  Json.at ["data", "image_url"] Json.string

-- VIEW

view : Model -> Html Msg
view model =
  div []
  [ h2 [] [text model.topic]
  , img [src model.gifUrl] []
  , button [ onClick MorePlease ] [ text "More Please!" ]
  ]