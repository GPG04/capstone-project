import React from "react"
import "../App.css"

export default function SearchBar({ setSearchParam }) {

    return (
        <>
        <div id="searchBar">
            <label id="searchBarLabel">
                Search:{" "}
                <input
                id="searchBarInput"
                 type="text"
                 placeholder="search"
                 onChange={(e) =>
                   setSearchParam(e.target.value.toLowerCase()
                )}
                />
            </label>
        </div>
        </>
    )

}

export var itemsToDisplay

