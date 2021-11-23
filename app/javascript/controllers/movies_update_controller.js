import { Controller } from "stimulus"

export default class extends Controller {
  // instance variables
  // @list = list
  // this.list
  static targets = ["infos", 'form']

  // def initialize
  connect() {
    // console.log('hello from movies search controller');
    // console.log(this.formTarget);
    // console.log(this.infosTarget);
  }

  toggle() {
    this.formTarget.classList.remove('d-none');
    this.infosTarget.classList.add('d-none');
  }

  update(event) {
    event.preventDefault();
    // get the information from the user
    // make an ajax request to the server
    const url = this.formTarget.action;
    const options = {
      headers: { accept: 'text/plain' },
      method: 'PATCH',
      // FormData.new(@formTarget) in RUBY
      body: new FormData(this.formTarget)
    }
    fetch(url, options)
      .then(res => res.text())
      .then((data) => {
        this.element.outerHTML = data;
        // when we receive the response, we want to update the dom
      })
  }



};
