export class Tocas {

    constructor = function(selector = '', context = '') {
        var ref, tag;
        this.nodes = [];
        this.selector = selector;
        this.context = context;
        this.previousObject = null;

        if (selector === '') {

            // 如果選擇器是文字，但是是標籤（如：`<div>`）就建立新的元素
        } else if (typeof selector === 'string' && selector[0] === '<') {
            tag = selector.match(/<(.*)\/>|<(.*)>/);
            return this.nodes = [document.createElement((ref = tag[1]) != null ? ref : tag[2])];
            // 如果選擇器是一般的文字，就選取元素。
        } else if (typeof selector === 'string' && context === '') {
            return document.querySelectorAll(selector).forEach((element) => {
                return this.nodes.push(element);
            });
            // 如果選擇器有上下文選擇器，就透過選擇器找出上下文元素。
        } else if (typeof context === 'string') {
            return this.nodes = ts(selector).find(context).toArray();
            // 如果選擇器是 NodeList 就轉換成元素陣列然後取出來接著繼續。
        } else if (selector instanceof NodeList) {
            return selector.forEach((element) => {
                return this.nodes.push(element);
            });
            // 如果選擇器是陣列，就當作是元素陣列，取出來然後繼續。
            // 或傳入的是一個選擇器，就取出裡面的元素然後繼續。
        } else if (Array.isArray(selector) || (selector != null ? selector.isSelector : void 0) === true) {
            this.nodes = this.nodes.concat(selector);
            this.selector = selector.selector;
            return this.context = selector.context;
            // 如果是單個 DOM 元素，就放入選擇器然後繼續。
        } else if (selector instanceof HTMLElement || selector instanceof HTMLDocument || selector instanceof HTMLBodyElement || selector === window) {
            return this.nodes = [selector];
        }
    };

    // _alias
    _alias = function (event) {
        var alias, pair;
        pair = event.split('.');
        alias = pair[1] !== void 0 ? `.${pair[1]}` : '';
        switch (false) {
            case pair.indexOf('animationend') === -1:
                return `webkitAnimationEnd${alias} mozAnimationEnd${alias} MSAnimationEnd${alias} oanimationend${alias} animationend${alias}`;
            case pair.indexOf('transitionend') === -1:
                return `webkitTransitionEnd${alias} mozTransitionEnd${alias} oTransitionEnd${alias} msTransitionEnd${alias} transitionend${alias}`;
            default:
                return event;
        }
    };

    // isPlainObject
    isPlainObject = (object) => {
        return Object.prototype.toString.call(object) === '[object Object]';
    };

    // isTouchDevice
    isTouchDevice = () => {
        return 'ontouchstart' in window || navigator.maxTouchPoints;
    };

    // device
    device = () => {
        switch (false) {
            case !(window.innerWidth < 767):
                device = 'mobile';
                break;
            case !(window.innerWidth > 767 && window.innerWidth < 991):
                device = 'tablet';
                break;
            case !(window.innerWidth > 991 && window.innerWidth < 1199):
                device = 'computer';
                break;
            case !(window.innerWidth > 1199 && window.innerWidth < 1919):
                device = 'large';
        }
        return {
            device: device
        };
    };

    // fromPoint
    fromPoint = (x, y) => {
        return ts(document.elementFromPoint(x, y));
    };

    // extend
    extend = function () {
        var deep, extended, i, length, merge, obj;
        extended = {};
        deep = true;
        i = 0;
        length = arguments.length;
        if (Object.prototype.toString.call(arguments[0]) === '[object Boolean]') {
            deep = arguments[0];
            i++;
        }
        merge = function (obj) {
            var prop;
            for (prop in obj) {
                if (Object.prototype.hasOwnProperty.call(obj, prop)) {
                    if (deep && Object.prototype.toString.call(obj[prop]) === '[object Object]') {
                        extended[prop] = ts.extend(true, extended[prop], obj[prop]);
                    } else {
                        extended[prop] = obj[prop];
                    }
                }
            }
        };
        while (i < length) {
            obj = arguments[i];
            merge(obj);
            i++;
        }
        return extended;
    };

    // 建立元素
    createElement = (html) => {
        var div;
        div = document.createElement('div');
        div.innerHTML = html.trim();
        return div.firstChild;
    };

