import React from 'react';
import './Rank.css';


const Rank = ({ name, entries }) => {
    return (
        <div>
			<div className="user-rank">
				{`${name}, your current rank is`}
			</div>
			<div className="user-rank">
				{`#${entries}`}
			</div>
		</div>

    );
}

export default Rank;