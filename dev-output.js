class Test {
  constructor() {
    this.items = [
      { text: 'hey', id: 3 },
      { text: 'you', id: 1 },
      { text: 'crazy?', id: 2 }
    ]
    this.template()
  }
  template () {
    this.view = {}
    this.viewClasses = {}
    this.viewClasses[0] = class {
      constructor() {
        this.view = {}
        this.viewClasses = {}


        this.view[0] = redom.text(` `)
        this.view[1] = this.view['el'] = redom.el('li', {
        }, [
          this.view[2] = redom.text('')
        ])
        this.view[3] = redom.text(` `)

        this.el = this.view.el
      }
      update (item, idx) {
        this.view[2].textContent = 'Hallo ' + idx + ': ' + item.text
      }
    }
    this.viewClasses['ListItem'] = this.viewClasses[0]

    this.view[0] = this.view['el'] = redom.el('div', {
    }, [
      this.view[0] = redom.text(` `),
      this.view[1] = redom.el('hr', {
      }, [
      ]),
      this.view[2] = redom.text(` `),
      this.view[3] = this.view['list'] = (() => { var element = redom.list('ul', this.viewClasses[0], 'id'); redom.setAttr(element, { 
        'style': 'background-color: red;' }); return element })(),
      this.view[4] = redom.text(` `),
      this.view[5] = redom.el('div', {
        'innerHTML': '<strong @el="">Some {{ raw }} meat</strong>'
      }, [
      ]),
      this.view[6] = redom.text(` `),
      this.view[7] = redom.el('button', {
        'onclick': () => { this.addItem() }
      }, [
        this.view[8] = redom.text(` Add`)
      ]),
      this.view[9] = redom.text(` `)
    ])

    this.el = this.view.el
    this.update()
  }
  update () {
    this.view[3].update(this.items)
  }
  addItem () {
    this.items.push({ text: 'One more', id: this.items.length + 1 })
    this.update()
  }
}