    // get 會取得選擇器內的指定元素，並且回傳一個 DOM 元素而非選擇器。
    get = function (index = 0) {
        return this.nodes[index];
    };

    // toArray 將選擇器轉換成帶有節點的一般陣列。
    toArray = function () {
        var array;
        array = [];
        this.nodes.forEach(function (element) {
            return array.push(element);
        });
        return array;
    };

    // each 遍歷整個選擇器陣列。
    each = function (callback) {
        this.nodes.forEach(function (element, index) {
            return callback.call(element, element, index);
        });
        return this;
    };

    // collectSwap 將收集到的元素替換掉目前選擇器內的所有元素。
    collectSwap = function (callback) {
        var collection, newSelector;
        collection = [];
        this.each(function (element, index) {
            var result;
            result = callback.call(element, element, index);
            if (result === void 0 || result === null) {
                return;
            }
            if (result instanceof NodeList) {
                return result.forEach(function (el) {
                    return collection.push(el);
                });
            } else if (Array.isArray(result)) {
                return collection = collection.concat(result);
            } else {
                if (collection.indexOf(result) === -1) {
                    return collection.push(result);
                }
            }
        });
        // 透過 Set 型態移除重複的節點。
        collection = new Set(collection);
        // 然後將 Set 轉換成陣列，建立新的選擇器。
        newSelector = ts([...collection]);
        // 保存選擇器之前的所有節點。
        Object.defineProperty(newSelector, 'prevObject', {
            value: this
        });
        // 回傳這個新的選擇器。
        return newSelector;
    };

    // eq 取得選擇器的指定元素，然後繼續回傳僅帶有該元素的選擇器。
    eq = function (index) {
        return ts(this.get(index));
    };

    // parent 回傳元素的父元素選擇器。
    parent = function () {
        return this.collectSwap(function () {
            return this.parentNode;
        });
    };

    // parents 回傳元素的所有父元素直至指定父元素。
    parents = function (selector) {
        return this.collectSwap(function (self) {
            var matchedSelector;
            parents = [];
            matchedSelector = false;
            while (self) {
                self = self.parentNode;
                if (self.nodeType === 9) {
                    break;
                }
                parents.push(self);
                if (ts(self).equal(selector)) {
                    matchedSelector = true;
                    break;
                }
            }
            if (selector && !matchedSelector) {
                return [];
            }
            return parents;
        });
    };

    // closest 回傳最接近指定的父元素選擇器。
    closest = function (selector) {
        return this.collectSwap(function () {
            return this.closest(selector);
        });
    };

    // find 在目前元素中搜尋指定元素並回傳其選擇器。
    find = function (selector) {
        return this.collectSwap(function () {
            return this.querySelectorAll(selector);
        });
    };

    // insertBefore 將選擇器元素安插在指定元素前。
    insertBefore = function (target) {
        return this.each(function () {
            return ts(target).each((element) => {
                return element.parentNode.insertBefore(this, element);
            });
        });
    };

    // insertAfter 將選擇器元素安插在指定元素後。
    insertAfter = function (target) {
        return this.each(function () {
            return ts(target).each((element) => {
                return element.parentNode.insertBefore(this, element.nextSibling);
            });
        });
    };

    // wrap 將元素用指定元素包覆起來。
    wrap = function (element) {
        return this.each(function () {
            if (this.nextSibling) {
                this.parentNode.insertBefore(element, this.nextSibling);
            } else {
                this.parentNode.appendChild(element);
            }
            return element.appendChild(this);
        });
    };

    // clone 複製元素。
    clone = function () {
        return this.collectSwap(function () {
            return this.cloneNode(true);
        });
    };

    // append 將元素插入在目前選擇器元素的內部最後面。
    append = function (element) {
        var shouldClone;
        shouldClone = this.length !== 1;
        if (element.isSelector !== void 0) {
            return this.each(function () {
                return element.each((e) => {
                    return this.appendChild(shouldClone ? e.cloneNode(true) : e);
                });
            });
        } else if (typeof element === 'string') {
            return this.each(function () {
                return this.insertAdjacentHTML('beforeend', element);
            });
        } else {
            return this.each(function () {
                return this.appendChild(shouldClone ? element.cloneNode(true) : element);
            });
        }
    };

