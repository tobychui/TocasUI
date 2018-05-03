// Generated by CoffeeScript 2.0.0-beta4
(function() {
  // ------------------------------------------------------------------------
  // 變數與常數設置
  // ------------------------------------------------------------------------

  // 模組名稱。
  var Attribute, ClassName, EVENT_NAMESPACE, Error, Event, MODULE_NAMESPACE, Metadata, NAME, Position, Selector, Settings, Status, duration;

  NAME = 'popup';

  // 模組事件鍵名。
  EVENT_NAMESPACE = `.${NAME}`;

  // 模組命名空間。
  MODULE_NAMESPACE = `module-${NAME}`;

  // 模組設定。
  Settings = {
    // 消音所有提示，甚至是錯誤訊息。
    silent: false,
    // 顯示除錯訊息。
    debug: true,
    // 監聽 DOM 結構異動並自動重整快取。
    observeChanges: true,
    // 欲使用的彈出式訊息元素選擇器（如果已經有先建立好的話），`false` 的話則是即時產生。
    popup: false,
    // 同時是否僅能有一個彈出式訊息出現在螢幕上。
    exclusive: false,
    // 彈出式訊息的邊界元素，彈出式訊息會試圖不要超過這個元素。
    boundary: 'body',
    // 即時產生的彈出式訊息應該要被擺置在哪個元素內。
    context: 'body',
    // 此彈出式訊息偵測畫面是否有捲動的元素選擇器，如果指定元素有捲動事件則會自動隱藏此彈出式訊息。
    scrollContext: 'body',
    // 彈出式訊息出現的位置，分別是 `垂直 水平`（如：`top left`、`bottom right`）。
    position: 'auto',
    // 是否要將彈出式訊息產生在目標元素的節點後，這讓使用者能在 CSS 選擇器中以 `.elem + .popup` 方便樣式更改。
    inline: false,
    // 欲觸發彈出式訊息的事件，如：`click`、`hover`、`focus`。
    on: 'hover',
    // 觸發的延遲毫秒數。
    delay: {
      // 欲顯示彈出式訊息前所需的毫秒數。
      show: 50,
      // 隱藏彈出式訊息前所等待的毫秒數。
      hide: 0
    },
    // 過場動畫。
    transition: 'fade',
    // 過場動畫的演繹毫秒時間。
    duration: 200,
    // 游標是否能在彈出式訊息遊走，如：導覽式彈出選單。
    hoverable: false,
    // 是否能在點擊彈出式訊息以外的地方自動關閉。
    closable: true,
    // 是否要在指定捲動時自動隱藏此彈出式訊息。
    hideOnScroll: 'auto',
    // 目標元素選擇器，彈出式訊息會以這個元素為主。
    target: false,
    // 欲套用的樣式名稱，以空白分隔。
    variation: false,
    // 內容純文字。
    content: false,
    // 標題純文字。
    title: false,
    // 彈出式訊息的 HTML 內容，如果採用此屬性則會忽略 `content` 與 `title`。
    html: false,
    // 當彈出式訊息被建立時所會呼叫的回呼函式。
    onCreate: () => {},
    // 當彈出式訊息不再被需要且從頁面上移除時所會呼叫的回呼函式。
    onRemove: () => {},
    // 當彈出式訊息開始顯示時所會呼叫的回呼函式，回傳 `false` 將會停止顯示。
    onShow: () => {
      return true;
    },
    // 當彈出式訊息動畫結束並顯示在畫面上時所會呼叫的回呼函式。
    onVisible: () => {},
    // 當彈出式訊息開始消失時所會呼叫的回呼函式，回傳 `false` 將會避免消失。
    onHide: () => {
      return true;
    },
    // 當彈出式訊息已經完全消失時所會呼叫的回呼函式。
    onHidden: () => {},
    // 當彈出式訊息無法在畫面上產生或放置（不合適尺寸）時所會呼叫的回呼函式。
    onUnplaceable: () => {}
  };

  // 事件名稱。
  Event = {
    CREATE: `create${EVENT_NAMESPACE}`,
    REMOVE: `remove${EVENT_NAMESPACE}`,
    SHOW: `show${EVENT_NAMESPACE}`,
    VISIBLE: `visible${EVENT_NAMESPACE}`,
    HIDE: `hide${EVENT_NAMESPACE}`,
    HIDDEN: `hidden${EVENT_NAMESPACE}`,
    UNPLACEABLE: `unplaceable${EVENT_NAMESPACE}`,
    CLICK: `click${EVENT_NAMESPACE}`,
    FOCUS: `focus${EVENT_NAMESPACE}`,
    MOUSEMOVE: `mousemove${EVENT_NAMESPACE}`,
    MOUSEENTER: `mouseenter${EVENT_NAMESPACE}`,
    MOUSELEAVE: `mouseleave${EVENT_NAMESPACE}`,
    MOUSEOUT: `mouseout${EVENT_NAMESPACE}`,
    ANIMATIONEND: 'animationend'
  };

  // 樣式名稱。
  ClassName = {
    TOP: 'top',
    LEFT: 'left',
    RIGHT: 'right',
    BOTTOM: 'bottom',
    CENTER: 'center',
    VISIBLE: 'visible',
    ANIMATING: 'animating',
    HIDDEN: 'hidden',
    CUSTOM: 'custom'
  };

  
  Position = {
    AUTO: 'auto',
    TOP: 'top',
    BOTTOM: 'bottom',
    LEFT: 'left',
    RIGHT: 'right',
    CENTER: 'center',
    TOP_LEFT: 'top left',
    TOP_CENTER: 'top center',
    TOP_RIGHT: 'top right',
    BOTTOM_LEFT: 'bottom left',
    BOTTOM_CENTER: 'bottom center',
    BOTTOM_RIGHT: 'bottom right',
    RIGHT_TOP: 'right top',
    RIGHT_CENTER: 'right center',
    RIGHT_BOTTOM: 'right bottom',
    LEFT_TOP: 'left top',
    LEFT_CENTER: 'left center',
    LEFT_BOTTOM: 'left bottom'
  };

  
  Status = {
    VISIBLE: 'visible',
    HIDDEN: 'hidden'
  };

  
  Metadata = {
    POSITION: 'position'
  };

  // 選擇器名稱。
  Selector = {
    BODY: 'body'
  };

  
  Attribute = {
    POSITION: 'data-popup-position'
  };

  // 錯誤訊息。
  Error = {};

  // 過場動畫毫秒。
  duration = 200;

  // ------------------------------------------------------------------------
  // 模組註冊
  // ------------------------------------------------------------------------
  ts.register({NAME, MODULE_NAMESPACE, Error, Settings}, ({$allModules, $this, element, debug, settings}) => {
    var $body, $boundary, $popup, boundary, module, offset;
    // ------------------------------------------------------------------------
    // 區域變數
    // ------------------------------------------------------------------------
    $body = ts(Selector.BODY);
    $popup = ts();
    $boundary = ts();
    boundary = null;
    offset = 20;
    // ------------------------------------------------------------------------
    // 模組定義
    // ------------------------------------------------------------------------
    return module = {
      show: (callback) => {
        if (module.is.animating()) {
          return;
        }
        if (module.is.visible()) {
          return;
        }
        module.animate.show(() => {
          module.set.animating(false);
          if (callback != null) {
            return callback.call();
          }
        });
        return $allModules;
      },
      hide: (callback) => {
        if (module.is.animating()) {
          return;
        }
        if (module.is.hidden()) {
          return;
        }
        module.animate.hide(() => {
          module.set.animating(false);
          if (callback != null) {
            return callback.call();
          }
        });
        return $allModules;
      },
      hideAll: () => {},
      get: {
        popup: () => {
          return $popup.get();
        },
        status: () => {
          return $this.data(Metadata.STATUS);
        },
        distance: () => {
          var bottom, boundaryBottom, boundaryHeight, boundaryLeft, boundaryRect, boundaryRight, boundaryTop, boundaryWidth, left, rect, right, top;
          rect = $this.rect();
          boundaryRect = $boundary.rect();
          boundaryTop = boundaryRect.top;
          boundaryLeft = boundaryRect.left;
          boundaryBottom = boundaryRect.bottom;
          boundaryHeight = boundaryRect.height;
          boundaryWidth = boundaryRect.width;
          boundaryRight = boundaryRect.right;
          if ($boundary.is('body')) {
            boundaryTop = 0;
            boundaryLeft = 0;
            boundaryBottom = 0;
            boundaryWidth = boundary.clientWidth;
            boundaryHeight = boundary.clientHeight;
            boundaryRight = 0;
          }
          top = rect.top - boundaryTop;
          left = rect.left - boundaryLeft;
          right = (boundaryLeft + boundaryWidth) - (rect.left + rect.width);
          bottom = (boundaryTop + boundaryHeight) - (rect.top + rect.height);
          if ($boundary.is('body')) {
            right = boundaryWidth - (rect.left + rect.width);
            bottom = boundaryHeight - (rect.top + rect.height);
          }
          return {
            top: top,
            left: left,
            right: right,
            bottom: bottom
          };
        },
        position: () => {
          return $popup.attr(Attribute.POSITION);
        }
      },
      calculate: {
        popup: {
          position: () => {
            var bottom, bottomCenterOK, bottomLeftOK, bottomRightOK, left, leftCenterOK, popupHeight, popupRect, popupWidth, position, rect, right, rightCenterOK, top, topCenterOK, topLeftOK, topRightOK;
            ({top, left, right, bottom} = module.get.distance());
            rect = $this.rect();
            popupRect = $popup.rect();
            popupWidth = popupRect.width;
            popupHeight = popupRect.height;
            position = '';
            topCenterOK = top > popupHeight && right > popupWidth / 2 && left > popupWidth / 2;
            topLeftOK = top > popupHeight && left < popupWidth;
            topRightOK = top > popupHeight && right < popupWidth;
            bottomCenterOK = bottom > popupHeight && right > popupWidth / 2 && left > popupWidth / 2;
            bottomLeftOK = bottom > popupHeight && left < popupWidth;
            bottomRightOK = bottom > popupHeight && right < popupWidth;
            leftCenterOK = (top < popupHeight || bottom < popupHeight) && left > popupWidth;
            rightCenterOK = (top < popupHeight || bottom < popupHeight) && right > popupWidth;
            switch (false) {
              // OVERWRITE IF SETTING
              case !topCenterOK:
                position = Position.TOP_CENTER;
                break;
              case !topLeftOK:
                position = Position.TOP_LEFT;
                break;
              case !topRightOK:
                position = Position.TOP_RIGHT;
                break;
              case !bottomCenterOK:
                position = Position.BOTTOM_CENTER;
                break;
              case !bottomLeftOK:
                position = Position.BOTTOM_LEFT;
                break;
              case !bottomRightOK:
                position = Position.BOTTOM_RIGHT;
                break;
              case !leftCenterOK:
                position = Position.LEFT_CENTER;
                break;
              case !rightCenterOK:
                position = Position.RIGHT_CENTER;
            }
            $popup.removeAttr('style');
            top = element.offsetTop;
            left = element.offsetLeft;
            console.log(position, top, left);
            switch (position) {
              case Position.TOP_CENTER:
                $popup.css({
                  left: left + rect.width / 2,
                  top: top - popupRect.height // - offset
                });
                break;
              case Position.TOP_LEFT:
                $popup.css({
                  left: left,
                  top: top - popupRect.height // - offset
                });
                break;
              case Position.TOP_RIGHT:
                $popup.css({
                  left: left + rect.width,
                  top: top - popupRect.height // - offset
                });
                break;
              case Position.BOTTOM_CENTER:
                $popup.css({
                  left: left + rect.width / 2,
                  top: top + rect.height // + offset
                });
                break;
              case Position.BOTTOM_LEFT:
                $popup.css({
                  left: left,
                  top: top + rect.height // + offset
                });
                break;
              case Position.BOTTOM_RIGHT:
                $popup.css({
                  right: left + rect.width,
                  top: top + rect.height // + offset
                });
                break;
              case Position.LEFT_CENTER:
                $popup.css({
                  left: left - popupRect.width,
                  top: top + rect.height / 2 - popupRect.height / 2
                });
                break;
              case Position.RIGHT_CENTER:
                $popup.css({
                  left: left + rect.width, // + offset
                  top: top + rect.height / 2 - popupRect.height / 2
                });
            }
            return module.set.position(position);
          }
        }
      },
      toggle: () => {},
      change: {
        title: (title) => {},
        content: (content) => {},
        html: (html) => {
          return $popup.html(html);
        }
      },
      animate: {
        show: (callback) => {
          return $popup.addClass(`${ClassName.VISIBLE} ${ClassName.ANIMATING}`).off(Event.ANIMATIONEND).one(Event.ANIMATIONEND, () => {
            if (callback != null) {
              return callback.call();
            }
          }).emulate(Event.ANIMATIONEND, duration);
        },
        hide: (callback) => {
          return $popup.removeClass(ClassName.VISIBLE).addClass(ClassName.ANIMATING).one(Event.ANIMATIONEND, () => {
            if (callback != null) {
              return callback.call();
            }
          }).emulate(Event.ANIMATIONEND, duration);
        }
      },
      is: {
        visible: () => {
          return $popup.hasClass(ClassName.VISIBLE);
        },
        hidden: () => {
          return !module.is.visible();
        },
        animating: () => {
          return $popup.hasClass(ClassName.ANIMATING);
        },
        hoverable: () => {
          return settings.hoverable === true;
        }
      },
      exists: () => {},
      repaint: () => {
        return $popup.repaint();
      },
      reposition: () => {},
      set: {
        position: (position) => {
          $this.data(Metadata.POSITION, position);
          return $popup.attr(Attribute.POSITION, position);
        },
        coordinate: (x, y) => {
          return $popup.css({
            top: x,
            left: y
          });
        },
        width: (width) => {
          return $popup.css({
            width: width
          });
        },
        status: (value) => {
          return $this.data(Metadata.STATUS, value);
        },
        animating: (value) => {
          if (value) {
            return $popup.addClass(ClassName.ANIMATING);
          } else {
            return $popup.removeClass(ClassName.ANIMATING);
          }
        }
      },
      remove: {
        popup: () => {}
      },
      trigger: () => {},
      bind: {
        events: () => {
          return $body.on(Event.MOUSEMOVE, (event) => {
            var $pointElement, pointElement, popupElement, popupRect, rect;
            if (!$popup.exists()) {
              return;
            }
            rect = $this.rect();
            $pointElement = ts.fromPoint(event.clientX, event.clientY);
            pointElement = $pointElement.get();
            popupElement = $popup.get();
            popupRect = $popup.rect();
            if ($this.is(pointElement)) {
              if (module.is.animating()) {
                return;
              }
              if (module.is.visible()) {
                return;
              }
              module.show();
              module.calculate.popup.position();
              return;
            }
            if ($this.is(popupElement)) {
              return;
            }
            if ($popup.contains(pointElement)) {
              return;
            }
            //if event.clientY > rect.top - 14 and event.clientY < popupRect.bottom + 14 and event.clientX < popupRect.right and #event.clientX > popupRect.left
            //    return
            return module.hide();
          });
        }
      },
      // ------------------------------------------------------------------------
      // 基礎方法
      // ------------------------------------------------------------------------
      initialize: () => {
        var $next;
        debug('初始化彈出式訊息', element);
        $next = $this.next();
        if ($next.is('.ts.popup')) {
          $popup = $next;
        }
        $boundary = $this.closest(settings.boundary);
        boundary = $boundary.get();
        module.set.status(Status.HIDDEN);
        return module.bind.events();
      },
      //module.set.position settings.position
      instantiate: () => {
        return debug('實例化彈出式訊息', element);
      },
      refresh: () => {
        return $allModules;
      },
      destroy: () => {
        debug('摧毀彈出式訊息', element);
        $this.removeData(MODULE_NAMESPACE).off(EVENT_NAMESPACE);
        return $allModules;
      }
    };
  });

}).call(this);
