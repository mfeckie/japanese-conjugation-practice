import EmberRouter from '@embroider/router';
import config from 'japanese-conjugation-practice-ember/config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function () {
  this.route('form', { path: '/form/:form_type' });
});
