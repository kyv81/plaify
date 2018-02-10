import tabs from './modules/tabs';
import slider from './modules/slider';
import search from './modules/search';

const App = {
  tabs: function() {
    return tabs();
  },
  slider: function() {
    return slider();
  },
  search: function() {
    return search();
  }
};

App.tabs();
App.slider();
App.search();