import React from "react"

export default function SearchBar({ setSearchParam }) {

    return (
        <>
        <div>
            <label>
                Search:{" "}
                <input
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

