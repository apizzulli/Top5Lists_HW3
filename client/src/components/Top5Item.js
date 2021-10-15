import { React, useContext, useState } from "react";
import { GlobalStoreContext } from '../store'
/*
    This React component represents a single item in our
    Top 5 List, which can be edited or moved around.
    
    @author McKilla Gorilla
*/
function Top5Item(props) {
    const { store } = useContext(GlobalStoreContext);
    const [draggedTo, setDraggedTo] = useState(0);
    const [ editActive, setEditItemActive ] = useState(false);
    const [ text, setText ] = useState("");

    function toggleEdit(){
        let active = !editActive;
        setEditItemActive(active);
    }
    function handleUpdateText (event){
        setText(event.target.value);
    }

    function handleKeyPress(event) {
        if (event.code === "Enter") {
            let id = event.target.id.substring("item-".length);             
            store.changeListItem(id, event.target.value);
            toggleEdit();
        }
    }

    function handleDragStart(event) {
        event.dataTransfer.setData("item", event.target.id);
    }

    function handleDragOver(event) {
        event.preventDefault();
    }

    function handleDragEnter(event) {
        event.preventDefault();
        setDraggedTo(true);
    }

    function handleDragLeave(event) {
        event.preventDefault();
        setDraggedTo(false);
    }

    function handleDrop(event) {
        event.preventDefault();
        let target = event.target;
        let targetId = target.id;
        targetId = targetId.substring(target.id.indexOf("-") + 1);
        let sourceId = event.dataTransfer.getData("item");
        sourceId = sourceId.substring(sourceId.indexOf("-") + 1);
        setDraggedTo(false);

        // UPDATE THE LIST
        store.addMoveItemTransaction(sourceId, targetId);
    }

    let { index } = props;
    let itemClass = "top5-item";
    if (draggedTo) {
        itemClass = "top5-item-dragged-to";
    }
    if(store.isItemEditActive){
        itemClass = "top5-button-disabled";
    }
    let Top5Item = 
        <div
            id={'item-' + (index + 1)}
            className={itemClass}
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            draggable="true"
        >
            <input
                type="button"
                id={"edit-item-" + index + 1}
                className="list-card-button"
                onClick={toggleEdit}
                value={"\u270E"}
            />
            {props.text}
        </div>;
    if(editActive){
        Top5Item = 
                    <input
                        type='text'
                        id={'item-'+(index+1)}
                        className={itemClass}
                        onKeyPress={handleKeyPress}
                        onChange={handleUpdateText}
                        defaultValue={props.text}
                    >
                    </input>
    }
        return(
            Top5Item
        );
}

export default Top5Item;