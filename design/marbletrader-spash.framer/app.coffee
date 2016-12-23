{TextLayer} = require "TextLayer"

# https://coolors.co/2b2d42-a51c30-2a3d45-4b296b-3c153b
colors =
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

padding =
	standard: 35
	divider: 80
	x: 100
	y: 100

sizes =
	widths:
		inPadding: Screen.width - (2 * padding.x)
	heights:
		inPadding: Screen.height - (2 * padding.y)
	
backdrop = new BackgroundLayer
	backgroundColor: colors.lightGray

navCase = new Layer
	parent: backdrop
	width: backdrop.width
	height: 80
	backgroundColor: colors.spanishViolet
	
titleCase = new Layer
	parent: backdrop
	backgroundColor: colors.veil
	x: Align.left(padding.divider)
	y: navCase.height + padding.standard
	width: sizes.widths.inPadding / 2
	height: 180

titleText = new TextLayer
	parent: titleCase
	y: padding.standard
	text: "Marble Trader"
	width: titleCase.width
	color: colors.gunmetal
	fontFamily: fonts.balooThambi
	textAlign: "center"
	fontSize: 80
	

heroCase = new Layer
	parent: backdrop
	backgroundColor: colors.veil
	x: padding.x
	y: Align.bottom(-padding.divider)
	width: sizes.widths.inPadding
	height: 200

# pillar :: Int -> Layer
pillar = (x) ->
	new Layer
		parent: heroCase
		backgroundColor: colors.veil
		x: x
		y: Align.bottom(-heroCase.height)
		width: 100
		height: sizes.heights.inPadding - heroCase.height - navCase.height


