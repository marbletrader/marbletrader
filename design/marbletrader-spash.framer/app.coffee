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

backdrop = new BackgroundLayer
	backgroundColor: colors.lightGray

navCase = new Layer
	parent: backdrop
	width: backdrop.width
	height: 80
	backgroundColor: colors.spanishViolet

padding =
	standard: 35
	divider: 80
	x: 100
	y: 100
	mPlat: navCase.height + 190
	marble: 50

sizes =
	widths:
		inPadding: Screen.width - (2 * padding.x)
	heights:
		inPadding: Screen.height - (2 * padding.y)

	
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
	return new Layer
		parent: heroCase
		backgroundColor: colors.veil
		x: x
		y: Align.bottom(-heroCase.height)
		width: 100
		height: sizes.heights.inPadding - heroCase.height - navCase.height

# marble :: Int -> Int -> Int -> String -> Layer
marble = (r,x,y, color) ->
	return new Layer
		name: "marble"+color
		parent: backdrop
		x: x,
		y: y,
		backgroundColor: color
		width: r,
		height: r,
		borderRadius: 2*r

# Marbles
# marbleSize = 50
# m0a = marble(marbleSize, Align.right(-100 + -marbleSize), padding.mPlat, colors.vividBurgundy) 
# m0b = marble(marbleSize, Align.right(-100 + -2.2*marbleSize), padding.mPlat, colors.vividBurgundy) 
# m0c = marble(marbleSize, Align.right(-100 + -3.4*marbleSize), padding.mPlat, colors.vividBurgundy) 
# m0d = marble(marbleSize, Align.right(-100 + -4.6*marbleSize), padding.mPlat, colors.vividBurgundy) 
# m0e = marble(marbleSize, Align.right(-100 + -5.8*marbleSize), padding.mPlat, colors.vividBurgundy)
# m1a = marble(marbleSize, Align.right(-100 + -1.6*marbleSize), padding.mPlat - 1.1*marbleSize, colors.japaneseIndigo)
# m1b = marble(marbleSize, Align.right(-100 + -2.8*marbleSize), padding.mPlat - 1.1*marbleSize, colors.japaneseIndigo)
# m1c = marble(marbleSize, Align.right(-100 + -4.0*marbleSize), padding.mPlat - 1.1*marbleSize, colors.japaneseIndigo)
# m1d = marble(marbleSize, Align.right(-100 + -5.2*marbleSize), padding.mPlat - 1.1*marbleSize, colors.japaneseIndigo)
# m2a = marble(marbleSize, Align.right(-100 + -2.2*marbleSize), padding.mPlat - 2.2*marbleSize, colors.spanishViolet)
# m2b = marble(marbleSize, Align.right(-100 + -3.4*marbleSize), padding.mPlat - 2.2*marbleSize, colors.spanishViolet)
# m2c = marble(marbleSize, Align.right(-100 + -4.6*marbleSize), padding.mPlat - 2.2*marbleSize, colors.spanishViolet)
# m3a = marble(marbleSize, Align.right(-100 + -2.8*marbleSize), padding.mPlat - 3.3*marbleSize, colors.darkPurple)
# m3b = marble(marbleSize, Align.right(-100 + -4.0*marbleSize), padding.mPlat - 3.3*marbleSize, colors.darkPurple)
# m4a = marble(marbleSize, Align.right(-100 + -3.4*marbleSize), padding.mPlat - 4.4*marbleSize, colors.spanishViolet)

marbleTower = (size, rightAlign) ->
  m0a = marble(size, Align.right(-rightAlign + -size), padding.mPlat, colors.vividBurgundy) 
  m0b = marble(size, Align.right(-rightAlign + -2.2*size), padding.mPlat, colors.vividBurgundy) 
  m0c = marble(size, Align.right(-rightAlign + -3.4*size), padding.mPlat, colors.vividBurgundy) 
  m0d = marble(size, Align.right(-rightAlign + -4.6*size), padding.mPlat, colors.vividBurgundy) 
  m0e = marble(size, Align.right(-rightAlign + -5.8*size), padding.mPlat, colors.vividBurgundy)
  m1a = marble(size, Align.right(-rightAlign + -1.6*size), padding.mPlat - 1.1*size, colors.japaneseIndigo)
  m1b = marble(size, Align.right(-rightAlign + -2.8*size), padding.mPlat - 1.1*size, colors.japaneseIndigo)
  m1c = marble(size, Align.right(-rightAlign + -4.0*size), padding.mPlat - 1.1*size, colors.japaneseIndigo)
  m1d = marble(size, Align.right(-rightAlign + -5.2*size), padding.mPlat - 1.1*size, colors.japaneseIndigo)
  m2a = marble(size, Align.right(-rightAlign + -2.2*size), padding.mPlat - 2.2*size, colors.spanishViolet)
  m2b = marble(size, Align.right(-rightAlign + -3.4*size), padding.mPlat - 2.2*size, colors.spanishViolet)
  m2c = marble(size, Align.right(-rightAlign + -4.6*size), padding.mPlat - 2.2*size, colors.spanishViolet)
  m3a = marble(size, Align.right(-rightAlign + -2.8*size), padding.mPlat - 3.3*size, colors.darkPurple)
  m3b = marble(size, Align.right(-rightAlign + -4.0*size), padding.mPlat - 3.3*size, colors.darkPurple)
  m4a = marble(size, Align.right(-rightAlign + -3.4*size), padding.mPlat - 4.4*size, colors.spanishViolet)

marbleTower(40, 700)
marbleTower(40, 400)
marbleTower(40, 100)



