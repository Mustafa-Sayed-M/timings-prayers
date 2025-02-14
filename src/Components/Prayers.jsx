import moment from 'moment';
import React from 'react';
import Fajr from '../Images/prayers-icons/Fajr.png';
import Dhuhr from '../Images/prayers-icons/Dhuhr.png';
import Asr from '../Images/prayers-icons/Asr.png';
import Maghrib from '../Images/prayers-icons/Maghrib.png';
import Isha from '../Images/prayers-icons/Isha.png';

const prayerIcons = {
    Fajr,
    Dhuhr,
    Asr,
    Maghrib,
    Isha
};

const Prayer = ({ prayer }) => {
    return (
        <div className="prayer text-center flex items-center justify-between sm:justify-center gap-2 sm:flex-col text-nowrap  max-sm:border-b max-sm:border-b-gray-500  max-sm:w-full  max-sm:pb-2 max-sm:last-of-type:border-b-0">
            {/* Icon */}
            <img
                src={prayerIcons[prayer.name]}
                alt={prayer.name}
                width={45}
            />
            {/* Native Name */}
            <h2 className="font-semibold">{prayer.nativeName}</h2>
            {/* Time */}
            <p>{moment(prayer.time, "HH:mm").format("hh:mm A")}</p>
        </div>
    )
};

function Prayers({ timingsData }) {
    return (
        <div className="flex items-center justify-center gap-3 sm:gap-5 max-sm:flex-col">
            {timingsData.map((prayer, index) => (
                <Prayer prayer={prayer} key={index} />
            ))}
        </div>
    )
}

export default Prayers;