    // appendTo 將目前選擇器元素插入到指定元素的內部最後面。
    appendTo = function (selector) {
        return this.each(function () {
            return ts(selector).append(this);
        });
    };

    // prepend 將元素插入在目前選擇器元素的內部最前面。
    prepend = function (element) {
        var shouldClone;
        shouldClone = this.length !== 1;
        if (element.isSelector !== void 0) {
            return this.each(function () {
                return element.each((e) => {
                    return this.prepend(shouldClone ? e.cloneNode(true) : e);
                });
            });
        } else if (typeof element === 'string') {
            return this.each(function () {
                return this.insertAdjacentHTML('afterbegin', element);
            });
        } else {
            return this.each(function () {
                return this.prepend(shouldClone ? element.cloneNode(true) : element);
            });
        }
    };

    // prependTo 將目前選擇器元素插入到指定元素的內部最前面。
    prependTo = function (selector) {
        return this.each(function () {
            return ts(selector).prepend(this);
        });
    };

    // remove 將選擇器元素從頁面上中移除。
    remove = function () {
        return this.each(function () {
            var ref;
            return (ref = this.parentNode) != null ? ref.removeChild(this) : void 0;
        });
    };

    // equal 選擇一些元素，然後用來比對目前的選擇器元素是否在這群當中。
    equal = function (selector) {
        var isInElements, ref;
        isInElements = false;
        if (selector instanceof HTMLElement) {
            return (ref = this.get(0)) != null ? ref.isSameNode(selector) : void 0;
        }
        this.each(function () {
            return ts(selector).each((compareElement) => {
                if (this === compareElement) {
                    return isInElements = true;
                }
            });
        });
        return isInElements;
    };

    // contains 是否擁有指定子元素。
    contains = function (selector) {
        var ref;
        return (ref = this.get(0)) != null ? ref.contains(ts(selector).get()) : void 0;
    };

    // exists 是否存在。
    exists = function () {
        return this.length !== 0;
    };

    // notEqual 將指定元素從選擇器中剔除。
    notEqual = function (selector) {
        return ts(this.toArray().filter((element) => {
            return ts(selector).indexOf(element) === -1;
        }));
    };

    // filter 將指定元素從選擇器中保留，簡單說就是 `Not` 的相反。
    filter = function (selector) {
        return ts(this.toArray().filter((element) => {
            return ts(selector).indexOf(element) !== -1;
        }));
    };

    // slice 替元素陣列進行切分。
    slice = function (from, to) {
        return ts(this.toArray().slice(from, to));
    };

    // children 取得容器裡的第一層子節點。
    children = function (selector) {
        return this.collectSwap(function () {
            return this.querySelectorAll(selector != null ? `:scope > ${selector}` : ':scope > *');
        });
    };

    // replaceWith 將元素替換為指定選擇器元素。
    replaceWith = function (selector) {
        var element;
        element = ts(selector).get();
        return this.each(function () {
            return this.replaceWith(element);
        });
    };

    // last 選擇器中的最後一個元素。
    last = function () {
        return this.eq(this.length - 1);
    };

    // next 下一個元素。
    next = function () {
        return this.collectSwap(function () {
            return this.nextElementSibling;
        });
    };

    // previous 上一個元素。
    previous = function () {
        return this.collectSwap(function () {
            return this.previousElementSibling;
        });
    };

    // nextAll 這個元素之後的所有同階層元素。
    nextAll = function (selector) {
        return this.collectSwap(function () {
            var $children, $parent, $self, index;
            $self = ts(this);
            $parent = $self.parent();
            $children = selector != null ? $parent.find(`:scope > ${selector}`) : $parent.find(':scope > *');
            index = $self.index();
            return $children.slice(index + 1);
        });
    };

    // previousAll 這個元素之前的所有同階層元素。
    previousAll = function (selector) {
        return this.collectSwap(function () {
            var $children, $parent, $self, index;
            $self = ts(this);
            $parent = $self.parent();
            $children = selector != null ? $parent.find(`:scope > ${selector}`) : $parent.find(':scope > *');
            index = $self.index();
            return $children.slice(0, index);
        });
    };

