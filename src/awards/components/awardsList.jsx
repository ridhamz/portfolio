import React from 'react';
import AwardItem from './awardItem';
import img from '../../assets/awards/earthHack.jpg'
import img2 from '../../assets/awards/codingLand.jpg';
import img3 from '../../assets/awards/mcistic.jpg';
import './awardList.css';
const AwardsList = () => {

    const earth = "First prize winners of \" EarthHacks challenge 2019\" a competition organized by @GomyCode in partnership with the @unitedNation & @studentlifesmu & MSB🎓Happy to work with a team full of energy and creativity Plus_Plus ++ It was a great experience⚡❤️"
    const codingland= "Second prize winners of  \" Coding Land Hackathon 2019\""
    const codingLoft = "Second prize winners of  \" Coding Loft Hackathon 2019\" "
    return (
        <div className="award-list">
            <AwardItem
                description={earth}
                img={img}
            />
            <AwardItem
                description={codingland}
                img={img2}
            />
            <AwardItem
                description={codingLoft}
                img={img3}
            />
        </div>
    );
}

export default AwardsList;