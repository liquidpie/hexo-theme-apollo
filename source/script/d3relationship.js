"use strict";

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function")
}
var _slicedToArray = function() {
        function sliceIterator(arr, i) {
            var _arr = [],
                _n = !0,
                _d = !1,
                _e = void 0;
            try {
                for (var _s, _i = arr[Symbol.iterator](); !(_n = (_s = _i.next()).done) && (_arr.push(_s.value), !i || _arr.length !== i); _n = !0);
            } catch (err) {
                _d = !0, _e = err
            } finally {
                try {
                    !_n && _i["return"] && _i["return"]()
                } finally {
                    if (_d) throw _e
                }
            }
            return _arr
        }
        return function(arr, i) {
            if (Array.isArray(arr)) return arr;
            if (Symbol.iterator in Object(arr)) return sliceIterator(arr, i);
            throw new TypeError("Invalid attempt to destructure non-iterable instance")
        }
    }(),
    _createClass = function() {
        function defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
                var descriptor = props[i];
                descriptor.enumerable = descriptor.enumerable || !1, descriptor.configurable = !0, "value" in descriptor && (descriptor.writable = !0), Object.defineProperty(target, descriptor.key, descriptor)
            }
        }
        return function(Constructor, protoProps, staticProps) {
            return protoProps && defineProperties(Constructor.prototype, protoProps), staticProps && defineProperties(Constructor, staticProps), Constructor
        }
    }(),
    _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj) {
        return typeof obj
    } : function(obj) {
        return obj && "function" == typeof Symbol && obj.constructor === Symbol ? "symbol" : typeof obj
    };