    // addBack 在目前的選擇器節點陣列中加上先前選擇的所有節點。
    addBack = function () {
        if (this.prevObject) {
            this.prevObject.toArray().forEach((element) => {
                return this.push(element);
            });
        }
        return this;
    };

    // index 該元素在容器內的索引。
    index = function () {
        var node;
        node = this.get(0);
        index = 0;
        if (node == null) {
            return -1;
        }
        while ((node = node.previousElementSibling)) {
            index++;
        }
        return index;
    };

    // getAttribute 取得或是建立新的標籤到目前的選擇器元素。
    getAttribute = function (name, value) {
        var ref;
        return (ref = this.get()) != null ? ref.getAttribute(name) : void 0;
    };

    // setAttribute 設置選擇器元素標籤。
    setAttribute = function (name, value) {
        if (typeof name === 'object') {
            return this.each(function () {
                var key, results;
                results = [];
                for (key in name) {
                    results.push(this.setAttribute(key, name[key]));
                }
                return results;
            });
        } else {
            return this.each(function () {
                return this.setAttribute(name, value);
            });
        }
    };

    // removeAttribute 移除目前選擇器元素的指定標籤。
    removeAttribute = function (name) {
        return this.each(function () {
            return this.removeAttribute(name);
        });
    };

    // addClass 在目前選擇器元素插入新的樣式類別名稱。
    addClass = function (names) {
        var name, newNames;
        if (typeof names === 'object') {
            newNames = '';
            for (name in names) {
                if (names[name] === true) {
                    newNames += ` ${name}`;
                }
            }
            names = newNames;
        } else {
            names = Array.prototype.slice.call(arguments).join(' ');
        }
        return this.each(function () {
            return DOMTokenList.prototype.add.apply(this.classList, names.split(' ').filter(Boolean));
        });
    };

    // removeClass 移除目前選擇器元素的指定樣式類別。
    removeClass = function (names) {
        var name, newNames;
        if (typeof names === 'object') {
            newNames = '';
            for (name in names) {
                if (names[name] === true) {
                    newNames += ` ${name}`;
                }
            }
            names = newNames;
        } else {
            names = Array.prototype.slice.call(arguments).join(' ');
        }
        return this.each(function () {
            return DOMTokenList.prototype.remove.apply(this.classList, names.split(' ').filter(Boolean));
        });
    };

    // toggleClass 切換目前選擇器元素的樣式。
    toggleClass = function (names) {
        return this.each(function () {
            return names.split(' ').forEach(function (name) {
                return this.classList.toggle(name);
            }, this);
        });
    };

    // hasClass 回傳選擇器元素是否帶有指定樣式類別，是布林值。
    hasClass = function (name) {
        var ref;
        return (ref = this.get(0)) != null ? ref.classList.contains(name) : void 0;
    };

    // getCSS 取得選擇器元素指定的 CSS 樣式。
    getCSS = function (name) {
        if (this.get() != null) {
            return document.defaultView.getComputedStyle(this.get(), null).getPropertyValue(name);
        } else {
            return null;
        }
    };

    // setCSS 將選擇器元素套用指定的 CSS 樣式。
    setCSS = function (name, value) {
        var key;
        if (typeof name === 'object') {
            for (key in name) {
                this.each(function () {
                    return this.style[key] = name[key];
                });
            }
            return this;
        } else {
            return this.each(function () {
                return this.style[name] = value;
            });
        }
    };

    // rect 回傳選擇器元素的渲染形狀。
    rect = function () {
        var r, ref;
        r = (ref = this.get(0)) != null ? ref.getBoundingClientRect() : void 0;
        return {
            top: r.top,
            right: r.right,
            bottom: r.bottom,
            left: r.left,
            width: r.width,
            height: r.height,
            x: r.x,
            y: r.y
        };
    };

    // bind 綁定並註冊一個事件監聽器。
    bind = function (events, handler, options = {
        once: false
    }) {
        return this.each(function () {
            return ts(this).bindWithOptions({
                events: events,
                handler: handler,
                options: options
            });
        });
    };

    // bindWithData 綁定並註冊一個帶有自訂資料的事件監聽器。
    bindWithData = function (events, data, handler, options = {
        once: false
    }) {
        return this.each(function () {
            return ts(this).bindWithOptions({
                events: events,
                handler: handler,
                data: data,
                options: options
            });
        });
    };

