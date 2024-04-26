"use client"
import React, { useEffect, useState } from 'react'
import { TwoPoints } from '../../svg'

function Timer({ endDate }) {
    const [timeLeft, setTimeLeft] = useState({ hours: '00', minutes: '00', seconds: '00' });

    useEffect(() => {
        const interval = setInterval(() => {
            const now = new Date();
            const difference = endDate - now;

            if (difference <= 0) {
                clearInterval(interval);
                return;
            }

            let seconds = Math.floor((difference / 1000) % 60);
            let minutes = Math.floor((difference / (1000 * 60)) % 60);
            let hours = Math.floor((difference / (1000 * 60 * 60)) % 24);

            hours = hours.toString().padStart(2, "0");
            minutes = minutes.toString().padStart(2, "0");
            seconds = seconds.toString().padStart(2, "0");

            setTimeLeft({ hours, minutes, seconds });
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="main__sale-time">
            <p>{timeLeft.hours}</p>
            <span>
                <TwoPoints />
            </span>
            <p>{timeLeft.minutes}</p>
            <span>
                <TwoPoints />
            </span>
            <p>{timeLeft.seconds}</p>
        </div>
    );
};

export default Timer