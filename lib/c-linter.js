'use babel';

import CLinterView from './c-linter-view';
import { CompositeDisposable } from 'atom';

export default {

  cLinterView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.cLinterView = new CLinterView(state.cLinterViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.cLinterView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'c-linter:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.cLinterView.destroy();
  },

  serialize() {
    return {
      cLinterViewState: this.cLinterView.serialize()
    };
  },

  toggle() {
    console.log('CLinter was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