    // bindWithChild 綁定並註冊一個事件監聽器在父元素，但監聽的是子元素事件。
    bindWithChild = function (events, selector, handler, options = {
        once: false
    }) {
        return this.each(function () {
            return ts(this).bindWithOptions({
                events: events,
                handler: handler,
                selector: selector,
                data: data,
                options: options
            });
        });
    };

    // bindWithChildData 綁定並註冊一個帶有自訂資料的事件監聽器在父元素，但監聽的是子元素事件。
    bindWithChildData = function (events, selector, data, handler, options = {
        once: false
    }) {
        return this.each(function () {
            return ts(this).bindWithOptions({
                events: events,
                handler: handler,
                selector: selector,
                data: data,
                options: options
            });
        });
    };

    // bindWithOptions 以進階選項綁定並註冊一個事件監聽器。
    bindWithOptions = function (options) {
        var data, events, handler, selector;
        ({ events, handler, selector, data, options } = options);
        events = ts.helper.eventAlias(events);
        // $events.click =
        // {
        //     anonymous: [
        //         {
        //             once    : true,
        //             selector: ".button",
        //             data    : {},
        //             func    : func()
        //         }
        //     ]
        //     alias1: [
        //         {
        //             once    : true,
        //             selector: ".button",
        //             data    : {},
        //             func    : func()
        //         }
        //    ]
        // }
        return this.each(function () {
            if (events[0] === '(' && events[events.length - 1] === ')') {
                if (this !== window) {
                    return;
                }
                if (window.$media === void 0) {
                    window.$media = {};
                }
                if (window.$media[events] === void 0) {
                    window.$media[events] = [];
                    window.matchMedia(events).addListener(function (mq) {
                        var j, len, ref, results, single;
                        ref = window.$media[events];
                        results = [];
                        for (j = 0, len = ref.length; j < len; j++) {
                            single = ref[j];
                            results.push(single.func.call(this, mq));
                        }
                        return results;
                    });
                }
                window.$media[events].push({
                    data: {},
                    func: handler
                });
                return;
            }
            if (this.addEventListener === void 0) {
                return;
            }
            if (this.$events === void 0) {
                this.$events = {};
            }
            return events.split(' ').forEach(function (eventName) {
                var event, eventAlias, hasAlias;
                event = eventName.split('.');
                // 透過事件的「event.alias」取得「點」後面的別名。
                hasAlias = event.length > 1;
                eventName = event[0];
                eventAlias = hasAlias ? event[1] : null;
                // 如果事件還沒在這個物件內產生過，就初始化一個事件結構。
                if (this.$events[eventName] === void 0) {
                    this.$events[eventName] = {
                        anonymous: []
                    };
                    // 然後建立一個管理多個事件的事件管理處理程式。
                    this.addEventListener(eventName, function (event) {
                        var alias, calledAlias, context, hasArgs, ref, ref1, ref2, results, single;
                        // 是否有自訂參數。
                        hasArgs = ((ref = event.detail) != null ? (ref1 = ref.args) != null ? ref1.length : void 0 : void 0) > 0;
                        // 是否有呼叫事件別名。
                        calledAlias = (ref2 = event.detail) != null ? ref2.alias : void 0;
                        // 如果該事件已經被移除則停止後續的反應。
                        if (this.$events[eventName] === void 0) {
                            return;
                        }
                        // 將被觸發的事件裡面的所有處理程式全部呼叫一次。
                        results = [];
                        for (alias in this.$events[eventName]) {
                            if (calledAlias && calledAlias !== alias) {
                                continue;
                            }
                            index = this.$events[eventName][alias].length;
                            results.push((function () {
                                var results1;
                                results1 = [];
                                while (index--) {
                                    if (this.$events[eventName] === void 0) {
                                        continue;
                                    }
                                    if (this.$events[eventName][alias] === void 0) {
                                        continue;
                                    }
                                    single = this.$events[eventName][alias][index];
                                    // 設置事件的上下文。
                                    context = this;
                                    // 如果這個事件有選擇器的話，則使用該選擇器為主。
                                    if (single.selector !== void 0) {
                                        selector = single.selector;
                                        closest = ts(event.target).closest(selector);
                                        // 如果找不到指定選擇棄的元素，就不要觸發此事件。
                                        if (closest.length === 0) {
                                            continue;
                                        } else {
                                            // 替換上下文為選擇器元素。
                                            context = closest.get();
                                        }
                                    }
                                    // 將事件預資料放入事件中供處理函式取得。
                                    event.data = single.data;
                                    if (hasArgs) {
                                        single.func.call(context, event, ...event.detail.args);
                                    } else {
                                        single.func.call(context, event);
                                    }
                                    // 如果這個程式只能被呼叫一次就在處理程式呼叫後移除。
                                    if (single.once === true) {
                                        results1.push(this.$events[eventName][alias].splice(index, 1));
                                    } else {
                                        results1.push(void 0);
                                    }
                                }
                                return results1;
                            }).call(this));
                        }
                        return results;
                    });
                }
                // 將新的事件處理程式註冊到事件清單中。
                // 如果有別名，就不要推送到匿名陣列中，我們替這個別名另開物件。
                if (hasAlias) {
                    if (this.$events[eventName][eventAlias] === void 0) {
                        this.$events[eventName][eventAlias] = [];
                    }
                    return this.$events[eventName][eventAlias].push({
                        func: handler,
                        selector: selector,
                        data: data,
                        once: options != null ? options.once : void 0
                    });
                } else {
                    // 如果沒有，就照常推進匿名陣列中。
                    return this.$events[eventName].anonymous.push({
                        func: handler,
                        selector: selector,
                        data: data,
                        once: options != null ? options.once : void 0
                    });
                }
            }, this);
        });
    };

