import React from "react";

const Rank = ({name, entries}) => {
    console.log(entries);
    return (
        <div className="pa5">
            <div className="white f3">
                {`${name}, your current entry entries is...`}
            </div>
            <div className="white f1">
                {`${entries}`}
            </div>
        </div>
    );
}

export default Rank;