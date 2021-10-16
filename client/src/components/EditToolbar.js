import { useContext } from 'react'
import { GlobalStoreContext } from '../store'
import { useHistory } from 'react-router-dom'
/*
    This toolbar is a functional React component that
    manages the undo/redo/close buttons.
    
    @author McKilla Gorilla
*/
function EditToolbar() {
    const { store } = useContext(GlobalStoreContext);
    const history = useHistory();

    let enabledButtonClass = "top5-button";
    function handleUndo() {
        store.undo();
    }
    function handleRedo() {
        store.redo();
    }
    function handleClose() {
        history.push("/");
        store.closeCurrentList();
    }
    
    let closeButtonClass;
    let undoClass;
    let redoClass;
    if(store.currentList)
        closeButtonClass="top5-button";
    else
        closeButtonClass="top5-button-disabled";
    
    if(store.undoStackSize > 0 && store.closeCurrentList)
        undoClass="top5-button";
    else
        undoClass="top5-button-disabled";
    if(store.redoStackSize>0 && store.closeCurrentList)
        redoClass="top5-button";
    else
        redoClass="top5-button-disabled";
    return (
        <div id="edit-toolbar">
            <div
                //disabled={editStatus}
                id='undo-button'
                onClick={handleUndo}
                className={undoClass}>
                &#x21B6;
            </div>
            <div
                //disabled={editStatus}
                id='redo-button'
                onClick={handleRedo}
                className={redoClass}>
                &#x21B7;
            </div>
            <div
                //disabled={closeDisableStatus}
                id='close-button'
                onClick={handleClose}
                className={closeButtonClass}>
                &#x24E7;
            </div>
        </div>
    )
}

export default EditToolbar;