    // bindOnce 綁定一次性的事件監聽器，當被觸發之後就會被移除。
    bindOnce = function (events, handler) {
        events = ts.helper.eventAlias(events);
        return this.each(function () {
            return ts(this).bindWithOptions(events, handler, {
                once: true
            });
        });
    };

    // unbind 註銷事件監聽器。
    unbind = function (events, handler) {
        if (events !== void 0) {
            events = ts.helper.eventAlias(events);
        }
        return this.each(function () {
            if ((events != null ? events[0] : void 0) === '(' && events[events.length - 1] === ')') {
                if (this !== window) {
                    return;
                }
                if (window.$media === void 0) {
                    return;
                }
                if (window.$media[events] === void 0) {
                    return;
                }
                switch (false) {
                    case handler === void 0:
                        window.$media[events].forEach((item, index) => {
                            if (handler === item.func) {
                                return window.$media[events].splice(index, 1);
                            }
                        });
                        break;
                    case handler !== void 0:
                        window.$media[events] = [];
                }
                return;
            }
            if (this.$events === void 0) {
                return;
            }
            if (events === void 0) {
                this.$events = {};
                return;
            }
            return events.split(' ').forEach((eventName) => {
                var alias, aliasName, event, hasAlias, isAlias, results;
                // 將事件名稱由中間的「.」切成兩半。
                event = eventName.split('.');
                // 如果事件開頭是「.」符號，表示這是個別名，不是事件名稱。
                isAlias = eventName[0] === '.';
                // 如果事件分切後有兩個項目，表示這個事件有別名。
                hasAlias = event.length === 2 && event[0] !== '';
                if (hasAlias || isAlias) {
                    // 如果有別名的話，取得別名。
                    aliasName = event[1];
                }
                // 如果此事件不是只有別名的話，取得事件名稱。
                eventName = !isAlias ? event[0] : void 0;
                switch (false) {
                    // 當有指定監聽函式時。
                    case !(handler !== void 0 && this.$events[eventName] !== void 0):
                        return this.$events[eventName].anonymous.forEach((item, index) => {
                            if (handler === item.func) {
                                return this.$events[eventName].anonymous.splice(index, 1);
                            }
                        });
                    // 當本事件名稱不僅是別名時。
                    case !(!isAlias && hasAlias && this.$events[eventName] !== void 0):
                        // 移除指定事件的別名監聽函式。
                        return delete this.$events[eventName][aliasName];
                    // 當僅有指定別名時。
                    case !(isAlias && !hasAlias):
                        // 移除所有與此別名有關的事件監聽器。
                        results = [];
                        for (event in this.$events) {
                            results.push((function () {
                                var results1;
                                results1 = [];
                                for (alias in this.$events[event]) {
                                    if (aliasName === alias) {
                                        results1.push(delete this.$events[event][aliasName]);
                                    } else {
                                        results1.push(void 0);
                                    }
                                }
                                return results1;
                            }).call(this));
                        }
                        return results;
                        break;
                    // 當僅有指定事件名稱時。
                    case this.$events[eventName] === void 0:
                        // 清空該事件的所有事件監聽器。
                        return delete this.$events[eventName];
                }
            }, this);
        });
    };

