module Containers.Counter exposing (..)

import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (onClick)

type alias Model =
  { count: Int
  }

initialModel: Model
initialModel =
  { count = 0
  }

type Msg
  = Increment

view: Model -> Html Msg
view model =
  div [][
    div [][text (toString model.count)]
    , button [onClick Increment] [text "Increment"]
  ]

update: Msg -> Model -> ( Model, Cmd Msg )
update msg model =
  case msg of
    Increment -> ( { model | count = model.count + 1 }, Cmd.none )