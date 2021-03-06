// Generated by CoffeeScript 2.0.0-beta4
(function() {
  // ------------------------------------------------------------------------
  // 變數與常數設置
  // ------------------------------------------------------------------------

  // 模組名稱。
  var Attribute, ClassName, EVENT_NAMESPACE, Error, Event, Key, MODULE_NAMESPACE, NAME, Selector, Settings, ZIndex;

  NAME = 'dropdown';

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
    // 當選單的值被變動時所會呼叫的回呼函式。
    onChange: (value, text, element) => {},
    // 當多選選單多選了一個值所會呼叫的回呼函式。
    onAdd: (addedValue, addedText, addedElement) => {},
    // 當多選選單有一個值被移除時所會呼叫的回呼函式。
    onRemove: (removedValue, removedText, removedElement) => {},
    // 當使用者在多選選單自創了一個新的值所會呼叫的回呼函式。
    onLabelCreate: function(value, text) {
      return this;
    },
    
    // 當上述函式回傳下列物件時就修改元素。
    // {
    //     image   : ''
    //     icon    : ''
    //     emphasis: ''
    //     class   : ''
    //     element : @
    // }

    // 當使用者再多選選單移除了一個值所會呼叫的回呼函式。
    onLabelRemove: (value, text) => {},
    // 當使用者選取或按壓多選選單其中一個標籤時所會呼叫的回呼函式。
    onLabelSelect: (value, text, element) => {},
    // 當使用者在選單中輸入文字時所呼叫的回呼函式。
    onInput: () => {},
    // 當沒有相符搜尋內容所會呼叫的回呼函式。
    onNoResults: () => {},
    // 當選單展開時所呼叫的回呼函式，回傳 `false` 會避免選單顯示。
    onShow: () => {
      return true;
    },
    // 當選單隱藏時所呼叫的回呼函式，回傳 `false` 會避免選單顯示。
    onHide: () => {
      return true;
    },
    // 當使用者按下選單中其中一個選項時所呼叫的回呼函式。
    onSelect: (value, element) => {},
    // 用以初始化選單內容的選項，當這個選項是 `false` 而不是陣列的時候會從 HTML 架構初始化。
    values: false,
    // 是否允許重新選取，當設為 `true` 時，就算使用者選取了正在選取的值，仍會呼叫 `onChange`。
    allowReselection: false,
    // 是否允許使用者擅自新增選單值。
    allowAdditions: false,
    // 當使用者新增了值並移除後，是否要在選單中隱藏這個值。
    hideAdditions: true,
    // 搜尋的底限字數，超過此字數才會開始搜尋。
    minCharacters: 1,
    // 搜尋時的依據，可用：`both` 符合文字或值、`value` 符合值、`text` 符合文字。
    match: 'both',
    // 是否要進行全文搜尋，若為 `true` 只要搜尋的值符合選項文字其中即可；`false` 則會強迫搜尋的值必須和選項文字開頭相符。
    fullTextSearch: false,
    // 是否要使用標籤而非純計數文字。
    useLabels: true,
    // 多選選單是否使用標籤？若設置為 `false` 會以「已選擇 x 個」純文字替代標籤。
    useLabels: true,
    // 多選選單最多可以選擇幾個項目？設置為 `0` 表示無限。
    maxSelections: 0
  };

  // 事件名稱。
  Event = {
    CHANGE: `change${EVENT_NAMESPACE}`,
    ADD: `add${EVENT_NAMESPACE}`,
    REMOVE: `remove${EVENT_NAMESPACE}`,
    LABEL_CREATE: `labelcreate${EVENT_NAMESPACE}`,
    LABEL_REMOVE: `labelremove${EVENT_NAMESPACE}`,
    LABEL_SELECT: `labelselect${EVENT_NAMESPACE}`,
    INPUT: `input${EVENT_NAMESPACE}`,
    NO_RESULT: `noresult${EVENT_NAMESPACE}`,
    SHOW: `show${EVENT_NAMESPACE}`,
    HIDE: `hide${EVENT_NAMESPACE}`,
    SELECT: `select${EVENT_NAMESPACE}`,
    CLICK: `click${EVENT_NAMESPACE}`,
    ANIMATIONEND: `animationend${EVENT_NAMESPACE}`
  };

  // 樣式名稱。
  ClassName = {
    VISIBLE: 'visible',
    HIDDEN: 'hidden',
    ANIMATING: 'animating',
    DROPDOWN: 'dropdown',
    TEXT: 'text',
    ICON: 'icon',
    IMAGE: 'image',
    ITEM: 'item',
    MENU: 'menu',
    UPWARD: 'upward',
    DOWNWARD: 'downward',
    LEFTWARD: 'leftward',
    RIGHTWARD: 'rightward',
    SELECTION: 'selection',
    MULTIPLE: 'multiple',
    LABELS: 'labels',
    CLOSE: 'close',
    DEFAULT_LABEL: 'ts compact label',
    DEFAULT_BUTTON: 'ts tiny close button',
    FILTERED: 'filtered',
    PLACEHOLDER: 'placeholder',
    SELECTED: 'selected',
    ACTIVE: 'active',
    ADDITION_ITEM: 'addition item'
  };

  // 選擇器名稱。
  Selector = {
    OPTION: 'option',
    DROPDOWN: '.ts.dropdown',
    VISIBLE_DROPDOWN: '.ts.visible.dropdown',
    DEFAULT_BUTTON: '.ts.tiny.close.button',
    LABELS: '.labels',
    SELF_LABELS: ':scope > .labels',
    SEARCH: 'input.search',
    ITEM: '.item:not(.addition)',
    ACTIVE_ITEM: '.active.item',
    UNSELECTED_ITEM: '.item:not(.selected):not(.addition)',
    ACTIVE_ITEM_UNFILTERED: '.active.item:not(.filtered):not(.addition)',
    ITEM_NOT_FILTERED: '.item:not(.filtered):not(.addition)',
    FILTERED: '.filtered',
    TEXT: '.text',
    LABEL: '.labels .label',
    MESSAGE: '.message',
    MENU: '.menu',
    ADDITION_ITEM: '.addition.item',
    SELECT: 'select',
    SELECTED_ITEM: '.item.selected',
    BODY: 'body',
    SELECTABLE_OPTION: 'select option:not([selected]):not([value=""])',
    SPECIFIED_OPTION: (v) => {
      return `select option[value='${v}']`;
    },
    SPECIFIED_ITEM: (v) => {
      return `.menu .item[data-value='${v}']`;
    },
    SPECIFIED_LABEL: (v) => {
      return `.labels .label[data-value='${v}']`;
    }
  };

  // 鍵盤按鍵代號。
  Key = {
    ENTER: 13,
    BACKSPACE: 8,
    UP: 38,
    DOWN: 40,
    LEFT: 37,
    RIGHT: 39
  };

  // Z 索引
  ZIndex = {
    MENU: 9,
    ACTIVE: 10,
    HOVERED: 11
  };

  // 元素資訊標籤。
  Attribute = {
    VALUE: 'data-value'
  };

  // 錯誤訊息。
  Error = {};

  // ------------------------------------------------------------------------
  // 模組註冊
  // ------------------------------------------------------------------------
  ts.register({NAME, MODULE_NAMESPACE, Error, Settings}, ({$allModules, $this, element, debug, settings}) => {
    var $body, duration, id, module;
    // ------------------------------------------------------------------------
    // 區域變數
    // ------------------------------------------------------------------------
    $body = ts(Selector.BODY);
    id = $this.uniqueID();
    duration = 300;
    // ------------------------------------------------------------------------
    // 模組定義
    // ------------------------------------------------------------------------
    return module = {
      setup: {
        menu: (values) => {}
      },
      change: {
        values: (values) => {}
      },
      refresh: () => {},
      toggle: () => {
        if (module.is.visible()) {
          return module.hide();
        } else {
          return module.show();
        }
      },
      animate: {
        expand: (callback) => {
          module.set.zIndex(ZIndex.ACTIVE);
          return $this.removeClass(ClassName.HIDDEN).addClass(`${ClassName.VISIBLE} ${ClassName.ANIMATING}`).off(Event.ANIMATIONEND).one(Event.ANIMATIONEND, () => {
            if (callback != null) {
              return callback.call();
            }
          }).emulate(Event.ANIMATIONEND, duration);
        },
        contract: (callback) => {
          module.set.zIndex(ZIndex.MENU);
          return $this.removeClass(ClassName.VISIBLE).addClass(`${ClassName.HIDDEN} ${ClassName.ANIMATING}`).off(Event.ANIMATIONEND).one(Event.ANIMATIONEND, () => {
            if (callback != null) {
              return callback.call();
            }
          }).emulate(Event.ANIMATIONEND, duration);
        }
      },
      show: () => {
        if (module.is.visible()) {
          return;
        }
        if (module.trigger.show() === false) {
          return;
        }
        module.set.direction();
        return module.animate.expand(() => {
          if (module.is.visible()) {
            return $this.removeClass(ClassName.ANIMATING);
          }
        });
      },
      hide: () => {
        if (module.is.hidden()) {
          return;
        }
        if (module.trigger.hide() === false) {
          return;
        }
        module.set.direction();
        return module.animate.contract(() => {
          if (!module.is.hidden()) {
            return;
          }
          return $this.removeClass(`${ClassName.ANIMATING} ${ClassName.HIDDEN} ${ClassName.UPWARD} ${ClassName.DOWNWARD} ${ClassName.LEFTWARD} ${ClassName.RIGHTWARD}`);
        });
      },
      clear: () => {},
      hideOthers: () => {},
      restore: {
        defaults: () => {},
        default: {
          text: () => {},
          value: () => {}
        },
        placeholder: {
          text: () => {}
        }
      },
      save: {
        defaults: () => {}
      },
      set: {
        selected: (value) => {},
        exactly: (value) => {},
        text: (text) => {},
        value: (value) => {},
        active: () => {},
        visible: () => {},
        zIndex: (z) => {
          return $this.css('z-index', z);
        },
        direction: () => {
          var height, heightHalf, position, width, widthHalf;
          position = $this.rect();
          width = window.innerWidth;
          widthHalf = width / 2;
          height = window.innerHeight;
          heightHalf = height / 2;
          if (position.left < widthHalf && position.top < heightHalf) {
            return $this.addClass(`${ClassName.DOWNWARD} ${ClassName.RIGHTWARD}`);
          } else if (position.left < widthHalf && position.top > heightHalf) {
            return $this.addClass(`${ClassName.UPWARD} ${ClassName.RIGHTWARD}`);
          } else if (position.left > widthHalf && position.top > heightHalf) {
            return $this.addClass(`${ClassName.UPWARD} ${ClassName.LEFTWARD}`);
          } else if (position.left > widthHalf && position.top < heightHalf) {
            return $this.addClass(`${ClassName.DOWNWARD} ${ClassName.LEFTWARD}`);
          }
        }
      },
      remove: {
        selected: (value) => {}
      },
      get: {
        text: () => {},
        value: () => {},
        item: (value) => {},
        default: {
          text: () => {}
        },
        placeholder: {
          text: () => {}
        }
      },
      determine: {
        intent: () => {},
        select: {
          action: (text, value) => {}
        }
      },
      remove: {
        active: () => {},
        visible: () => {}
      },
      is: {
        selection: () => {},
        animated: () => {},
        visible: () => {
          return $this.hasClass(ClassName.VISIBLE);
        },
        hidden: () => {
          return !module.is.visible();
        }
      },
      listener: {
        body: (target) => {
          var isSelfChild;
          // Multiple Tag delete button
          // if $target.hasClass('close')
          //     return
          isSelfChild = $this.is(target) || $this.contains(target);
          if (!isSelfChild) {
            return module.hide();
          }
        }
      },
      trigger: {
        select: (event) => {
          var item, value;
          value = ts(event.target).attr(Attribute.VALUE);
          item = event.target;
          debug('發生 SELECT 事件', value);
          return settings.onSelect.call(element, value, item);
        },
        show: () => {
          debug('發生 SHOW 事件', element);
          return settings.onShow.call(element);
        },
        hide: () => {
          debug('發生 HIDE 事件', element);
          return settings.onHide.call(element);
        }
      },
      bind: {
        events: () => {
          $body.on(`${Event.CLICK}${id}`, (event) => {
            //debug '發生 CLICK 事件', element
            return module.listener.body(event.target);
          });
          $this.on(Event.CLICK, (event) => {
            //debug "發生 CLICK 事件", element
            return module.toggle();
          });
          return $this.on(Event.CLICK, Selector.ITEM, (event) => {
            //debug "發生 CLICK 事件", element
            return module.trigger.select(event);
          });
        }
      },
      // $this.on Event.CHANGE, (event, context) =>
      //     debug "發生 CHANGE 事件", context
      //     settings.onChange.call context, event

      // ------------------------------------------------------------------------
      // 基礎方法
      // ------------------------------------------------------------------------
      initialize: () => {
        debug('初始化下拉式選單', element);
        return module.bind.events();
      },
      instantiate: () => {
        return debug('實例化下拉式選單', element);
      },
      refresh: () => {
        return $allModules;
      },
      destroy: () => {
        debug('摧毀下拉式選單', element);
        $body.off(`${Event.CLICK}${id}`);
        $this.removeData(MODULE_NAMESPACE).off(EVENT_NAMESPACE);
        return $allModules;
      }
    };
  });

}).call(this);