! function(root, factory) {
    "function" == typeof define && define.amd ? define(["d3"], factory) : "object" === ("undefined" == typeof module ? "undefined" : _typeof(module)) && module.exports ? module.exports = function(d3) {
        return d3.tip = factory(d3), d3.tip
    } : window.d3.tip = factory(d3)
}(void 0, function(d3) {
    return function() {
        var d3TipDirection = function() {
                return "n"
            },
            d3TipOffset = function() {
                return [0, 0]
            },
            d3TipHtml = function() {
                return " "
            },
            initNode = function() {
                var node = d3.select(document.createElement("div"));
                return node.style("position", "absolute").style("top", 0).style("opacity", 0).style("pointer-events", "none").style("box-sizing", "border-box"), node.node()
            },
            getNodeEl = function() {
                return null === node && (node = initNode(), document.body.appendChild(node)), d3.select(node)
            },
            getScreenBBox = function() {
                for (var targetel = target || d3.event.target;
                     "undefined" == typeof targetel.getScreenCTM && "undefined" === targetel.parentNode;) targetel = targetel.parentNode;
                var bbox = {},
                    matrix = targetel.getScreenCTM(),
                    tbbox = targetel.getBBox(),
                    width = tbbox.width,
                    height = tbbox.height,
                    x = tbbox.x,
                    y = tbbox.y;
                return point.x = x, point.y = y, bbox.nw = point.matrixTransform(matrix), point.x += width, bbox.ne = point.matrixTransform(matrix), point.y += height, bbox.se = point.matrixTransform(matrix), point.x -= width, bbox.sw = point.matrixTransform(matrix), point.y -= height / 2, bbox.w = point.matrixTransform(matrix), point.x += width, bbox.e = point.matrixTransform(matrix), point.x -= width / 2, point.y -= height / 2, bbox.n = point.matrixTransform(matrix), point.y += height, bbox.s = point.matrixTransform(matrix), bbox
            },
            direction = d3TipDirection,
            offset = d3TipOffset,
            html = d3TipHtml,
            node = initNode(),
            svg = null,
            point = null,
            target = null,
            getPageTopLeft = function(el) {
                var rect = el.getBoundingClientRect(),
                    docEl = document.documentElement;
                return {
                    top: rect.top + (window.pageYOffset || docEl.scrollTop || 0),
                    right: rect.right + (window.pageXOffset || 0),
                    bottom: rect.bottom + (window.pageYOffset || 0),
                    left: rect.left + (window.pageXOffset || docEl.scrollLeft || 0)
                }
            },
            functor = function(val) {
                return "function" == typeof val ? val : function() {
                    return val
                }
            },
            directionN = function() {
                var bbox = getScreenBBox();
                return {
                    top: bbox.n.y - node.offsetHeight,
                    left: bbox.n.x - node.offsetWidth / 2
                }
            },
            directionS = function() {
                var bbox = getScreenBBox();
                return {
                    top: bbox.s.y,
                    left: bbox.s.x - node.offsetWidth / 2
                }
            },
            directionE = function() {
                var bbox = getScreenBBox();
                return {
                    top: bbox.e.y - node.offsetHeight / 2,
                    left: bbox.e.x
                }
            },
            directionW = function() {
                var bbox = getScreenBBox();
                return {
                    top: bbox.w.y - node.offsetHeight / 2,
                    left: bbox.w.x - node.offsetWidth
                }
            },
            directionNW = function() {
                var bbox = getScreenBBox();
                return {
                    top: bbox.nw.y - node.offsetHeight,
                    left: bbox.nw.x - node.offsetWidth
                }
            },
            directionNE = function() {
                var bbox = getScreenBBox();
                return {
                    top: bbox.ne.y - node.offsetHeight,
                    left: bbox.ne.x
                }
            },
            directionSW = function() {
                var bbox = getScreenBBox();
                return {
                    top: bbox.sw.y,
                    left: bbox.sw.x - node.offsetWidth
                }
            },
            directionSE = function() {
                var bbox = getScreenBBox();
                return {
                    top: bbox.se.y,
                    left: bbox.e.x
                }
            },
            direction_callbacks = d3.map({
                n: directionN,
                s: directionS,
                e: directionE,
                w: directionW,
                nw: directionNW,
                ne: directionNE,
                sw: directionSW,
                se: directionSE
            }),
            directions = direction_callbacks.keys(),
            getSVGNode = function(el) {
                return el = el.node(), "svg" === el.tagName.toLowerCase() ? el : el.ownerSVGElement
            },
            tip = function(vis) {
                svg = getSVGNode(vis), point = svg.createSVGPoint(), document.body.appendChild(node)
            };
        return tip.show = function() {
            var args = Array.prototype.slice.call(arguments);
            args[args.length - 1] instanceof SVGElement && (target = args.pop());
            var content = html.apply(this, args),
                poffset = offset.apply(this, args),
                nodel = getNodeEl(),
                scrollTop = document.documentElement.scrollTop || document.body.scrollTop,
                scrollLeft = document.documentElement.scrollLeft || document.body.scrollLeft,
                coords = void 0,
                dir = direction.apply(this, args),
                i = directions.length;
            nodel.html(content).style("position", "absolute").style("opacity", 1).style("pointer-events", "all");
            var node = nodel._groups ? nodel._groups[0][0] : nodel[0][0],
                nodeWidth = node.clientWidth,
                nodeHeight = node.clientHeight,
                windowWidth = window.innerWidth,
                windowHeight = window.innerHeight,
                elementCoords = getPageTopLeft(this),
                breaksTop = elementCoords.top - nodeHeight < 0,
                breaksLeft = elementCoords.left - nodeWidth < 0,
                breaksRight = elementCoords.right + nodeHeight > windowWidth,
                breaksBottom = elementCoords.bottom + nodeHeight > windowHeight;
            for (breaksTop && !breaksRight && !breaksBottom && breaksLeft ? dir = "e" : !breaksTop || breaksRight || breaksBottom || breaksLeft ? breaksTop && breaksRight && !breaksBottom && !breaksLeft ? dir = "w" : breaksTop || breaksRight || breaksBottom || !breaksLeft ? !breaksTop && !breaksRight && breaksBottom && breaksLeft ? dir = "e" : breaksTop || breaksRight || !breaksBottom || breaksLeft ? !breaksTop && breaksRight && breaksBottom && !breaksLeft ? dir = "n" : breaksTop || !breaksRight || breaksBottom || breaksLeft || (dir = "w") : dir = "e" : dir = "e" : dir = "s", direction(dir); i--;) nodel.classed(directions[i], !1);
            return coords = direction_callbacks.get(dir).apply(this), nodel.classed(dir, !0).style("top", coords.top + poffset[0] + scrollTop + "px").style("left", coords.left + poffset[1] + scrollLeft + "px"), tip
        }, tip.hide = function() {
            var nodel = getNodeEl();
            return nodel.style("opacity", 0).style("pointer-events", "none"), tip
        }, tip.attr = function(n) {
            if (arguments.length < 2 && "string" == typeof n) return getNodeEl().attr(n);
            var args = Array.prototype.slice.call(arguments);
            return d3.selection.prototype.attr.apply(getNodeEl(), args), tip
        }, tip.style = function(n) {
            if (arguments.length < 2 && "string" == typeof n) return getNodeEl().style(n);
            var args = Array.prototype.slice.call(arguments);
            if (1 === args.length)
                for (var styles = args[0], keys = Object.keys(styles), key = 0; key < keys.length; key++) d3.selection.prototype.style.apply(getNodeEl(), styles[key]);
            return tip
        }, tip.direction = function(v) {
            return arguments.length ? (direction = null == v ? v : functor(v), tip) : direction
        }, tip.offset = function(v) {
            return arguments.length ? (offset = null == v ? v : functor(v), tip) : offset
        }, tip.html = function(v) {
            return arguments.length ? (html = null == v ? v : functor(v), tip) : html
        }, tip.destroy = function() {
            return node && (getNodeEl().remove(), node = null), tip
        }, tip
    }
});
var RelationshipGraph = function() {
    function RelationshipGraph(selection) {
        var userConfig = arguments.length <= 1 || void 0 === arguments[1] ? {
            showTooltips: !0,
            maxChildCount: 0,
            thresholds: []
        } : arguments[1];
        if (_classCallCheck(this, RelationshipGraph), userConfig.thresholds) {
            if ("object" !== _typeof(userConfig.thresholds)) throw "Thresholds must be an Object."
        } else userConfig.thresholds = [];
        void 0 !== userConfig.onClick ? (this.parentPointer = void 0 !== userConfig.onClick.parent, this.childPointer = void 0 !== userConfig.onClick.child) : (this.parentPointer = !1, this.childPointer = !1);
        var defaultOnClick = {
            parent: RelationshipGraph.noop,
            child: RelationshipGraph.noop
        };
        this.configuration = {
            blockSize: 24,
            selection: selection,
            showTooltips: userConfig.showTooltips,
            maxChildCount: userConfig.maxChildCount || 0,
            onClick: userConfig.onClick || defaultOnClick,
            showKeys: userConfig.showKeys,
            thresholds: userConfig.thresholds,
            colors: userConfig.colors || RelationshipGraph.getColors(),
            transitionTime: userConfig.transitionTime || 1500,
            truncate: userConfig.truncate || 0,
            sortFunction: userConfig.sortFunction || RelationshipGraph.sortJson,
            valueKeyName: userConfig.valueKeyName
        };
        for (var i = 0; i < this.configuration.colors.length; i++) {
            var color = this.configuration.colors[i];
            color.indexOf("#") < 0 && "string" == typeof color && 6 === color.length && !isNaN(parseInt(color, 16)) && (color = "#" + color, this.configuration.colors[i] = color)
        }
        void 0 === this.configuration.showTooltips && (this.configuration.showTooltips = !0), void 0 === this.configuration.showKeys && (this.configuration.showKeys = !0), void 0 === this.configuration.keyValueName && (this.configuration.keyValueName = "value"), this.configuration.thresholds.length && "number" == typeof this.configuration.thresholds[0] && this.configuration.thresholds.sort(function(a, b) {
            return a - b
        }), this.measurementDiv = document.createElement("div"), this.measurementDiv.className = "relationshipGraph-measurement", document.body.appendChild(this.measurementDiv), this.measuredCache = {}, this.representation = [], this._spacing = 1, this._d3V4 = !!this.configuration.selection._groups;
        var createTooltip = function(self) {
            var hiddenKeys = ["_PRIVATE_", "PARENT", "PARENTCOLOR", "SETNODECOLOR", "SETNODESTROKECOLOR"],
                showKeys = self.configuration.showKeys;
            return d3.tip().attr("class", "relationshipGraph-tip").offset([-8, -10]).html(function(obj) {
                for (var keys = Object.keys(obj), table = document.createElement("table"), count = keys.length, rows = []; count--;) {
                    var element = keys[count],
                        upperCaseKey = element.toUpperCase();
                    if (!RelationshipGraph.contains(hiddenKeys, upperCaseKey) && !upperCaseKey.startsWith("__")) {
                        var row = document.createElement("tr"),
                            key = showKeys ? document.createElement("td") : null,
                            value = document.createElement("td");
                        if (showKeys && (key.innerHTML = element.charAt(0).toUpperCase() + element.substring(1), row.appendChild(key)), "VALUE" == upperCaseKey && !self.configuration.valueKeyName) continue;
                        value.innerHTML = obj[element], value.style.fontWeight = "normal", row.appendChild(value), rows.push(row)
                    }
                }
                for (var rowCount = rows.length; rowCount--;) table.appendChild(rows[rowCount]);
                return table.outerHTML
            })
        };
        this.configuration.showTooltips ? (this.tooltip = createTooltip(this), this.tooltip.direction("n")) : this.tooltip = null, this.svg = this.configuration.selection.select("svg").select("g"), this.svg.empty() && (this.svg = this.configuration.selection.append("svg").attr("width", "500").attr("height", "500").attr("style", "display: block").append("g").attr("transform", "translate(10, 0)")), this.graph = this
    }
    return _createClass(RelationshipGraph, [{
        key: "getId",
        value: function() {
            var selection = this.configuration.selection,
                parent = this._d3V4 ? selection._groups[0][0] : selection[0][0];
            return parent.id
        }
    }, {
        key: "getPixelLength",
        value: function(str) {
            if (RelationshipGraph.containsKey(this.measuredCache, str)) return this.measuredCache[str];
            var text = document.createTextNode(str);
            this.measurementDiv.appendChild(text);
            var width = this.measurementDiv.offsetWidth;
            return this.measurementDiv.removeChild(text), this.measuredCache[str] = width, width
        }
    }, {
        key: "assignIndexAndRow",
        value: function(json, parentSizes, parents) {
            var longest = "",
                parentNames = Object.keys(parentSizes),
                i = void 0,
                index = 0,
                row = 0,
                previousParent = "",
                parentLength = parents.length,
                configuration = this.configuration,
                blockSize = configuration.blockSize,
                selection = configuration.selection;
            for (i = 0; parentLength > i; i++) {
                var current = parents[i] + " ( " + parentSizes[parentNames[i]] + ") ";
                current.length > longest.length && (longest = current)
            }
            var longestWidth = this.getPixelLength(longest),
                parentDiv = this._d3V4 ? selection._groups[0][0] : selection[0][0],
                calculatedMaxChildren = 0 === configuration.maxChildCount ? Math.floor((parentDiv.parentElement.clientWidth - blockSize - longestWidth) / blockSize) : configuration.maxChildCount,
                jsonLength = json.length,
                thresholds = configuration.thresholds;
            for (i = 0; jsonLength > i; i++) {
                var element = json[i],
                    parent = element.parent;
                if (null !== previousParent && previousParent !== parent ? (element.__row = row + 1, element.__index = 1, index = 2, row++) : (index === calculatedMaxChildren + 1 && (index = 1, row++), element.__row = row, element.__index = index, index++), previousParent = parent, 0 === thresholds.length) element.__color = 0;
                else {
                    var value = void 0,
                        compare = void 0;
                    if ("string" == typeof thresholds[0]) value = element.value, compare = RelationshipGraph.stringCompare;
                    else {
                        var elementValue = element.value;
                        value = "number" == typeof elementValue ? elementValue : parseFloat(elementValue.replace(/[^0-9-.]+/g, "")), compare = RelationshipGraph.numericCompare
                    }
                    var thresholdIndex = compare(value, thresholds);
                    element.__color = -1 === thresholdIndex ? 0 : thresholdIndex, element.__colorValue = this.configuration.colors[element.__color % this.configuration.colors.length]
                }
                element.setNodeColor = function(color) {
                    this.__node || (this.__node = document.getElementById(this.__id)), this.__node && (this.__node.style.fill = color)
                }, element.setNodeStrokeColor = function(color) {
                    this.__node || (this.__node = document.getElementById(this.__id)), this.__node && (this.__node.style.strokeWidth = color ? "1px" : 0, this.__node.style.stroke = color ? color : "")
                }, element.__id = this.getId() + "-child-node" + element.__row + "-" + element.__index
            }
            return [longestWidth, calculatedMaxChildren, row]
        }
    }, {
        key: "createParents",
        value: function(parentNodes, parentSizes, longestWidth, calculatedMaxChildren) {
            var parentSizesKeys = Object.keys(parentSizes),
                _this = this;
            parentNodes.enter().append("text").text(function(obj, index) {
                return obj + " (" + parentSizes[parentSizesKeys[index]] + ")"
            }).attr("x", function(obj, index) {
                var width = _this.getPixelLength(obj + " (" + parentSizes[parentSizesKeys[index]] + ")");
                return longestWidth - width
            }).attr("y", function(obj, index) {
                if (0 === index) return 0;
                for (var previousParentSize = 0, i = index - 1; i > -1;) previousParentSize += Math.ceil(parentSizes[parentSizesKeys[i]] / calculatedMaxChildren) * calculatedMaxChildren, i--;
                return Math.ceil(previousParentSize / calculatedMaxChildren) * _this.configuration.blockSize + _this._spacing * index
            }).style("text-anchor", "start").style("fill", function(obj) {
                return void 0 !== obj.parentColor ? _this.configuration.colors[obj.parentColor] : "#000000"
            }).style("cursor", this.parentPointer ? "pointer" : "default").attr("class", "relationshipGraph-Text").attr("transform", "translate(-6, " + _this.configuration.blockSize / 1.5 + ")").on("click", function(obj) {
                _this.configuration.onClick.parent(obj)
            })
        }
    }, {
        key: "updateParents",
        value: function(parentNodes, parentSizes, longestWidth, calculatedMaxChildren) {
            var parentSizesKeys = Object.keys(parentSizes),
                _this = this;
            parentNodes.text(function(obj, index) {
                return obj + " (" + parentSizes[parentSizesKeys[index]] + ")"
            }).attr("x", function(obj, index) {
                var width = _this.getPixelLength(obj + " (" + parentSizes[parentSizesKeys[index]] + ")");
                return longestWidth - width
            }).attr("y", function(obj, index) {
                if (0 === index) return 0;
                for (var previousParentSize = 0, i = index - 1; i > -1;) previousParentSize += Math.ceil(parentSizes[parentSizesKeys[i]] / calculatedMaxChildren) * calculatedMaxChildren, i--;
                return Math.ceil(previousParentSize / calculatedMaxChildren) * _this.configuration.blockSize + _this._spacing * index
            }).style("fill", function(obj) {
                return void 0 !== obj.parentColor ? _this.configuration.colors[obj.parentColor] : "#000000"
            }).style("cursor", _this.parentPointer ? "pointer" : "default")
        }
    }, {
        key: "createChildren",
        value: function(childrenNodes, longestWidth) {
            var _this = this;
            childrenNodes.enter().append("rect").attr("id", function(obj) {
                return obj.__id
            }).attr("x", function(obj) {
                return longestWidth + (obj.__index - 1) * _this.configuration.blockSize + 5 + (_this._spacing * obj.__index - 1)
            }).attr("y", function(obj) {
                return (obj.__row - 1) * _this.configuration.blockSize + (_this._spacing * obj.__row - 1)
            }).attr("rx", 4).attr("ry", 4).attr("class", "relationshipGraph-block").attr("width", _this.configuration.blockSize).attr("height", _this.configuration.blockSize).style("fill", function(obj) {
                return obj.__colorValue
            }).style("cursor", _this.childPointer ? "pointer" : "default").on("mouseover", _this.tooltip ? _this.tooltip.show : RelationshipGraph.noop).on("mouseout", _this.tooltip ? _this.tooltip.hide : RelationshipGraph.noop).on("click", function(obj) {
                _this.tooltip.hide(), _this.configuration.onClick.child(obj)
            })
        }
    }, {
        key: "updateChildren",
        value: function(childrenNodes, longestWidth) {
            var blockSize = this.configuration.blockSize,
                _this = this;
            childrenNodes.transition(this.configuration.transitionTime).attr("id", function(obj) {
                return obj.__id
            }).attr("x", function(obj) {
                return longestWidth + (obj.__index - 1) * blockSize + 5 + (_this._spacing * obj.__index - 1)
            }).attr("y", function(obj) {
                return (obj.__row - 1) * blockSize + (_this._spacing * obj.__row - 1)
            }).style("fill", function(obj) {
                return obj.__colorValue
            })
        }
    }, {
        key: "removeNodes",
        value: function(nodes) {
            nodes.exit().transition(this.configuration.transitionTime).remove()
        }
    }, {
        key: "data",
        value: function(json) {
            if (RelationshipGraph.verifyJson(json)) {
                var parents = [],
                    parentSizes = {},
                    configuration = this.configuration,
                    row = 0,
                    parent = void 0,
                    i = void 0,
                    maxWidth = void 0,
                    maxHeight = void 0,
                    calculatedMaxChildren = 0,
                    longestWidth = 0;
                configuration.sortFunction(json), this.representation = json;
                var jsonLength = json.length;
                for (i = 0; jsonLength > i; i++) parent = json[i].parent, RelationshipGraph.containsKey(parentSizes, parent) ? parentSizes[parent]++ : (parentSizes[parent] = 1, parents.push(RelationshipGraph.truncate(parent, configuration.truncate)));
                var _assignIndexAndRow = this.assignIndexAndRow(json, parentSizes, parents),
                    _assignIndexAndRow2 = _slicedToArray(_assignIndexAndRow, 3);
                for (longestWidth = _assignIndexAndRow2[0], calculatedMaxChildren = _assignIndexAndRow2[1], row = _assignIndexAndRow2[2], maxHeight = row * configuration.blockSize, maxWidth = longestWidth + calculatedMaxChildren * configuration.blockSize, maxWidth += this._spacing * calculatedMaxChildren, i = 0; row > i; i++) maxHeight += this._spacing * i;
                var parentNodes = this.svg.selectAll(".relationshipGraph-Text").data(parents);
                this.createParents(parentNodes, parentSizes, longestWidth, calculatedMaxChildren), this.updateParents(parentNodes, parentSizes, longestWidth, calculatedMaxChildren), this.removeNodes(parentNodes);
                var childrenNodes = this.svg.selectAll(".relationshipGraph-block").data(json);
                this.createChildren(childrenNodes, longestWidth), this.updateChildren(childrenNodes, longestWidth), this.removeNodes(childrenNodes), this.configuration.showTooltips && (d3.select(".d3-tip").remove(), this.svg.call(this.tooltip)), this.configuration.selection.select("svg").attr("width", Math.abs(maxWidth + 15)).attr("height", Math.abs(maxHeight + 15))
            }
            return this
        }
    }, {
        key: "search",
        value: function(query) {
            var results = [],
                queryKeys = Object.keys(query),
                queryKeysLength = queryKeys.length;
            if (this.representation && query)
                for (var length = this.representation.length, i = 0; length > i; i++) {
                    for (var currentObject = this.representation[i], isMatch = !1, j = 0; queryKeysLength > j; j++) {
                        var queryVal = query[queryKeys[j]];
                        if (!(isMatch = currentObject[queryKeys[j]] == queryVal)) break
                    }
                    isMatch && results.push(currentObject)
                }
            return results
        }
    }], [{
        key: "getColors",
        value: function() {
            return ["#c4f1be", "#a2c3a4", "#869d96", "#525b76", "#201e50", "#485447", "#5b7f77", "#6474ad", "#b9c6cb", "#c0d6c1", "#754668", "#587d71", "#4daa57", "#b5dda4", "#f9eccc", "#0e7c7b", "#17bebb", "#d4f4dd", "#d62246", "#4b1d3f", "#cf4799", "#c42583", "#731451", "#f3d1bf", "#c77745"]
        }
    }, {
        key: "containsKey",
        value: function(obj, key) {
            return Object.keys(obj).indexOf(key) > -1
        }
    }, {
        key: "contains",
        value: function(arr, key) {
            return arr.indexOf(key) > -1
        }
    }, {
        key: "truncate",
        value: function(str, cap) {
            return cap && str && str.length > cap ? str.substring(0, cap) + "..." : str
        }
    }, {
        key: "isArray",
        value: function(arr) {
            return "[object Array]" == Object.prototype.toString.call(arr)
        }
    }, {
        key: "noop",
        value: function() {}
    }, {
        key: "sortJson",
        value: function(json) {
            json.sort(function(child1, child2) {
                var parent1 = child1.parent.toLowerCase(),
                    parent2 = child2.parent.toLowerCase();
                return parent1 > parent2 ? 1 : parent2 > parent1 ? -1 : 0
            })
        }
    }, {
        key: "stringCompare",
        value: function(value, thresholds) {
            if ("string" != typeof value) throw "Cannot make value comparison between a string and a " + ("undefined" == typeof value ? "undefined" : _typeof(value)) + ".";
            if (!thresholds || !thresholds.length) throw "Cannot find correct threshold because there are no thresholds.";
            for (var thresholdsLength = thresholds.length, i = 0; thresholdsLength > i; i++)
                if (value == thresholds[i]) return i;
            return -1
        }
    }, {
        key: "numericCompare",
        value: function(value, thresholds) {
            if ("number" != typeof value) throw "Cannot make value comparison between a number and a " + ("undefined" == typeof value ? "undefined" : _typeof(value)) + ".";
            if (!thresholds || !thresholds.length) throw "Cannot find correct threshold because there are no thresholds.";
            for (var length = thresholds.length, i = 0; length > i; i++)
                if (value <= thresholds[i]) return i;
            return -1
        }
    }, {
        key: "verifyJson",
        value: function(json) {
            if (!RelationshipGraph.isArray(json) || json.length < 0 || "object" !== _typeof(json[0])) throw "JSON has to be an Array of JavaScript objects that is not empty.";
            for (var length = json.length; length--;) {
                var element = json[length],
                    keys = Object.keys(element),
                    keyLength = keys.length,
                    parentColor = element.parentColor;
                if (void 0 === element.parent) throw "Child does not have a parent.";
                if (void 0 !== parentColor && (parentColor > 4 || 0 > parentColor)) throw "Parent color is unsupported.";
                for (; keyLength--;)
                    if ("VALUE" == keys[keyLength].toUpperCase()) {
                        "value" != keys[keyLength] && (json[length].value = json[length][keys[keyLength]], delete json[length][keys[keyLength]]);
                        break
                    }
            }
            return !0
        }
    }]), RelationshipGraph
}();
d3.relationshipGraph = function() {
    return RelationshipGraph.extend.apply(RelationshipGraph, arguments)
}, d3.selection.prototype.relationshipGraph = function(userConfig) {
    return new RelationshipGraph(this, userConfig)
};