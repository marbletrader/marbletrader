# Style Palette for MarbleTrader.club
{TextLayer} = require "TextLayer"

# https://coolors.co/2b2d42-a51c30-2a3d45-4b296b-3c153b
colors =
  white: "#ffffff"
  black: "#000000"
  lightGray: "rgba(230,230,230,1)"
  veil: "rgba(185,185,185,0.3)"
  darkPurple: "#3C153B"
  spanishViolet: "#4B296B"
  japaneseIndigo: "#2A3D45"
  vividBurgundy: "#A51C30"
  gunmetal: "#2B2D42"

# fonts imported from CDN in index.html
fonts =
  balooThambi: "'Baloo Thambi', cursive"
  mirza: "'Mirza', cursive"
  muli: "'Muli', sans-serif"

class HeaderText extends TextLayer
  constructor: (options={}) ->
    options.fontFamily ?= fonts.mirza
    options.color ?= colors.gunmetal
    options.fontSize ?= 110
    options.letterSpacing ?= -2
    options.textAlign ?= "center"
    super options

class SubHeaderText extends TextLayer
  constructor: (options={}) ->
    options.fontFamily ?= fonts.mirza
    options.color ?= colors.gunmetal
    options.fontSize ?= 50
    options.letterSpacing ?= -1
    options.textAlign ?= "left"
    super options

class BodyText extends TextLayer
  constructor: (options={}) ->
    options.backgroundColor ?= "transparent"
    options.fontFamily ?= fonts.muli
    options.fontSize ?= 28
    options.color ?= colors.gunmetal
    super options

exports.colors = colors
exports.fonts = fonts
exports.BodyText = BodyText
exports.HeaderText = HeaderText
exports.SubHeaderText = SubHeaderText