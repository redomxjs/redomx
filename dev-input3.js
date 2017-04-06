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
    <div @el>
      <hr>
      <ul @list style="background-color: red;" r-for="(item, idx) in this.items" r-for-id="id">
        <li @el>
         {{ 'Hallo ' + idx + ': ' + item.text}}
        </li>
      </ul>
      <div r-raw>
        <strong @el>Some {{ raw }} meat</strong>
      </div>
      <button onclick="this.addItem()">Add</button>
    </div>
  }
  addItem () {
    this.items.push({ text: 'One more', id: this.items.length + 1 })
    this.update()
  }
}
