# Setup (Constants, backdrop, nav)
# {TextLayer} = require "TextLayer"
{colors, fonts, HeaderText, SubHeaderText, BodyText} = require "Palette"

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

	
# titleCase = new Layer
# 	parent: backdrop
# 	backgroundColor: colors.veil
# 	x: Align.left(padding.divider)
# 	y: navCase.height + padding.standard
# 	width: sizes.widths.inPadding / 2
# 	height: 120
# 
# titleText = new TextLayer
# 	parent: titleCase
# 	y: 10
# 	text: "Marble Trader"
# 	width: titleCase.width
# 	color: colors.gunmetal
# 	fontFamily: fonts.balooThambi
# 	textAlign: "center"
# 	fontSize: 80
	
watercolour = new Layer
	width: Screen.width
	height: Screen.height - navCase.height
	y: navCase.height
	image: "images/canicas.jpg"
	opacity: 0.05

# heroCase = new Layer
# 	parent: backdrop
# 	backgroundColor: colors.veil
# 	x: padding.x
# 	y: Align.top(navCase.height + padding.divider/2)
# 	width: sizes.widths.inPadding
# 	height: 50
# 
# heroHighlight = new Layer
# 	parent: heroCase
# 	y: heroCase.height
# 	width: heroCase.width
# 	height: 5
# 	backgroundColor: colors.spanishViolet

title = new HeaderText
	text: "Marble Trader"
	parent: navCase
	x: padding.x
	y: Align.top(navCase.height + padding.divider/2)
	width: sizes.widths.inPadding

# bodyTopBorder = new Layer
# 	parent: title
# 	y: title.height - 70
# 	width: title.width
# 	height: 5
# 	backgroundColor: colors.spanishViolet

# bodySkin = new Layer
# 	parent: bodyTopBorder
# 	width: bodyTopBorder.width
# 	backgroundColor: colors.veil
# 	height: Screen.height
	
descriptionTitle = new SubHeaderText
	text: "The Dream"
	parent: backdrop
	width: title.width / (3/2)
	height: 60
	x: padding.divider + (padding.x/2)
	y: navCase.height+title.height
descriptionSkin = new Layer
	parent: descriptionTitle
	x: -(padding.x/2)
	y: descriptionTitle.height
	height: 220
	width: descriptionTitle.width
	borderRadius: 20
	backgroundColor: colors.veil

startTradingSkin = new Layer
	parent: backdrop
	x: Align.right(-padding.divider)
	y: navCase.height+title.height
	height: 500
	width: title.width / 3
	borderRadius: 20
	backgroundColor: colors.veil

descriptionText = new BodyText
	parent: descriptionSkin
	text: "Bringing the nostalgic continuity of marbles and their trading to the web. \n\n In 2016, it was common belief that a software should limit itself to solving one problem in the world.\nMarbleTrader ushers in a new era of holistic applications, that solve not just one, but all problems. "
	x: padding.standard
	y: padding.standard
	width: title.width - (2*padding.standard)
	
# pillar :: Int -> Layer
pillar = (x) ->
	return new Layer
		parent: heroCase
		backgroundColor: colors.veil
		x: x
		y: Align.bottom(-heroCase.height)
		width: 100
		height: sizes.heights.inPadding - heroCase.height - navCase.height

# Marbles
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

# marbleTower :: Int -> Int -> Null
# side effects, generate on canvas.
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

# marbleTower(40, 700)
# marbleTower(40, 400)
# marbleTower(40, 100)



