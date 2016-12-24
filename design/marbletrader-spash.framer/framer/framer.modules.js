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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJhbWVyLm1vZHVsZXMuanMiLCJzb3VyY2VzIjpbIi4uL21vZHVsZXMvVGV4dExheWVyLmNvZmZlZSIsIi4uL21vZHVsZXMvUGFsZXR0ZS5jb2ZmZWUiLCJub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImNsYXNzIFRleHRMYXllciBleHRlbmRzIExheWVyXG4gICAgXG4gIGNvbnN0cnVjdG9yOiAob3B0aW9ucz17fSkgLT5cbiAgICBAZG9BdXRvU2l6ZSA9IGZhbHNlXG4gICAgQGRvQXV0b1NpemVIZWlnaHQgPSBmYWxzZVxuICAgIG9wdGlvbnMuYmFja2dyb3VuZENvbG9yID89IGlmIG9wdGlvbnMuc2V0dXAgdGhlbiBcImhzbGEoNjAsIDkwJSwgNDclLCAuNClcIiBlbHNlIFwidHJhbnNwYXJlbnRcIlxuICAgIG9wdGlvbnMuY29sb3IgPz0gXCJyZWRcIlxuICAgIG9wdGlvbnMubGluZUhlaWdodCA/PSAxLjI1XG4gICAgb3B0aW9ucy5mb250RmFtaWx5ID89IFwiSGVsdmV0aWNhXCJcbiAgICBvcHRpb25zLmZvbnRTaXplID89IDIwXG4gICAgb3B0aW9ucy50ZXh0ID89IFwiVXNlIGxheWVyLnRleHQgdG8gYWRkIHRleHRcIlxuICAgIHN1cGVyIG9wdGlvbnNcbiAgICBAc3R5bGUud2hpdGVTcGFjZSA9IFwicHJlLWxpbmVcIiAjIGFsbG93IFxcbiBpbiAudGV4dFxuICAgIEBzdHlsZS5vdXRsaW5lID0gXCJub25lXCIgIyBubyBib3JkZXIgd2hlbiBzZWxlY3RlZFxuICAgIFxuICBzZXRTdHlsZTogKHByb3BlcnR5LCB2YWx1ZSwgcHhTdWZmaXggPSBmYWxzZSkgLT5cbiAgICBAc3R5bGVbcHJvcGVydHldID0gaWYgcHhTdWZmaXggdGhlbiB2YWx1ZStcInB4XCIgZWxzZSB2YWx1ZVxuICAgIEBlbWl0KFwiY2hhbmdlOiN7cHJvcGVydHl9XCIsIHZhbHVlKVxuICAgIGlmIEBkb0F1dG9TaXplIHRoZW4gQGNhbGNTaXplKClcbiAgICBcbiAgY2FsY1NpemU6IC0+XG4gICAgc2l6ZUFmZmVjdGluZ1N0eWxlcyA9XG4gICAgICBsaW5lSGVpZ2h0OiBAc3R5bGVbXCJsaW5lLWhlaWdodFwiXVxuICAgICAgZm9udFNpemU6IEBzdHlsZVtcImZvbnQtc2l6ZVwiXVxuICAgICAgZm9udFdlaWdodDogQHN0eWxlW1wiZm9udC13ZWlnaHRcIl1cbiAgICAgIHBhZGRpbmdUb3A6IEBzdHlsZVtcInBhZGRpbmctdG9wXCJdXG4gICAgICBwYWRkaW5nUmlnaHQ6IEBzdHlsZVtcInBhZGRpbmctcmlnaHRcIl1cbiAgICAgIHBhZGRpbmdCb3R0b206IEBzdHlsZVtcInBhZGRpbmctYm90dG9tXCJdXG4gICAgICBwYWRkaW5nTGVmdDogQHN0eWxlW1wicGFkZGluZy1sZWZ0XCJdXG4gICAgICB0ZXh0VHJhbnNmb3JtOiBAc3R5bGVbXCJ0ZXh0LXRyYW5zZm9ybVwiXVxuICAgICAgYm9yZGVyV2lkdGg6IEBzdHlsZVtcImJvcmRlci13aWR0aFwiXVxuICAgICAgbGV0dGVyU3BhY2luZzogQHN0eWxlW1wibGV0dGVyLXNwYWNpbmdcIl1cbiAgICAgIGZvbnRGYW1pbHk6IEBzdHlsZVtcImZvbnQtZmFtaWx5XCJdXG4gICAgICBmb250U3R5bGU6IEBzdHlsZVtcImZvbnQtc3R5bGVcIl1cbiAgICAgIGZvbnRWYXJpYW50OiBAc3R5bGVbXCJmb250LXZhcmlhbnRcIl1cbiAgICBjb25zdHJhaW50cyA9IHt9XG4gICAgaWYgQGRvQXV0b1NpemVIZWlnaHQgdGhlbiBjb25zdHJhaW50cy53aWR0aCA9IEB3aWR0aFxuICAgIHNpemUgPSBVdGlscy50ZXh0U2l6ZSBAdGV4dCwgc2l6ZUFmZmVjdGluZ1N0eWxlcywgY29uc3RyYWludHNcbiAgICBpZiBAc3R5bGUudGV4dEFsaWduIGlzIFwicmlnaHRcIlxuICAgICAgQHdpZHRoID0gc2l6ZS53aWR0aFxuICAgICAgQHggPSBAeC1Ad2lkdGhcbiAgICBlbHNlXG4gICAgICBAd2lkdGggPSBzaXplLndpZHRoXG4gICAgQGhlaWdodCA9IHNpemUuaGVpZ2h0XG5cbiAgQGRlZmluZSBcImF1dG9TaXplXCIsXG4gICAgZ2V0OiAtPiBAZG9BdXRvU2l6ZVxuICAgIHNldDogKHZhbHVlKSAtPiBcbiAgICAgIEBkb0F1dG9TaXplID0gdmFsdWVcbiAgICAgIGlmIEBkb0F1dG9TaXplIHRoZW4gQGNhbGNTaXplKClcbiAgQGRlZmluZSBcImF1dG9TaXplSGVpZ2h0XCIsXG4gICAgc2V0OiAodmFsdWUpIC0+IFxuICAgICAgQGRvQXV0b1NpemUgPSB2YWx1ZVxuICAgICAgQGRvQXV0b1NpemVIZWlnaHQgPSB2YWx1ZVxuICAgICAgaWYgQGRvQXV0b1NpemUgdGhlbiBAY2FsY1NpemUoKVxuICBAZGVmaW5lIFwiY29udGVudEVkaXRhYmxlXCIsXG4gICAgc2V0OiAoYm9vbGVhbikgLT5cbiAgICAgIEBfZWxlbWVudC5jb250ZW50RWRpdGFibGUgPSBib29sZWFuXG4gICAgICBAaWdub3JlRXZlbnRzID0gIWJvb2xlYW5cbiAgICAgIEBvbiBcImlucHV0XCIsIC0+IEBjYWxjU2l6ZSgpIGlmIEBkb0F1dG9TaXplXG4gIEBkZWZpbmUgXCJ0ZXh0XCIsXG4gICAgZ2V0OiAtPiBAX2VsZW1lbnQudGV4dENvbnRlbnRcbiAgICBzZXQ6ICh2YWx1ZSkgLT5cbiAgICAgIEBfZWxlbWVudC50ZXh0Q29udGVudCA9IHZhbHVlXG4gICAgICBAZW1pdChcImNoYW5nZTp0ZXh0XCIsIHZhbHVlKVxuICAgICAgaWYgQGRvQXV0b1NpemUgdGhlbiBAY2FsY1NpemUoKVxuICBAZGVmaW5lIFwiZm9udEZhbWlseVwiLCBcbiAgICBnZXQ6IC0+IEBzdHlsZS5mb250RmFtaWx5XG4gICAgc2V0OiAodmFsdWUpIC0+IEBzZXRTdHlsZShcImZvbnRGYW1pbHlcIiwgdmFsdWUpXG4gIEBkZWZpbmUgXCJmb250U2l6ZVwiLCBcbiAgICBnZXQ6IC0+IEBzdHlsZS5mb250U2l6ZS5yZXBsYWNlKFwicHhcIixcIlwiKVxuICAgIHNldDogKHZhbHVlKSAtPiBAc2V0U3R5bGUoXCJmb250U2l6ZVwiLCB2YWx1ZSwgdHJ1ZSlcbiAgQGRlZmluZSBcImxpbmVIZWlnaHRcIiwgXG4gICAgZ2V0OiAtPiBAc3R5bGUubGluZUhlaWdodCBcbiAgICBzZXQ6ICh2YWx1ZSkgLT4gQHNldFN0eWxlKFwibGluZUhlaWdodFwiLCB2YWx1ZSlcbiAgQGRlZmluZSBcImZvbnRXZWlnaHRcIiwgXG4gICAgZ2V0OiAtPiBAc3R5bGUuZm9udFdlaWdodCBcbiAgICBzZXQ6ICh2YWx1ZSkgLT4gQHNldFN0eWxlKFwiZm9udFdlaWdodFwiLCB2YWx1ZSlcbiAgQGRlZmluZSBcImZvbnRTdHlsZVwiLCBcbiAgICBnZXQ6IC0+IEBzdHlsZS5mb250U3R5bGVcbiAgICBzZXQ6ICh2YWx1ZSkgLT4gQHNldFN0eWxlKFwiZm9udFN0eWxlXCIsIHZhbHVlKVxuICBAZGVmaW5lIFwiZm9udFZhcmlhbnRcIiwgXG4gICAgZ2V0OiAtPiBAc3R5bGUuZm9udFZhcmlhbnRcbiAgICBzZXQ6ICh2YWx1ZSkgLT4gQHNldFN0eWxlKFwiZm9udFZhcmlhbnRcIiwgdmFsdWUpXG4gIEBkZWZpbmUgXCJwYWRkaW5nXCIsXG4gICAgc2V0OiAodmFsdWUpIC0+IFxuICAgICAgQHNldFN0eWxlKFwicGFkZGluZ1RvcFwiLCB2YWx1ZSwgdHJ1ZSlcbiAgICAgIEBzZXRTdHlsZShcInBhZGRpbmdSaWdodFwiLCB2YWx1ZSwgdHJ1ZSlcbiAgICAgIEBzZXRTdHlsZShcInBhZGRpbmdCb3R0b21cIiwgdmFsdWUsIHRydWUpXG4gICAgICBAc2V0U3R5bGUoXCJwYWRkaW5nTGVmdFwiLCB2YWx1ZSwgdHJ1ZSlcbiAgQGRlZmluZSBcInBhZGRpbmdUb3BcIiwgXG4gICAgZ2V0OiAtPiBAc3R5bGUucGFkZGluZ1RvcC5yZXBsYWNlKFwicHhcIixcIlwiKVxuICAgIHNldDogKHZhbHVlKSAtPiBAc2V0U3R5bGUoXCJwYWRkaW5nVG9wXCIsIHZhbHVlLCB0cnVlKVxuICBAZGVmaW5lIFwicGFkZGluZ1JpZ2h0XCIsIFxuICAgIGdldDogLT4gQHN0eWxlLnBhZGRpbmdSaWdodC5yZXBsYWNlKFwicHhcIixcIlwiKVxuICAgIHNldDogKHZhbHVlKSAtPiBAc2V0U3R5bGUoXCJwYWRkaW5nUmlnaHRcIiwgdmFsdWUsIHRydWUpXG4gIEBkZWZpbmUgXCJwYWRkaW5nQm90dG9tXCIsIFxuICAgIGdldDogLT4gQHN0eWxlLnBhZGRpbmdCb3R0b20ucmVwbGFjZShcInB4XCIsXCJcIilcbiAgICBzZXQ6ICh2YWx1ZSkgLT4gQHNldFN0eWxlKFwicGFkZGluZ0JvdHRvbVwiLCB2YWx1ZSwgdHJ1ZSlcbiAgQGRlZmluZSBcInBhZGRpbmdMZWZ0XCIsXG4gICAgZ2V0OiAtPiBAc3R5bGUucGFkZGluZ0xlZnQucmVwbGFjZShcInB4XCIsXCJcIilcbiAgICBzZXQ6ICh2YWx1ZSkgLT4gQHNldFN0eWxlKFwicGFkZGluZ0xlZnRcIiwgdmFsdWUsIHRydWUpXG4gIEBkZWZpbmUgXCJ0ZXh0QWxpZ25cIixcbiAgICBzZXQ6ICh2YWx1ZSkgLT4gQHNldFN0eWxlKFwidGV4dEFsaWduXCIsIHZhbHVlKVxuICBAZGVmaW5lIFwidGV4dFRyYW5zZm9ybVwiLCBcbiAgICBnZXQ6IC0+IEBzdHlsZS50ZXh0VHJhbnNmb3JtIFxuICAgIHNldDogKHZhbHVlKSAtPiBAc2V0U3R5bGUoXCJ0ZXh0VHJhbnNmb3JtXCIsIHZhbHVlKVxuICBAZGVmaW5lIFwibGV0dGVyU3BhY2luZ1wiLCBcbiAgICBnZXQ6IC0+IEBzdHlsZS5sZXR0ZXJTcGFjaW5nLnJlcGxhY2UoXCJweFwiLFwiXCIpXG4gICAgc2V0OiAodmFsdWUpIC0+IEBzZXRTdHlsZShcImxldHRlclNwYWNpbmdcIiwgdmFsdWUsIHRydWUpXG4gIEBkZWZpbmUgXCJsZW5ndGhcIiwgXG4gICAgZ2V0OiAtPiBAdGV4dC5sZW5ndGhcblxuY29udmVydFRvVGV4dExheWVyID0gKGxheWVyKSAtPlxuICB0ID0gbmV3IFRleHRMYXllclxuICAgIG5hbWU6IGxheWVyLm5hbWVcbiAgICBmcmFtZTogbGF5ZXIuZnJhbWVcbiAgICBwYXJlbnQ6IGxheWVyLnBhcmVudFxuICBcbiAgY3NzT2JqID0ge31cbiAgY3NzID0gbGF5ZXIuX2luZm8ubWV0YWRhdGEuY3NzXG4gIGNzcy5mb3JFYWNoIChydWxlKSAtPlxuICAgIHJldHVybiBpZiBfLmluY2x1ZGVzIHJ1bGUsICcvKidcbiAgICBhcnIgPSBydWxlLnNwbGl0KCc6ICcpXG4gICAgY3NzT2JqW2FyclswXV0gPSBhcnJbMV0ucmVwbGFjZSgnOycsJycpXG4gIHQuc3R5bGUgPSBjc3NPYmpcbiAgXG4gIGltcG9ydFBhdGggPSBsYXllci5fX2ZyYW1lckltcG9ydGVkRnJvbVBhdGhcbiAgaWYgXy5pbmNsdWRlcyBpbXBvcnRQYXRoLCAnQDJ4J1xuICAgIHQuZm9udFNpemUgKj0gMlxuICAgIHQubGluZUhlaWdodCA9IChwYXJzZUludCh0LmxpbmVIZWlnaHQpKjIpKydweCdcbiAgICB0LmxldHRlclNwYWNpbmcgKj0gMlxuICAgICAgICAgIFxuICB0LnkgLT0gKHBhcnNlSW50KHQubGluZUhlaWdodCktdC5mb250U2l6ZSkvMiAjIGNvbXBlbnNhdGUgZm9yIGhvdyBDU1MgaGFuZGxlcyBsaW5lIGhlaWdodFxuICB0LnkgLT0gdC5mb250U2l6ZSAqIDAuMSAjIHNrZXRjaCBwYWRkaW5nXG4gIHQueCAtPSB0LmZvbnRTaXplICogMC4wOCAjIHNrZXRjaCBwYWRkaW5nXG4gIHQud2lkdGggKz0gdC5mb250U2l6ZSAqIDAuNSAjIHNrZXRjaCBwYWRkaW5nXG5cbiAgdC50ZXh0ID0gbGF5ZXIuX2luZm8ubWV0YWRhdGEuc3RyaW5nXG4gIGxheWVyLmRlc3Ryb3koKVxuICByZXR1cm4gdFxuXG5MYXllcjo6Y29udmVydFRvVGV4dExheWVyID0gLT4gY29udmVydFRvVGV4dExheWVyKEApXG5cbmNvbnZlcnRUZXh0TGF5ZXJzID0gKG9iaikgLT5cbiAgZm9yIHByb3AsbGF5ZXIgb2Ygb2JqXG4gICAgaWYgbGF5ZXIuX2luZm8ua2luZCBpcyBcInRleHRcIlxuICAgICAgb2JqW3Byb3BdID0gY29udmVydFRvVGV4dExheWVyKGxheWVyKVxuXG4jIEJhY2t3YXJkcyBjb21wYWJpbGl0eS4gUmVwbGFjZWQgYnkgY29udmVydFRvVGV4dExheWVyKClcbkxheWVyOjpmcmFtZUFzVGV4dExheWVyID0gKHByb3BlcnRpZXMpIC0+XG4gICAgdCA9IG5ldyBUZXh0TGF5ZXJcbiAgICB0LmZyYW1lID0gQGZyYW1lXG4gICAgdC5zdXBlckxheWVyID0gQHN1cGVyTGF5ZXJcbiAgICBfLmV4dGVuZCB0LHByb3BlcnRpZXNcbiAgICBAZGVzdHJveSgpXG4gICAgdFxuXG5leHBvcnRzLlRleHRMYXllciA9IFRleHRMYXllclxuZXhwb3J0cy5jb252ZXJ0VGV4dExheWVycyA9IGNvbnZlcnRUZXh0TGF5ZXJzIiwiIyBTdHlsZSBQYWxldHRlIGZvciBNYXJibGVUcmFkZXIuY2x1Ylxue1RleHRMYXllcn0gPSByZXF1aXJlIFwiVGV4dExheWVyXCJcblxuIyBodHRwczovL2Nvb2xvcnMuY28vMmIyZDQyLWE1MWMzMC0yYTNkNDUtNGIyOTZiLTNjMTUzYlxuY29sb3JzID1cbiAgd2hpdGU6IFwiI2ZmZmZmZlwiXG4gIGJsYWNrOiBcIiMwMDAwMDBcIlxuICBsaWdodEdyYXk6IFwicmdiYSgyMzAsMjMwLDIzMCwxKVwiXG4gIHZlaWw6IFwicmdiYSgxODUsMTg1LDE4NSwwLjMpXCJcbiAgZGFya1B1cnBsZTogXCIjM0MxNTNCXCJcbiAgc3BhbmlzaFZpb2xldDogXCIjNEIyOTZCXCJcbiAgamFwYW5lc2VJbmRpZ286IFwiIzJBM0Q0NVwiXG4gIHZpdmlkQnVyZ3VuZHk6IFwiI0E1MUMzMFwiXG4gIGd1bm1ldGFsOiBcIiMyQjJENDJcIlxuXG4jIGZvbnRzIGltcG9ydGVkIGZyb20gQ0ROIGluIGluZGV4Lmh0bWxcbmZvbnRzID1cbiAgYmFsb29UaGFtYmk6IFwiJ0JhbG9vIFRoYW1iaScsIGN1cnNpdmVcIlxuICBtaXJ6YTogXCInTWlyemEnLCBjdXJzaXZlXCJcbiAgbXVsaTogXCInTXVsaScsIHNhbnMtc2VyaWZcIlxuXG5jbGFzcyBIZWFkZXJUZXh0IGV4dGVuZHMgVGV4dExheWVyXG4gIGNvbnN0cnVjdG9yOiAob3B0aW9ucz17fSkgLT5cbiAgICBvcHRpb25zLmZvbnRGYW1pbHkgPz0gZm9udHMubWlyemFcbiAgICBvcHRpb25zLmNvbG9yID89IGNvbG9ycy5ndW5tZXRhbFxuICAgIG9wdGlvbnMuZm9udFNpemUgPz0gMTEwXG4gICAgb3B0aW9ucy5sZXR0ZXJTcGFjaW5nID89IC0yXG4gICAgb3B0aW9ucy50ZXh0QWxpZ24gPz0gXCJjZW50ZXJcIlxuICAgIHN1cGVyIG9wdGlvbnNcblxuY2xhc3MgU3ViSGVhZGVyVGV4dCBleHRlbmRzIFRleHRMYXllclxuICBjb25zdHJ1Y3RvcjogKG9wdGlvbnM9e30pIC0+XG4gICAgb3B0aW9ucy5mb250RmFtaWx5ID89IGZvbnRzLm1pcnphXG4gICAgb3B0aW9ucy5jb2xvciA/PSBjb2xvcnMuZ3VubWV0YWxcbiAgICBvcHRpb25zLmZvbnRTaXplID89IDUwXG4gICAgb3B0aW9ucy5sZXR0ZXJTcGFjaW5nID89IC0xXG4gICAgb3B0aW9ucy50ZXh0QWxpZ24gPz0gXCJsZWZ0XCJcbiAgICBzdXBlciBvcHRpb25zXG5cbmNsYXNzIEJvZHlUZXh0IGV4dGVuZHMgVGV4dExheWVyXG4gIGNvbnN0cnVjdG9yOiAob3B0aW9ucz17fSkgLT5cbiAgICBvcHRpb25zLmJhY2tncm91bmRDb2xvciA/PSBcInRyYW5zcGFyZW50XCJcbiAgICBvcHRpb25zLmZvbnRGYW1pbHkgPz0gZm9udHMubXVsaVxuICAgIG9wdGlvbnMuZm9udFNpemUgPz0gMjhcbiAgICBvcHRpb25zLmNvbG9yID89IGNvbG9ycy5ndW5tZXRhbFxuICAgIHN1cGVyIG9wdGlvbnNcblxuZXhwb3J0cy5jb2xvcnMgPSBjb2xvcnNcbmV4cG9ydHMuZm9udHMgPSBmb250c1xuZXhwb3J0cy5Cb2R5VGV4dCA9IEJvZHlUZXh0XG5leHBvcnRzLkhlYWRlclRleHQgPSBIZWFkZXJUZXh0XG5leHBvcnRzLlN1YkhlYWRlclRleHQgPSBTdWJIZWFkZXJUZXh0IiwiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFFQUE7QURDQSxJQUFBLDZEQUFBO0VBQUE7OztBQUFDLFlBQWEsT0FBQSxDQUFRLFdBQVIsRUFBYjs7QUFHRCxNQUFBLEdBQ0U7RUFBQSxLQUFBLEVBQU8sU0FBUDtFQUNBLEtBQUEsRUFBTyxTQURQO0VBRUEsU0FBQSxFQUFXLHFCQUZYO0VBR0EsSUFBQSxFQUFNLHVCQUhOO0VBSUEsVUFBQSxFQUFZLFNBSlo7RUFLQSxhQUFBLEVBQWUsU0FMZjtFQU1BLGNBQUEsRUFBZ0IsU0FOaEI7RUFPQSxhQUFBLEVBQWUsU0FQZjtFQVFBLFFBQUEsRUFBVSxTQVJWOzs7QUFXRixLQUFBLEdBQ0U7RUFBQSxXQUFBLEVBQWEseUJBQWI7RUFDQSxLQUFBLEVBQU8sa0JBRFA7RUFFQSxJQUFBLEVBQU0sb0JBRk47OztBQUlJOzs7RUFDUyxvQkFBQyxPQUFEOztNQUFDLFVB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
