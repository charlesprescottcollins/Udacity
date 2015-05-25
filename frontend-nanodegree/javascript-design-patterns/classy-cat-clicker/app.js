var app = (function(document) {
'use strict()';
var model,
  view,
  ctrl;

model = {
  selCat: 0,
  cats: [
    {
      name: 'Cuddles',
      img: 'http://farm3.staticflickr.com/2240/2264113399_9d7562cbc0.jpg',
      clicks: 0
    },
    {
      name: 'Billy',
      img: 'https://farm4.staticflickr.com/3198/2451395499_09d44323c7_o.jpg',
      clicks: 0
    }
  ],
  addClick: function(){
    model.cats[model.selCat].clicks++;
  },
  getClicks: function() {
    return this.cats[this.selCat].clicks;
  },
  currentCat: function() {
    return this.cats[this.selCat];
  }
};

ctrl = {
  init: function() {
    view.init();
  },
  selectCat: function(num){
    model.selCat = num;
    view.renderCat();
  },
  clickCat: function(){
    model.addClick();
    view.updateClick();
  },
  getClicks: function() {
    return model.getClicks();
  },
  getCat: function() {
    return model.currentCat();
  }
};

view = {
  init: function() {
    this.list = document.getElementById('buttons');
    this.cat = document.getElementById('cat');

    view.renderList();
    view.renderCat();
  },
  renderList: function() {
    var listFrag = document.createDocumentFragment();

    for (var i = 0, len = model.cats.length; i < len; i++) {
      var btn = document.createElement('button');
      btn.innerHTML = model.cats[i].name;
      btn.idx = i;
      listFrag.appendChild(btn);
    }
    this.list.appendChild(listFrag);
    view.bindButtons();
  },
  bindButtons: function() {
    this.list.addEventListener('click', function(ev){
      if(ev.target && ev.target.nodeName === 'BUTTON') {
        ctrl.selectCat(ev.target.idx);
      }
    });
  },
  renderCat: function() {
    var catFrag = document.createDocumentFragment(),
      cat = ctrl.getCat(),
      name,
      img,
      click,
      count;

    this.cat.innerHTML = '';

    name = document.createElement('div');
    name.innerHTML = cat.name;
    catFrag.appendChild(name);

    img = document.createElement('img');
    img.src = cat.img;
    catFrag.appendChild(img);

    click = document.createElement('div');
    click.innerHTML = 'Clicks: ';

    count = document.createElement('span');
    count.id = 'count';
    count.innerHTML = cat.clicks;
    click.appendChild(count);
    catFrag.appendChild(click);

    this.cat.appendChild(catFrag);
    view.bindCat(img);
  },
  bindCat: function(img) {
     img.addEventListener('click', function() {

       ctrl.clickCat();
     });
  },
  updateClick: function() {
    document.getElementById('count').innerHTML = ctrl.getClicks();
  }

};

// start app
ctrl.init();

// expose methods
// return {
//   selectCat: ctrl.selectCat
// };

})(document);
