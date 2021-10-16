import jsTPS_Transaction from "../common/jsTPS.js"

export default class ChangeItem_Transaction extends jsTPS_Transaction {
    constructor(store, id, oldText, newText){
        super();
        this.id = id;
        this.store = store;
        this.oldText = oldText;
        this.newText = newText;
    }
    doTransaction(){
        this.store.changeListItem(this.id,this.newText);
    }
    undoTransaction(){
        this.store.changeListItem(this.id, this.oldText);
    }
}
