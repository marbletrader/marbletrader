port module DieRoll exposing (main)
import Html exposing (Html, div, text, button, h1)
import Html.Events exposing (onClick)
import String
import Random

main =
  Html.program { init = init, update = update, view = view, subscriptions = subscriptions }

-- MODEL

type alias Model =
  { dieFace : Int
  }

init : (Model, Cmd Msg)
init =
  (Model 1, Cmd.none)

-- UPDATE
type Msg
  = Roll
  | NewFace Int

update : Msg -> Model -> (Model, Cmd Msg)
update msg model =
  case msg of
    Roll ->
      (model, Random.generate NewFace (Random.int 1 6))

    NewFace newFace ->
      (Model newFace, Cmd.none)


-- VIEW
view : Model -> Html Msg
view model =
  div []
  [ h1 [] [ text (toString model.dieFace) ]
  , button [ onClick Roll ] [ text "Roll" ]
  ]

-- SUBSCRIPTIONS
subscriptions : Model -> Sub Msg
subscriptions model =
  Sub.none