import momentHijri from 'moment-hijri';
import React from 'react';
import Moment from 'react-moment';

function DateInfo() {
    return (
        <div className="date-info flex items-center justify-between mb-10">
            {/* Clock */}
            <div className="clock text-lg font-bold">
                <Moment format="hh:mm:ss A" interval={100} locale="ar" />
            </div>
            {/* Hijri Date */}
            <div className="date text-lg font-bold">
                {momentHijri().locale("ar-SA").format("iD iMMMM iYYYY")} هـ
            </div>
        </div>
    )
}

export default DateInfo;