    // trigger 觸發指定事件。
    trigger = function (events) {
        var customArguments;
        events = ts.helper.eventAlias(events);
        customArguments = [].slice.call(arguments, 1);
        return this.each(function () {
            return events.split(' ').forEach((eventName) => {
                var alias, event, name;
                event = eventName.split('.');
                name = event[0];
                alias = event.length > 1 ? event[1] : null;
                event = new CustomEvent(name, {
                    detail: {
                        args: customArguments,
                        alias: alias
                    }
                });
                return this.dispatchEvent(event);
            });
        });
    };

    // emulate 在指定的秒數過後觸發指定事件，若已被觸發則不再次觸發。
    // 這能用以強迫讓某個事件發生。
    emulate = function (event, duration) {
        return this.each(function () {
            var called;
            called = false;
            ts(this).one(event, function () {
                return called = true;
            });
            return setTimeout(() => {
                if (!called) {
                    return ts(this).trigger(event);
                }
            }, duration);
        });
    };

    // getText 取得選擇器元素的內容文字。
    getText = function () {
        var ref;
        return (ref = this.get()) != null ? ref.innerText : void 0;
    };

    // setText 變更選擇器元素的內容文字。
    setText = function (text) {
        return this.each(function () {
            return this.innerText = text;
        });
    };

    // getValue 取得選擇器元素的值。
    getValue = function (value) {
        var ref;
        return (ref = this.get()) != null ? ref.value : void 0;
    };

    // setValue 變更選擇器元素的值。
    setValue = function (value) {
        return this.each(function () {
            return this.value = value;
        });
    };

    // getHTML 取得選擇器元素的 HTML。
    getHTML = function () {
        var ref;
        return (ref = this.get()) != null ? ref.innerHTML : void 0;
    };

    // setHTML 變更選擇器元素的 HTML。
    setHTML = function (html) {
        return this.each(function () {
            return this.innerHTML = html;
        });
    };

    // empty 將選擇器元素的內容清除，例如值或文字。
    empty = function () {
        return this.each(function () {
            if (this.value !== void 0) {
                this.value = null;
            }
            if (this.innerHTML !== void 0) {
                this.innerHTML = null;
            }
            if (this.innerText !== void 0) {
                return this.innerText = null;
            }
        });
    };

    // getProperty 取得選擇器元素的屬性，例如 `.src`、`.width`。
    getProperty = function (name) {
        var ref;
        return (ref = this.get()) != null ? ref[name] : void 0;
    };

    // setProperty 變更選擇器元素的屬性，例如 `.src`、`.width`。
    setProperty = function (name, value) {
        var key;
        if (typeof name === 'object') {
            for (key in name) {
                this.each(function () {
                    return this[key] = name[key];
                });
            }
            return this;
        } else {
            return this.each(function () {
                return this[name] = value;
            });
        }
    };

    // getData 取得選擇器元素的存放資料。
    getData = function (name) {
        var ref, ref1;
        return (ref = this.get()) != null ? (ref1 = ref.$data) != null ? ref1[name] : void 0 : void 0;
    };

    // setData 在選擇器元素中存放資料，類似 Attr 但頁面不可見。
    setData = function (name, value) {
        var key;
        if (typeof name === 'object') {
            for (key in name) {
                this.each(function () {
                    if (this.$data === void 0) {
                        this.$data = {};
                    }
                    return this.$data[key] = name[key];
                });
            }
            return this;
        } else {
            return this.each(function () {
                if (this.$data === void 0) {
                    this.$data = {};
                }
                return this.$data[name] = value;
            });
        }
    };

