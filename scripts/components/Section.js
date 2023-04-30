export default class Section {
  constructor({renderer}, containerSelector) {
    // this._renderedItems = items;
    this._container = containerSelector;
    this._renderer = renderer;
  }
  renderItems(items) {
    items.forEach((item) => {
      this._renderer(item);
    });
  }
  addItem(element) {
    this._container.append(element);
  }
}
