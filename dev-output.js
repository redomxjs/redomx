template (message, showSecond) {
  this.view = {}
  this.viewClasses = {}


  this.view[0] = this.view['el'] = redom.el('div', {
  }, [
    this.view[0] = redom.text(` `),
    this.view[1] = redom.el('h1', {
      'class': 'message'
      , 'id': 'yay'
    }, [
      this.view[2] = redom.text(` Redomify <3`)
    ]),
    this.view[3] = redom.text(` `),
    this.view[4] = this.view['mypara'] = redom.el('p', {
      'style': 'display:' + ((this.show)? 'block': 'none')
    }, [
      this.view[5] = redom.text('')
    ]),
    this.view[6] = redom.text(` `),
    this.view[7] = ((showSecond)? redom.el('p', {
    }, [
      this.view[8] = redom.text(` `),
      this.view[9] = ((showSecond)? redom.el('strong', {
      }, [
        this.view[10] = redom.text('')
      ]): null),
      this.view[11] = redom.text(` `)
    ]): null),
    this.view[12] = redom.text(` `),
    this.view[13] = redom.el('p', {
    }, [
      this.view[14] = redom.text('')
    ]),
    this.view[15] = redom.text(` `),
    this.view[16] = redom.el('input', {
      'readony': ''
      , 'placeholder': 'hey'
    }, [
    ]),
    this.view[17] = redom.text(` `),
    this.view[18] = redom.svg('circle', {
      'r': '50'
      , 'cx': '25'
      , 'cy': '25'
    }, [
    ]),
    this.view[19] = redom.text(` `),
    this.view[20] = redom.svg('svg', {
    }, [
      this.view[21] = redom.text(` `),
      this.view[22] = redom.svg('circle', {
        'r': '50'
        , 'cx': '25'
        , 'cy': '25'
      }, [
      ]),
      this.view[23] = redom.text(` `)
    ]),
    this.view[24] = redom.text(` `),
    this.view[25] = redom.el('div', {
    }, [
      this.view[26] = redom.text(` `),
      this.view[27] = redom.el('button', {
        'data-counter': this.counter
        , 'onclick': () => { this.count() }
      }, [
        this.view[28] = redom.text('')
      ]),
      this.view[29] = redom.text(` `),
      this.view[30] = redom.el('button', {
        'onclick': () => { this.toggleShow() }
      }, [
        this.view[31] = redom.text(` Toggle`)
      ]),
      this.view[32] = redom.text(` `)
    ]),
    this.view[33] = redom.text(` `)
  ])

  this.el = this.view.el
  this.update()
}
update () {
  redom.setChildren(this.view[0], [
    this.view[0],
    this.view[1],
    this.view[3],
    this.view[4],
    this.view[6],
    this.view[7],
    this.view[12],
    ((this.show)? this.view[13]: null),
    this.view[15],
    this.view[16],
    this.view[17],
    this.view[18],
    this.view[19],
    this.view[20],
    this.view[24],
    this.view[25],
    this.view[33]
  ])
  redom.setAttr(this.view[4], 'style', 'display:' + ((this.show)? 'block': 'none'))
  this.view[5].textContent = "Hello Redom " + this.counter + " People"
  if (this.view[7]) {
    if (this.view[9]) {
      this.view[10].textContent = "A second way " + this.counter + " People"
    }
  }
  this.view[14].textContent = "A third way " + this.counter + " People"
  redom.setAttr(this.view[27], 'data-counter', this.counter)
  this.view[28].textContent = this.counter
}
