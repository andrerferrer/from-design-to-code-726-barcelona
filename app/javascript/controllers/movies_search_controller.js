import { Controller } from "stimulus"

class moviesSearch extends Controller {
  // instance variables
  // @list = list
  // this.list
  static targets = ["list", 'input', 'form']

  // def initialize
  connect() {
    // console.log('hello from movies search controller');
    // console.log(this.listTarget);
  }

  refresh() {
    // get the input from the user
    const query = this.inputTarget.value;

    // BOTH ARE THE SAME
    // const url = `/movies?query=${query}`;
    const url = `${this.formTarget.action}?query=${query}`;

    const options = {
      headers: { accept: 'application/json' }
    }
    // make an ajax request to the server
    fetch(url, options)
      .then(res => res.json())
      .then((data) => {
        // console.log(data);
        // with the response, we will update the dom
        this.listTarget.outerHTML = data.html;
      })
  }
}

export default moviesSearch;
