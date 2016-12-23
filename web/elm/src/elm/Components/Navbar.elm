module Components.Navbar exposing (..)

import Html exposing (..)
import Html.Attributes exposing (..)
import Model exposing (..)

navbar: Model -> Html a
navbar model =
  div [class "v1-header"][
    text "Welcome to Marble Trader"
  ]