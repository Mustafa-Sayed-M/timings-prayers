import moment from 'moment';
import React, { useEffect, useState } from 'react';

function NextPrayer({ nextPrayer }) {
    const [timeLeft, setTimeLeft] = useState("");
    useEffect(() => {
        const interval = setInterval(() => {
            const now = moment();
            const prayerTime = moment(`${moment().format("YYYY-MM-DD")} ${nextPrayer?.time}`);
            const duration = moment.duration(prayerTime.diff(now));
            // 
            const hours = duration.hours();
            const minutes = duration.minutes();
            const seconds = duration.seconds();
            setTimeLeft(`${hours} ساعات ${minutes} دقائق ${seconds} ثواني`);
        }, 0);

        return () => clearInterval(interval);
    }, [nextPrayer]);

    return (
        <div className="next-prayer text-center mb-10">
            <h1 className="font-semibold text-3xl my-2">{`صلاة ${nextPrayer?.nativeName}`}</h1>
            <p className="text-sm opacity-80">{timeLeft}</p>
        </div>
    );
}

export default NextPrayer;