template (message, showSecond) {
  this.view = {}

  this.view[0] = this.view['el'] = Redom.el('div', {
  }, [
    this.view[1] = Redom.text(` `),
    this.view[2] = Redom.el('h1', {
      'class': 'message'
      , 'id': 'yay'
    }, [
      this.view[3] = Redom.text(` Redomify <3`)
    ]),
    this.view[4] = Redom.text(` `),
    this.view[5] = this.view['mypara'] = Redom.el('p', {
      'style': 'display:' + ((this.show)? 'block': 'none')
    }, [
      this.view[6] = Redom.text("Hello Redom " + this.counter + " People")
    ]),
    this.view[7] = Redom.text(` `),
    this.view[8] = ((showSecond)? Redom.el('p', {
    }, [
      this.view[9] = Redom.text(` `),
      this.view[10] = ((showSecond)? Redom.el('strong', {
      }, [
        this.view[11] = Redom.text("A second way " + this.counter + " People")
      ]): null),
      this.view[12] = Redom.text(` `)
    ]): null),
    this.view[13] = Redom.text(` `),
    this.view[14] = Redom.el('p', {
    }, [
      this.view[15] = Redom.text("A third way " + this.counter + " People")
    ]),
    this.view[16] = Redom.text(` `),
    this.view[17] = Redom.el('input', {
      'readony': ''
      , 'placeholder': 'hey'
    }, [
    ]),
    this.view[18] = Redom.text(` `),
    this.view[19] = Redom.svg('circle', {
      'r': '50'
      , 'cx': '25'
      , 'cy': '25'
    }, [
    ]),
    this.view[20] = Redom.text(` `),
    this.view[21] = Redom.svg('svg', {
    }, [
      this.view[22] = Redom.text(` `),
      this.view[23] = Redom.svg('circle', {
        'r': '50'
        , 'cx': '25'
        , 'cy': '25'
      }, [
      ]),
      this.view[24] = Redom.text(` `)
    ]),
    this.view[25] = Redom.text(` `),
    this.view[26] = Redom.el('div', {
    }, [
      this.view[27] = Redom.text(` `),
      this.view[28] = Redom.el('button', {
        'data-counter': this.counter
        , 'onclick': () => { this.count() }
      }, [
        this.view[29] = Redom.text(this.counter)
      ]),
      this.view[30] = Redom.text(` `),
      this.view[31] = Redom.el('button', {
        'onclick': () => { this.toggleShow() }
      }, [
        this.view[32] = Redom.text(` Toggle`)
      ]),
      this.view[33] = Redom.text(` `)
    ]),
    this.view[34] = Redom.text(` `)
  ])

  this.el = this.view.el
  this.update()
}
update () {
  Redom.setChildren(this.view[0], [
    this.view[1],
    this.view[2],
    this.view[4],
    this.view[5],
    this.view[7],
    this.view[8],
    this.view[13],
    ((this.show)? this.view[14]: null),
    this.view[16],
    this.view[17],
    this.view[18],
    this.view[19],
    this.view[20],
    this.view[21],
    this.view[25],
    this.view[26],
    this.view[34]
  ])
  Redom.setAttr(this.view[5], 'style', 'display:' + ((this.show)? 'block': 'none'))
  this.view[6].textContent = "Hello Redom " + this.counter + " People"
  if (this.view[8]) {
    if (this.view[10]) {
      this.view[11].textContent = "A second way " + this.counter + " People"
    }
  }
  this.view[15].textContent = "A third way " + this.counter + " People"
  Redom.setAttr(this.view[28], 'data-counter', this.counter)
  this.view[29].textContent = this.counter
}
