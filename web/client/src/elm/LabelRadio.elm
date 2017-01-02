port module LabelRadio exposing (main)
import Html exposing (Html, program, div, label, input, text, fieldset, section)
import Html.Attributes exposing (..)
import Html.Events exposing (onClick)
--import Json.Encode as Encode

main =
  program
    { init = init
    , update = update
    , subscriptions = subscriptions
    , view = view
    }


-- MODEL
type alias Model =
  { notifications : Bool
  , autoplay : Bool
  , location : Bool
  , fontSize : FontSize
  , content : String
  }

type FontSize = Small | Medium | Large

init : (Model, Cmd Msg)
init =
  (Model False False False Medium "Check out the font size changing", Cmd.none)


-- UPDATE
type Msg
  = ToggleNotifications
  | ToggleAutoplay
  | ToggleLocation
  | SwitchTo FontSize

update : Msg -> Model -> (Model, Cmd Msg)
update msg model =
  let newModel = case msg of
    ToggleNotifications ->
      {model| notifications = not model.notifications }

    ToggleAutoplay ->
      {model| autoplay = not model.autoplay }

    ToggleLocation ->
      {model| location = not model.location }

    SwitchTo newFontSize ->
      {model| fontSize = newFontSize }
  in
    (newModel, Cmd.none)


-- SUBSCRIPTIONS
subscriptions : Model -> Sub Msg
subscriptions model =
  Sub.none


-- VIEW
view: Model -> Html Msg
view model =
  div []
  [ viewPicker
    [ ("Small", SwitchTo Small)
    , ("Medium", SwitchTo Medium)
    , ("Large", SwitchTo Large)
    ]
  , section [ style [("font-size", renderFontSize model.fontSize)] ] [ text model.content ]
  ]

checkbox : msg -> String -> Html msg
checkbox msg name =
  label []
  [ input [ type_ "checkbox", onClick msg ] []
  , text name
  ]

viewPicker : List (String, msg) -> Html msg
viewPicker options =
  fieldset [] (List.map radio options)

radio : (String, msg) -> Html msg
radio (name, msg) =
  label []
  [ input [ type_ "radio", onClick msg, attribute "name" "grouped"] []
  , text name
  ]

renderFontSize : FontSize -> String
renderFontSize size =
  case size of
    Small -> "12pt"
    Medium -> "18pt"
    Large -> "24pt"