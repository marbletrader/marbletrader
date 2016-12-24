require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"Palette":[function(require,module,exports){
var BodyText, HeaderText, SubHeaderText, TextLayer, colors, fonts,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

TextLayer = require("TextLayer").TextLayer;

colors = {
  white: "#ffffff",
  black: "#000000",
  lightGray: "rgba(230,230,230,1)",
  veil: "rgba(185,185,185,0.3)",
  darkPurple: "#3C153B",
  spanishViolet: "#4B296B",
  japaneseIndigo: "#2A3D45",
  vividBurgundy: "#A51C30",
  gunmetal: "#2B2D42"
};

fonts = {
  balooThambi: "'Baloo Thambi', cursive",
  mirza: "'Mirza', cursive",
  muli: "'Muli', sans-serif"
};

HeaderText = (function(superClass) {
  extend(HeaderText, superClass);

  function HeaderText(options) {
    if (options == null) {
      options = {};
    }
    if (options.fontFamily == null) {
      options.fontFamily = fonts.mirza;
    }
    if (options.color == null) {
      options.color = colors.gunmetal;
    }
    if (options.fontSize == null) {
      options.fontSize = 110;
    }
    if (options.letterSpacing == null) {
      options.letterSpacing = -2;
    }
    if (options.textAlign == null) {
      options.textAlign = "center";
    }
    HeaderText.__super__.constructor.call(this, options);
  }

  return HeaderText;

})(TextLayer);

SubHeaderText = (function(superClass) {
  extend(SubHeaderText, superClass);

  function SubHeaderText(options) {
    if (options == null) {
      options = {};
    }
    if (options.fontFamily == null) {
      options.fontFamily = fonts.mirza;
    }
    if (options.color == null) {
      options.color = colors.gunmetal;
    }
    if (options.fontSize == null) {
      options.fontSize = 50;
    }
    if (options.letterSpacing == null) {
      options.letterSpacing = -1;
    }
    if (options.textAlign == null) {
      options.textAlign = "left";
    }
    if (options.height == null) {
      options.height = 60;
    }
    SubHeaderText.__super__.constructor.call(this, options);
  }

  return SubHeaderText;

})(TextLayer);

BodyText = (function(superClass) {
  extend(BodyText, superClass);

  function BodyText(options) {
    if (options == null) {
      options = {};
    }
    if (options.backgroundColor == null) {
      options.backgroundColor = "transparent";
    }
    if (options.fontFamily == null) {
      options.fontFamily = fonts.muli;
    }
    if (options.fontSize == null) {
      options.fontSize = 28;
    }
    if (options.color == null) {
      options.color = colors.gunmetal;
    }
    BodyText.__super__.constructor.call(this, options);
  }

  return BodyText;

})(TextLayer);

exports.colors = colors;

exports.fonts = fonts;

exports.BodyText = BodyText;

exports.HeaderText = HeaderText;

exports.SubHeaderText = SubHeaderText;


},{"TextLayer":"TextLayer"}],"TextLayer":[function(require,module,exports){
var TextLayer, convertTextLayers, convertToTextLayer,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

TextLayer = (function(superClass) {
  extend(TextLayer, superClass);

  function TextLayer(options) {
    if (options == null) {
      options = {};
    }
    this.doAutoSize = false;
    this.doAutoSizeHeight = false;
    if (options.backgroundColor == null) {
      options.backgroundColor = options.setup ? "hsla(60, 90%, 47%, .4)" : "transparent";
    }
    if (options.color == null) {
      options.color = "red";
    }
    if (options.lineHeight == null) {
      options.lineHeight = 1.25;
    }
    if (options.fontFamily == null) {
      options.fontFamily = "Helvetica";
    }
    if (options.fontSize == null) {
      options.fontSize = 20;
    }
    if (options.text == null) {
      options.text = "Use layer.text to add text";
    }
    TextLayer.__super__.constructor.call(this, options);
    this.style.whiteSpace = "pre-line";
    this.style.outline = "none";
  }

  TextLayer.prototype.setStyle = function(property, value, pxSuffix) {
    if (pxSuffix == null) {
      pxSuffix = false;
    }
    this.style[property] = pxSuffix ? value + "px" : value;
    this.emit("change:" + property, value);
    if (this.doAutoSize) {
      return this.calcSize();
    }
  };

  TextLayer.prototype.calcSize = function() {
    var constraints, size, sizeAffectingStyles;
    sizeAffectingStyles = {
      lineHeight: this.style["line-height"],
      fontSize: this.style["font-size"],
      fontWeight: this.style["font-weight"],
      paddingTop: this.style["padding-top"],
      paddingRight: this.style["padding-right"],
      paddingBottom: this.style["padding-bottom"],
      paddingLeft: this.style["padding-left"],
      textTransform: this.style["text-transform"],
      borderWidth: this.style["border-width"],
      letterSpacing: this.style["letter-spacing"],
      fontFamily: this.style["font-family"],
      fontStyle: this.style["font-style"],
      fontVariant: this.style["font-variant"]
    };
    constraints = {};
    if (this.doAutoSizeHeight) {
      constraints.width = this.width;
    }
    size = Utils.textSize(this.text, sizeAffectingStyles, constraints);
    if (this.style.textAlign === "right") {
      this.width = size.width;
      this.x = this.x - this.width;
    } else {
      this.width = size.width;
    }
    return this.height = size.height;
  };

  TextLayer.define("autoSize", {
    get: function() {
      return this.doAutoSize;
    },
    set: function(value) {
      this.doAutoSize = value;
      if (this.doAutoSize) {
        return this.calcSize();
      }
    }
  });

  TextLayer.define("autoSizeHeight", {
    set: function(value) {
      this.doAutoSize = value;
      this.doAutoSizeHeight = value;
      if (this.doAutoSize) {
        return this.calcSize();
      }
    }
  });

  TextLayer.define("contentEditable", {
    set: function(boolean) {
      this._element.contentEditable = boolean;
      this.ignoreEvents = !boolean;
      return this.on("input", function() {
        if (this.doAutoSize) {
          return this.calcSize();
        }
      });
    }
  });

  TextLayer.define("text", {
    get: function() {
      return this._element.textContent;
    },
    set: function(value) {
      this._element.textContent = value;
      this.emit("change:text", value);
      if (this.doAutoSize) {
        return this.calcSize();
      }
    }
  });

  TextLayer.define("fontFamily", {
    get: function() {
      return this.style.fontFamily;
    },
    set: function(value) {
      return this.setStyle("fontFamily", value);
    }
  });

  TextLayer.define("fontSize", {
    get: function() {
      return this.style.fontSize.replace("px", "");
    },
    set: function(value) {
      return this.setStyle("fontSize", value, true);
    }
  });

  TextLayer.define("lineHeight", {
    get: function() {
      return this.style.lineHeight;
    },
    set: function(value) {
      return this.setStyle("lineHeight", value);
    }
  });

  TextLayer.define("fontWeight", {
    get: function() {
      return this.style.fontWeight;
    },
    set: function(value) {
      return this.setStyle("fontWeight", value);
    }
  });

  TextLayer.define("fontStyle", {
    get: function() {
      return this.style.fontStyle;
    },
    set: function(value) {
      return this.setStyle("fontStyle", value);
    }
  });

  TextLayer.define("fontVariant", {
    get: function() {
      return this.style.fontVariant;
    },
    set: function(value) {
      return this.setStyle("fontVariant", value);
    }
  });

  TextLayer.define("padding", {
    set: function(value) {
      this.setStyle("paddingTop", value, true);
      this.setStyle("paddingRight", value, true);
      this.setStyle("paddingBottom", value, true);
      return this.setStyle("paddingLeft", value, true);
    }
  });

  TextLayer.define("paddingTop", {
    get: function() {
      return this.style.paddingTop.replace("px", "");
    },
    set: function(value) {
      return this.setStyle("paddingTop", value, true);
    }
  });

  TextLayer.define("paddingRight", {
    get: function() {
      return this.style.paddingRight.replace("px", "");
    },
    set: function(value) {
      return this.setStyle("paddingRight", value, true);
    }
  });

  TextLayer.define("paddingBottom", {
    get: function() {
      return this.style.paddingBottom.replace("px", "");
    },
    set: function(value) {
      return this.setStyle("paddingBottom", value, true);
    }
  });

  TextLayer.define("paddingLeft", {
    get: function() {
      return this.style.paddingLeft.replace("px", "");
    },
    set: function(value) {
      return this.setStyle("paddingLeft", value, true);
    }
  });

  TextLayer.define("textAlign", {
    set: function(value) {
      return this.setStyle("textAlign", value);
    }
  });

  TextLayer.define("textTransform", {
    get: function() {
      return this.style.textTransform;
    },
    set: function(value) {
      return this.setStyle("textTransform", value);
    }
  });

  TextLayer.define("letterSpacing", {
    get: function() {
      return this.style.letterSpacing.replace("px", "");
    },
    set: function(value) {
      return this.setStyle("letterSpacing", value, true);
    }
  });

  TextLayer.define("length", {
    get: function() {
      return this.text.length;
    }
  });

  return TextLayer;

})(Layer);

convertToTextLayer = function(layer) {
  var css, cssObj, importPath, t;
  t = new TextLayer({
    name: layer.name,
    frame: layer.frame,
    parent: layer.parent
  });
  cssObj = {};
  css = layer._info.metadata.css;
  css.forEach(function(rule) {
    var arr;
    if (_.includes(rule, '/*')) {
      return;
    }
    arr = rule.split(': ');
    return cssObj[arr[0]] = arr[1].replace(';', '');
  });
  t.style = cssObj;
  importPath = layer.__framerImportedFromPath;
  if (_.includes(importPath, '@2x')) {
    t.fontSize *= 2;
    t.lineHeight = (parseInt(t.lineHeight) * 2) + 'px';
    t.letterSpacing *= 2;
  }
  t.y -= (parseInt(t.lineHeight) - t.fontSize) / 2;
  t.y -= t.fontSize * 0.1;
  t.x -= t.fontSize * 0.08;
  t.width += t.fontSize * 0.5;
  t.text = layer._info.metadata.string;
  layer.destroy();
  return t;
};

Layer.prototype.convertToTextLayer = function() {
  return convertToTextLayer(this);
};

convertTextLayers = function(obj) {
  var layer, prop, results;
  results = [];
  for (prop in obj) {
    layer = obj[prop];
    if (layer._info.kind === "text") {
      results.push(obj[prop] = convertToTextLayer(layer));
    } else {
      results.push(void 0);
    }
  }
  return results;
};

Layer.prototype.frameAsTextLayer = function(properties) {
  var t;
  t = new TextLayer;
  t.frame = this.frame;
  t.superLayer = this.superLayer;
  _.extend(t, properties);
  this.destroy();
  return t;
};

exports.TextLayer = TextLayer;

exports.convertTextLayers = convertTextLayers;


},{}]},{},[])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJhbWVyLm1vZHVsZXMuanMiLCJzb3VyY2VzIjpbIi4uL21vZHVsZXMvVGV4dExheWVyLmNvZmZlZSIsIi4uL21vZHVsZXMvUGFsZXR0ZS5jb2ZmZWUiLCJub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImNsYXNzIFRleHRMYXllciBleHRlbmRzIExheWVyXG4gICAgXG4gIGNvbnN0cnVjdG9yOiAob3B0aW9ucz17fSkgLT5cbiAgICBAZG9BdXRvU2l6ZSA9IGZhbHNlXG4gICAgQGRvQXV0b1NpemVIZWlnaHQgPSBmYWxzZVxuICAgIG9wdGlvbnMuYmFja2dyb3VuZENvbG9yID89IGlmIG9wdGlvbnMuc2V0dXAgdGhlbiBcImhzbGEoNjAsIDkwJSwgNDclLCAuNClcIiBlbHNlIFwidHJhbnNwYXJlbnRcIlxuICAgIG9wdGlvbnMuY29sb3IgPz0gXCJyZWRcIlxuICAgIG9wdGlvbnMubGluZUhlaWdodCA/PSAxLjI1XG4gICAgb3B0aW9ucy5mb250RmFtaWx5ID89IFwiSGVsdmV0aWNhXCJcbiAgICBvcHRpb25zLmZvbnRTaXplID89IDIwXG4gICAgb3B0aW9ucy50ZXh0ID89IFwiVXNlIGxheWVyLnRleHQgdG8gYWRkIHRleHRcIlxuICAgIHN1cGVyIG9wdGlvbnNcbiAgICBAc3R5bGUud2hpdGVTcGFjZSA9IFwicHJlLWxpbmVcIiAjIGFsbG93IFxcbiBpbiAudGV4dFxuICAgIEBzdHlsZS5vdXRsaW5lID0gXCJub25lXCIgIyBubyBib3JkZXIgd2hlbiBzZWxlY3RlZFxuICAgIFxuICBzZXRTdHlsZTogKHByb3BlcnR5LCB2YWx1ZSwgcHhTdWZmaXggPSBmYWxzZSkgLT5cbiAgICBAc3R5bGVbcHJvcGVydHldID0gaWYgcHhTdWZmaXggdGhlbiB2YWx1ZStcInB4XCIgZWxzZSB2YWx1ZVxuICAgIEBlbWl0KFwiY2hhbmdlOiN7cHJvcGVydHl9XCIsIHZhbHVlKVxuICAgIGlmIEBkb0F1dG9TaXplIHRoZW4gQGNhbGNTaXplKClcbiAgICBcbiAgY2FsY1NpemU6IC0+XG4gICAgc2l6ZUFmZmVjdGluZ1N0eWxlcyA9XG4gICAgICBsaW5lSGVpZ2h0OiBAc3R5bGVbXCJsaW5lLWhlaWdodFwiXVxuICAgICAgZm9udFNpemU6IEBzdHlsZVtcImZvbnQtc2l6ZVwiXVxuICAgICAgZm9udFdlaWdodDogQHN0eWxlW1wiZm9udC13ZWlnaHRcIl1cbiAgICAgIHBhZGRpbmdUb3A6IEBzdHlsZVtcInBhZGRpbmctdG9wXCJdXG4gICAgICBwYWRkaW5nUmlnaHQ6IEBzdHlsZVtcInBhZGRpbmctcmlnaHRcIl1cbiAgICAgIHBhZGRpbmdCb3R0b206IEBzdHlsZVtcInBhZGRpbmctYm90dG9tXCJdXG4gICAgICBwYWRkaW5nTGVmdDogQHN0eWxlW1wicGFkZGluZy1sZWZ0XCJdXG4gICAgICB0ZXh0VHJhbnNmb3JtOiBAc3R5bGVbXCJ0ZXh0LXRyYW5zZm9ybVwiXVxuICAgICAgYm9yZGVyV2lkdGg6IEBzdHlsZVtcImJvcmRlci13aWR0aFwiXVxuICAgICAgbGV0dGVyU3BhY2luZzogQHN0eWxlW1wibGV0dGVyLXNwYWNpbmdcIl1cbiAgICAgIGZvbnRGYW1pbHk6IEBzdHlsZVtcImZvbnQtZmFtaWx5XCJdXG4gICAgICBmb250U3R5bGU6IEBzdHlsZVtcImZvbnQtc3R5bGVcIl1cbiAgICAgIGZvbnRWYXJpYW50OiBAc3R5bGVbXCJmb250LXZhcmlhbnRcIl1cbiAgICBjb25zdHJhaW50cyA9IHt9XG4gICAgaWYgQGRvQXV0b1NpemVIZWlnaHQgdGhlbiBjb25zdHJhaW50cy53aWR0aCA9IEB3aWR0aFxuICAgIHNpemUgPSBVdGlscy50ZXh0U2l6ZSBAdGV4dCwgc2l6ZUFmZmVjdGluZ1N0eWxlcywgY29uc3RyYWludHNcbiAgICBpZiBAc3R5bGUudGV4dEFsaWduIGlzIFwicmlnaHRcIlxuICAgICAgQHdpZHRoID0gc2l6ZS53aWR0aFxuICAgICAgQHggPSBAeC1Ad2lkdGhcbiAgICBlbHNlXG4gICAgICBAd2lkdGggPSBzaXplLndpZHRoXG4gICAgQGhlaWdodCA9IHNpemUuaGVpZ2h0XG5cbiAgQGRlZmluZSBcImF1dG9TaXplXCIsXG4gICAgZ2V0OiAtPiBAZG9BdXRvU2l6ZVxuICAgIHNldDogKHZhbHVlKSAtPiBcbiAgICAgIEBkb0F1dG9TaXplID0gdmFsdWVcbiAgICAgIGlmIEBkb0F1dG9TaXplIHRoZW4gQGNhbGNTaXplKClcbiAgQGRlZmluZSBcImF1dG9TaXplSGVpZ2h0XCIsXG4gICAgc2V0OiAodmFsdWUpIC0+IFxuICAgICAgQGRvQXV0b1NpemUgPSB2YWx1ZVxuICAgICAgQGRvQXV0b1NpemVIZWlnaHQgPSB2YWx1ZVxuICAgICAgaWYgQGRvQXV0b1NpemUgdGhlbiBAY2FsY1NpemUoKVxuICBAZGVmaW5lIFwiY29udGVudEVkaXRhYmxlXCIsXG4gICAgc2V0OiAoYm9vbGVhbikgLT5cbiAgICAgIEBfZWxlbWVudC5jb250ZW50RWRpdGFibGUgPSBib29sZWFuXG4gICAgICBAaWdub3JlRXZlbnRzID0gIWJvb2xlYW5cbiAgICAgIEBvbiBcImlucHV0XCIsIC0+IEBjYWxjU2l6ZSgpIGlmIEBkb0F1dG9TaXplXG4gIEBkZWZpbmUgXCJ0ZXh0XCIsXG4gICAgZ2V0OiAtPiBAX2VsZW1lbnQudGV4dENvbnRlbnRcbiAgICBzZXQ6ICh2YWx1ZSkgLT5cbiAgICAgIEBfZWxlbWVudC50ZXh0Q29udGVudCA9IHZhbHVlXG4gICAgICBAZW1pdChcImNoYW5nZTp0ZXh0XCIsIHZhbHVlKVxuICAgICAgaWYgQGRvQXV0b1NpemUgdGhlbiBAY2FsY1NpemUoKVxuICBAZGVmaW5lIFwiZm9udEZhbWlseVwiLCBcbiAgICBnZXQ6IC0+IEBzdHlsZS5mb250RmFtaWx5XG4gICAgc2V0OiAodmFsdWUpIC0+IEBzZXRTdHlsZShcImZvbnRGYW1pbHlcIiwgdmFsdWUpXG4gIEBkZWZpbmUgXCJmb250U2l6ZVwiLCBcbiAgICBnZXQ6IC0+IEBzdHlsZS5mb250U2l6ZS5yZXBsYWNlKFwicHhcIixcIlwiKVxuICAgIHNldDogKHZhbHVlKSAtPiBAc2V0U3R5bGUoXCJmb250U2l6ZVwiLCB2YWx1ZSwgdHJ1ZSlcbiAgQGRlZmluZSBcImxpbmVIZWlnaHRcIiwgXG4gICAgZ2V0OiAtPiBAc3R5bGUubGluZUhlaWdodCBcbiAgICBzZXQ6ICh2YWx1ZSkgLT4gQHNldFN0eWxlKFwibGluZUhlaWdodFwiLCB2YWx1ZSlcbiAgQGRlZmluZSBcImZvbnRXZWlnaHRcIiwgXG4gICAgZ2V0OiAtPiBAc3R5bGUuZm9udFdlaWdodCBcbiAgICBzZXQ6ICh2YWx1ZSkgLT4gQHNldFN0eWxlKFwiZm9udFdlaWdodFwiLCB2YWx1ZSlcbiAgQGRlZmluZSBcImZvbnRTdHlsZVwiLCBcbiAgICBnZXQ6IC0+IEBzdHlsZS5mb250U3R5bGVcbiAgICBzZXQ6ICh2YWx1ZSkgLT4gQHNldFN0eWxlKFwiZm9udFN0eWxlXCIsIHZhbHVlKVxuICBAZGVmaW5lIFwiZm9udFZhcmlhbnRcIiwgXG4gICAgZ2V0OiAtPiBAc3R5bGUuZm9udFZhcmlhbnRcbiAgICBzZXQ6ICh2YWx1ZSkgLT4gQHNldFN0eWxlKFwiZm9udFZhcmlhbnRcIiwgdmFsdWUpXG4gIEBkZWZpbmUgXCJwYWRkaW5nXCIsXG4gICAgc2V0OiAodmFsdWUpIC0+IFxuICAgICAgQHNldFN0eWxlKFwicGFkZGluZ1RvcFwiLCB2YWx1ZSwgdHJ1ZSlcbiAgICAgIEBzZXRTdHlsZShcInBhZGRpbmdSaWdodFwiLCB2YWx1ZSwgdHJ1ZSlcbiAgICAgIEBzZXRTdHlsZShcInBhZGRpbmdCb3R0b21cIiwgdmFsdWUsIHRydWUpXG4gICAgICBAc2V0U3R5bGUoXCJwYWRkaW5nTGVmdFwiLCB2YWx1ZSwgdHJ1ZSlcbiAgQGRlZmluZSBcInBhZGRpbmdUb3BcIiwgXG4gICAgZ2V0OiAtPiBAc3R5bGUucGFkZGluZ1RvcC5yZXBsYWNlKFwicHhcIixcIlwiKVxuICAgIHNldDogKHZhbHVlKSAtPiBAc2V0U3R5bGUoXCJwYWRkaW5nVG9wXCIsIHZhbHVlLCB0cnVlKVxuICBAZGVmaW5lIFwicGFkZGluZ1JpZ2h0XCIsIFxuICAgIGdldDogLT4gQHN0eWxlLnBhZGRpbmdSaWdodC5yZXBsYWNlKFwicHhcIixcIlwiKVxuICAgIHNldDogKHZhbHVlKSAtPiBAc2V0U3R5bGUoXCJwYWRkaW5nUmlnaHRcIiwgdmFsdWUsIHRydWUpXG4gIEBkZWZpbmUgXCJwYWRkaW5nQm90dG9tXCIsIFxuICAgIGdldDogLT4gQHN0eWxlLnBhZGRpbmdCb3R0b20ucmVwbGFjZShcInB4XCIsXCJcIilcbiAgICBzZXQ6ICh2YWx1ZSkgLT4gQHNldFN0eWxlKFwicGFkZGluZ0JvdHRvbVwiLCB2YWx1ZSwgdHJ1ZSlcbiAgQGRlZmluZSBcInBhZGRpbmdMZWZ0XCIsXG4gICAgZ2V0OiAtPiBAc3R5bGUucGFkZGluZ0xlZnQucmVwbGFjZShcInB4XCIsXCJcIilcbiAgICBzZXQ6ICh2YWx1ZSkgLT4gQHNldFN0eWxlKFwicGFkZGluZ0xlZnRcIiwgdmFsdWUsIHRydWUpXG4gIEBkZWZpbmUgXCJ0ZXh0QWxpZ25cIixcbiAgICBzZXQ6ICh2YWx1ZSkgLT4gQHNldFN0eWxlKFwidGV4dEFsaWduXCIsIHZhbHVlKVxuICBAZGVmaW5lIFwidGV4dFRyYW5zZm9ybVwiLCBcbiAgICBnZXQ6IC0+IEBzdHlsZS50ZXh0VHJhbnNmb3JtIFxuICAgIHNldDogKHZhbHVlKSAtPiBAc2V0U3R5bGUoXCJ0ZXh0VHJhbnNmb3JtXCIsIHZhbHVlKVxuICBAZGVmaW5lIFwibGV0dGVyU3BhY2luZ1wiLCBcbiAgICBnZXQ6IC0+IEBzdHlsZS5sZXR0ZXJTcGFjaW5nLnJlcGxhY2UoXCJweFwiLFwiXCIpXG4gICAgc2V0OiAodmFsdWUpIC0+IEBzZXRTdHlsZShcImxldHRlclNwYWNpbmdcIiwgdmFsdWUsIHRydWUpXG4gIEBkZWZpbmUgXCJsZW5ndGhcIiwgXG4gICAgZ2V0OiAtPiBAdGV4dC5sZW5ndGhcblxuY29udmVydFRvVGV4dExheWVyID0gKGxheWVyKSAtPlxuICB0ID0gbmV3IFRleHRMYXllclxuICAgIG5hbWU6IGxheWVyLm5hbWVcbiAgICBmcmFtZTogbGF5ZXIuZnJhbWVcbiAgICBwYXJlbnQ6IGxheWVyLnBhcmVudFxuICBcbiAgY3NzT2JqID0ge31cbiAgY3NzID0gbGF5ZXIuX2luZm8ubWV0YWRhdGEuY3NzXG4gIGNzcy5mb3JFYWNoIChydWxlKSAtPlxuICAgIHJldHVybiBpZiBfLmluY2x1ZGVzIHJ1bGUsICcvKidcbiAgICBhcnIgPSBydWxlLnNwbGl0KCc6ICcpXG4gICAgY3NzT2JqW2FyclswXV0gPSBhcnJbMV0ucmVwbGFjZSgnOycsJycpXG4gIHQuc3R5bGUgPSBjc3NPYmpcbiAgXG4gIGltcG9ydFBhdGggPSBsYXllci5fX2ZyYW1lckltcG9ydGVkRnJvbVBhdGhcbiAgaWYgXy5pbmNsdWRlcyBpbXBvcnRQYXRoLCAnQDJ4J1xuICAgIHQuZm9udFNpemUgKj0gMlxuICAgIHQubGluZUhlaWdodCA9IChwYXJzZUludCh0LmxpbmVIZWlnaHQpKjIpKydweCdcbiAgICB0LmxldHRlclNwYWNpbmcgKj0gMlxuICAgICAgICAgIFxuICB0LnkgLT0gKHBhcnNlSW50KHQubGluZUhlaWdodCktdC5mb250U2l6ZSkvMiAjIGNvbXBlbnNhdGUgZm9yIGhvdyBDU1MgaGFuZGxlcyBsaW5lIGhlaWdodFxuICB0LnkgLT0gdC5mb250U2l6ZSAqIDAuMSAjIHNrZXRjaCBwYWRkaW5nXG4gIHQueCAtPSB0LmZvbnRTaXplICogMC4wOCAjIHNrZXRjaCBwYWRkaW5nXG4gIHQud2lkdGggKz0gdC5mb250U2l6ZSAqIDAuNSAjIHNrZXRjaCBwYWRkaW5nXG5cbiAgdC50ZXh0ID0gbGF5ZXIuX2luZm8ubWV0YWRhdGEuc3RyaW5nXG4gIGxheWVyLmRlc3Ryb3koKVxuICByZXR1cm4gdFxuXG5MYXllcjo6Y29udmVydFRvVGV4dExheWVyID0gLT4gY29udmVydFRvVGV4dExheWVyKEApXG5cbmNvbnZlcnRUZXh0TGF5ZXJzID0gKG9iaikgLT5cbiAgZm9yIHByb3AsbGF5ZXIgb2Ygb2JqXG4gICAgaWYgbGF5ZXIuX2luZm8ua2luZCBpcyBcInRleHRcIlxuICAgICAgb2JqW3Byb3BdID0gY29udmVydFRvVGV4dExheWVyKGxheWVyKVxuXG4jIEJhY2t3YXJkcyBjb21wYWJpbGl0eS4gUmVwbGFjZWQgYnkgY29udmVydFRvVGV4dExheWVyKClcbkxheWVyOjpmcmFtZUFzVGV4dExheWVyID0gKHByb3BlcnRpZXMpIC0+XG4gICAgdCA9IG5ldyBUZXh0TGF5ZXJcbiAgICB0LmZyYW1lID0gQGZyYW1lXG4gICAgdC5zdXBlckxheWVyID0gQHN1cGVyTGF5ZXJcbiAgICBfLmV4dGVuZCB0LHByb3BlcnRpZXNcbiAgICBAZGVzdHJveSgpXG4gICAgdFxuXG5leHBvcnRzLlRleHRMYXllciA9IFRleHRMYXllclxuZXhwb3J0cy5jb252ZXJ0VGV4dExheWVycyA9IGNvbnZlcnRUZXh0TGF5ZXJzIiwiIyBTdHlsZSBQYWxldHRlIGZvciBNYXJibGVUcmFkZXIuY2x1Ylxue1RleHRMYXllcn0gPSByZXF1aXJlIFwiVGV4dExheWVyXCJcblxuIyBodHRwczovL2Nvb2xvcnMuY28vMmIyZDQyLWE1MWMzMC0yYTNkNDUtNGIyOTZiLTNjMTUzYlxuY29sb3JzID1cbiAgd2hpdGU6IFwiI2ZmZmZmZlwiXG4gIGJsYWNrOiBcIiMwMDAwMDBcIlxuICBsaWdodEdyYXk6IFwicmdiYSgyMzAsMjMwLDIzMCwxKVwiXG4gIHZlaWw6IFwicmdiYSgxODUsMTg1LDE4NSwwLjMpXCJcbiAgZGFya1B1cnBsZTogXCIjM0MxNTNCXCJcbiAgc3BhbmlzaFZpb2xldDogXCIjNEIyOTZCXCJcbiAgamFwYW5lc2VJbmRpZ286IFwiIzJBM0Q0NVwiXG4gIHZpdmlkQnVyZ3VuZHk6IFwiI0E1MUMzMFwiXG4gIGd1bm1ldGFsOiBcIiMyQjJENDJcIlxuXG4jIGZvbnRzIGltcG9ydGVkIGZyb20gQ0ROIGluIGluZGV4Lmh0bWxcbmZvbnRzID1cbiAgYmFsb29UaGFtYmk6IFwiJ0JhbG9vIFRoYW1iaScsIGN1cnNpdmVcIlxuICBtaXJ6YTogXCInTWlyemEnLCBjdXJzaXZlXCJcbiAgbXVsaTogXCInTXVsaScsIHNhbnMtc2VyaWZcIlxuXG5jbGFzcyBIZWFkZXJUZXh0IGV4dGVuZHMgVGV4dExheWVyXG4gIGNvbnN0cnVjdG9yOiAob3B0aW9ucz17fSkgLT5cbiAgICBvcHRpb25zLmZvbnRGYW1pbHkgPz0gZm9udHMubWlyemFcbiAgICBvcHRpb25zLmNvbG9yID89IGNvbG9ycy5ndW5tZXRhbFxuICAgIG9wdGlvbnMuZm9udFNpemUgPz0gMTEwXG4gICAgb3B0aW9ucy5sZXR0ZXJTcGFjaW5nID89IC0yXG4gICAgb3B0aW9ucy50ZXh0QWxpZ24gPz0gXCJjZW50ZXJcIlxuICAgIHN1cGVyIG9wdGlvbnNcblxuY2xhc3MgU3ViSGVhZGVyVGV4dCBleHRlbmRzIFRleHRMYXllclxuICBjb25zdHJ1Y3RvcjogKG9wdGlvbnM9e30pIC0+XG4gICAgb3B0aW9ucy5mb250RmFtaWx5ID89IGZvbnRzLm1pcnphXG4gICAgb3B0aW9ucy5jb2xvciA/PSBjb2xvcnMuZ3VubWV0YWxcbiAgICBvcHRpb25zLmZvbnRTaXplID89IDUwXG4gICAgb3B0aW9ucy5sZXR0ZXJTcGFjaW5nID89IC0xXG4gICAgb3B0aW9ucy50ZXh0QWxpZ24gPz0gXCJsZWZ0XCJcbiAgICBvcHRpb25zLmhlaWdodCA/PSA2MFxuICAgIHN1cGVyIG9wdGlvbnNcblxuY2xhc3MgQm9keVRleHQgZXh0ZW5kcyBUZXh0TGF5ZXJcbiAgY29uc3RydWN0b3I6IChvcHRpb25zPXt9KSAtPlxuICAgIG9wdGlvbnMuYmFja2dyb3VuZENvbG9yID89IFwidHJhbnNwYXJlbnRcIlxuICAgIG9wdGlvbnMuZm9udEZhbWlseSA/PSBmb250cy5tdWxpXG4gICAgb3B0aW9ucy5mb250U2l6ZSA/PSAyOFxuICAgIG9wdGlvbnMuY29sb3IgPz0gY29sb3JzLmd1bm1ldGFsXG4gICAgc3VwZXIgb3B0aW9uc1xuXG5leHBvcnRzLmNvbG9ycyA9IGNvbG9yc1xuZXhwb3J0cy5mb250cyA9IGZvbnRzXG5leHBvcnRzLkJvZHlUZXh0ID0gQm9keVRleHRcbmV4cG9ydHMuSGVhZGVyVGV4dCA9IEhlYWRlclRleHRcbmV4cG9ydHMuU3ViSGVhZGVyVGV4dCA9IFN1YkhlYWRlclRleHQiLCIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUVBQTtBRENBLElBQUEsNkRBQUE7RUFBQTs7O0FBQUMsWUFBYSxPQUFBLENBQVEsV0FBUixFQUFiOztBQUdELE1BQUEsR0FDRTtFQUFBLEtBQUEsRUFBTyxTQUFQO0VBQ0EsS0FBQSxFQUFPLFNBRFA7RUFFQSxTQUFBLEVBQVcscUJBRlg7RUFHQSxJQUFBLEVBQU0sdUJBSE47RUFJQSxVQUFBLEVBQVksU0FKWjtFQUtBLGFBQUEsRUFBZSxTQUxmO0VBTUEsY0FBQSxFQUFnQixTQU5oQjtFQU9BLGFBQUEsRUFBZSxTQVBmO0VBUUEsUUFBQSxFQUFVLFNBUlY7OztBQVdGLEtBQUEsR0FDRTtFQUFBLFdBQUEsRUFBYSx5QkFBYjtFQUNBLEtBQUEsRUFBTyxrQkFEUDtFQUVBLElBQUEsRUFBTSxvQkFGTjs7O0FBSUk7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
