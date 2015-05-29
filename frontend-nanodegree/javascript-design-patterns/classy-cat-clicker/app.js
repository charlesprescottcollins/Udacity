var app = (function(document) {
'use strict()';
var model,
  view,
  ctrl;

model = {
  // TODO: add localStorage feature to keep cat data and clicks between sessions
  // TODO: add admin panel to add or change cat data
  selCat: 0,
  cats: [
    {
      name: 'The Widow',
      img: 'img/the_widow.jpg',
      imageAttribution: 'http://en.wikipedia.org/wiki/Kitsch#/media/File:The_Widow_%28Boston_Public_Library%29.jpg',
      alt: 'The Widow, kitsch example of late 19th century popular lithograph of a humorous painting by Frederick Dielman',
      clicks: 0
    },
    {
      name: 'Billy',
      img: 'img/Ms_Catililly.jpg',
      imageAttribution: 'http://en.wikipedia.org/wiki/Lolcat#/media/File:Harry_Whittier_Frees_-_What%27s_Delaying_My_Dinner.jpg',
      alt: 'A 1905 postcard of a kitten in a small chair with the caption "What\'s delaying my dinner"',
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
  },
  getAllCats: function() {
    return model.cats;
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
    var cats = ctrl.getAllCats();
    for (var i = 0, len = cats.length; i < len; i++) {
      var btn = document.createElement('button');
      btn.innerHTML = cats[i].name;
      btn.idx = i;
      listFrag.appendChild(btn);
    }
    this.list.appendChild(listFrag);
    view.bindButtons();
  },
  bindButtons: function() {
    // delegate to parent elment, listen for button click
    this.list.addEventListener('click', function(ev){
      if(ev.target && ev.target.nodeName === 'BUTTON') {
        ctrl.selectCat(ev.target.idx);
      }
    });
  },
  renderCat: function() {
    // TODO: this builds the entire cat image and binds event every time the cat
    // changes. The basic image structure could be built in the initial html and
    // updated instead, but that may require more DOM hits to update. I

    var catFrag = document.createDocumentFragment(),
      cat = ctrl.getCat(),
      name,
      img,
      click,
      count;

    // TODO: avoid the two dom hits of clear / fill, maybe try to replace in one
    // operation

    // clear the current cat
    this.cat.innerHTML = '';

    name = document.createElement('div');
    name.innerHTML = cat.name;
    catFrag.appendChild(name);

    img = document.createElement('img');
    img.src = cat.img;
    img.title = '(C)attribution: ' + cat.imageAttribution;
    img.alt = cat.alt;
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
    // TODO: this is assigned every time the cat changes, it should be bound once
    // and delegated
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
