import React, { useContext, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import ListCard from './ListCard.js'
import { GlobalStoreContext } from '../store'
import DeleteModal from './DeleteModal'
import apis from '../api/index.js'
/*
    This React component lists all the top5 lists in the UI.
    
    @author McKilla Gorilla
*/

const ListSelector = () => {
    const { store } = useContext(GlobalStoreContext);
    store.history = useHistory();

    useEffect(() => {
        store.loadIdNamePairs();
    }, []);

    function handleClick (event){
        store.addEmptyList();
        console.log(store.newListCounter);
    }

    let listCard = "";
    if (store) {
        listCard = store.idNamePairs.map((pair) => (
            <ListCard
                key={pair._id}
                idNamePair={pair}
                selected={false}
            />
        ))
    }
    if(store.justDeleted){
        store.loadIdNamePairs();
        console.log("justDeleted=true");
    }

    return (
        <div id="top5-list-selector">
            <div id="list-selector-heading">
                <input
                    type="button"
                    id="add-list-button"
                    className="top5-button"
                    value="+" 
                    onClick = {handleClick}/>
                Your Lists
            </div>
            <div id="list-selector-list">
                {
                    listCard
                }
                <DeleteModal />
            </div>
        </div>)
}


export default ListSelector;