    // removeData 移除選擇器元素中的存放資料。
    removeData = function (name) {
        return this.each(function () {
            if (this.$data[name] != null) {
                return delete this.$data[name];
            }
        });
    };

    // hasTimer 確認是否有指定的計時器。
    hasTimer = function (name) {
        var ref, ref1;
        return ((ref = this.get(0)) != null ? (ref1 = ref.$timers) != null ? ref1[name] : void 0 : void 0) != null;
    };

    // getTimer 取得計時器內容。
    getTimer = function (name) {
        var ref, ref1;
        return (ref = this.get(0)) != null ? (ref1 = ref.$timers) != null ? ref1[name] : void 0 : void 0;
    };

    // setTimer 設置一個新的計時器。
    setTimer = function (options) {
        return setTimeout(() => {
            options = {
                ...{
                    name: '',
                    callback: function () { },
                    interval: 0,
                    looping: false,
                    visible: false
                }, ...options
            };
            return this.each(function () {
                var timer;
                if (this.$timers === void 0) {
                    this.$timers = {};
                }
                if (this.$timers[options.name] !== void 0) {
                    clearInterval(this.$timers[options.name].timer);
                }
                timer = () => {
                    var ref;
                    // 當設置有說明，頁面不可見的時候就不要繼續計時。
                    if (options.visible && document.hidden) {
                        return;
                    }
                    // 替計時器加上 10 毫秒。
                    this.$timers[options.name].passed += 10;
                    // 如果計時器的經過時間還不到使用者設定的時間
                    // 就返回而不要繼續執行。
                    if (this.$timers[options.name].passed < options.interval) {
                        return;
                    }
                    // 呼叫回呼函式。
                    options.callback();
                    // 如果要循環的話，就在計時器執行後重設時間即可。
                    if (options.looping) {
                        return this.$timers[options.name].passed = 0;
                    } else {
                        // 不然就移除計時器資訊。
                        return clearInterval((ref = this.$timers[options.name]) != null ? ref.timer : void 0);
                    }
                };
                // 移除在 DOM 元素內的這個計時器物件。
                //delete @$timers[options.name]

                // 在此元素內初始化計時器物件。
                return this.$timers[options.name] = {
                    timer: setInterval(timer, 10),
                    passed: 0,
                    callback: options.callback,
                    interval: options.interval,
                    looping: options.looping,
                    visible: options.visible,
                    initializer: timer,
                    paused: false
                };
            });
        }, 0);
    };

    // pauseTimer 暫停一個計時器。
    pauseTimer = function (name) {
        return this.each(function () {
            var ref;
            if (((ref = this.$timers) != null ? ref[name] : void 0) == null) {
                return;
            }
            // 清除計數計時器達到暫停效果。
            clearInterval(this.$timers[name].timer);
            // 表示暫停。
            return this.$timers[name].paused = true;
        });
    };

    // playTimer 重啟一個計時器。
    playTimer = function (name) {
        return this.each(function () {
            var ref;
            if (((ref = this.$timers) != null ? ref[name] : void 0) == null) {
                return;
            }
            if (!this.$timers[name].paused) {
                return;
            }
            // 重新初始化計數計時器來達到繼續的效果。
            this.$timers[name].timer = setInterval(this.$timers[name].initializer, 10);
            // 表示重新啟動。
            return this.$timers[name].paused = false;
        });
    };

    // removeTimer 移除一個計時器。
    removeTimer = function (name) {
        return this.each(function () {
            var ref;
            if (((ref = this.$timers) != null ? ref[name] : void 0) == null) {
                return;
            }
            // 清除計數計時器。
            clearInterval(this.$timers[name].timer);
            // 移除在 DOM 元素內的計時器物件。
            return delete this.$timers[name];
        });
    };

    // repaint 讓瀏覽器重繪元素。
    repaint = function () {
        return this.each(function () {
            return void (this.offsetHeight);
        });
    };

    // uniqueID 取得為此元素而產生的獨立編號，若無則建立。
    uniqueID = function () {
        var id;
        id = this.get(0).$uniqueID;
        if (id) {
            return id;
        }
        this.get(0).$uniqueID = (Math.random().toString(16) + '000000000').substr(2, 8);
        return this.get(0).$uniqueID;
    };

};
