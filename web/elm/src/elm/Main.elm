import Html exposing (..)
--import Html.App exposing (map)
import Html.Attributes exposing (..)
import Html.Events exposing ( onClick )

 -- components
import Components.Navbar exposing ( navbar )

-- containers (self-contained apps)
import Containers.Counter as Counter

-- MODEL
import Model exposing (Model, initial)

init: ( Model, Cmd Msg )
init = ( Model.initial, Cmd.none )

-- UPDATE
type Msg
  = CounterMsg Counter.Msg

update: Msg -> Model -> (Model, Cmd Msg)
update message model =
  case message of
    CounterMsg msg ->
      let (updatedCounterModel, counterCmd) = Counter.update msg model.counterModel in
      -- Cmd.map does the same forwarding as Html.map, for commands
      ({model | counterModel = updatedCounterModel}, Cmd.map CounterMsg counterCmd)


-- VIEW
view : Model -> Html Msg
view model =
  div [ class "app-skin" ][
    navbar model
    , div [ class "container app-skin" ][
      Html.map CounterMsg (Counter.view model.counterModel)
    ]
  ]

-- SUBSCRIPTIONS
subscriptions : Model -> Sub Msg
subscriptions model =
  Sub.none

-- APP
main : Program Never Model Msg
main =
  program
    { init = init
    , view = view
    , update = update
    , subscriptions = subscriptions
    }
