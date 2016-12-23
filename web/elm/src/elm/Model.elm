module Model exposing (..)
import Containers.Counter as Counter

-- MODEL
type alias Model =
  { counterModel : Counter.Model
  }

initial: Model
initial =
  { counterModel = Counter.initialModel
  }
