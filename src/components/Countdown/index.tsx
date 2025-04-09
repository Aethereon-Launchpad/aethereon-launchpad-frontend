import { useState, useEffect } from 'react';
import { differenceInDays, differenceInHours, differenceInMinutes, isBefore } from 'date-fns';

export function CountdownTimer({ time, endTime, delayTime }: { time: string, endTime: string, delayTime: number }) {
    const calculateTimeLeft = () => {
        // Convert time to milliseconds (assuming it's in seconds)
        const startTime = parseInt(time) * 1000;
        const now = Date.now();

        // Ensure startTime is in the future
        if (startTime <= now) {
            // console.error('End time is in the past:', {
            //   startTime: new Date(startTime).toISOString(),
            //   now: new Date(now).toISOString()
            // });
            // console.error('End time is in the past:', {
            //   startTime: new Date(startTime).toISOString(),
            //   now: new Date(now).toISOString()
            // });
            return { days: 0, hours: 0, minutes: 0 };
        }

        // Calculate differences using date-fns
        const days = differenceInDays(startTime, now);
        const hours = differenceInHours(startTime, now) % 24;
        const minutes = differenceInMinutes(startTime, now) % 60;

        return { days, hours, minutes };
    };

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearInterval(timer);
    }, [time]);

    const startTimeUnix = parseInt(time) * 1000;
    const endTimeUnix = parseInt(endTime) * 1000;
    const delayTimeUnix = delayTime * 1000;
    const now = Date.now();

    // Check if we're in refund period (after endTime but before delayTime)
    if (isBefore(new Date(endTimeUnix), new Date(now)) && isBefore(new Date(now), new Date(delayTimeUnix))) {
        return <p className='text-white'>Refund Period</p>
    }

    if (isBefore(new Date(startTimeUnix), new Date()) && isBefore(new Date(endTimeUnix), new Date())) {
        return <p className='text-white'>Sale is Over</p>
    }

    // Check if voting is in progress
    if (timeLeft.days === 0 && timeLeft.hours === 0 && timeLeft.minutes === 0) {
        return <p className='text-white'>Sale in Progress</p>;
    }

    return (
        <p className='text-white'>
            {timeLeft.days}D {timeLeft.hours}H {timeLeft.minutes}M
        </p>
    );
}

export function PresaleCountdownTimer({ time }: { time: string | number }) {
    const calculateTimeLeft = () => {
        // Convert time to milliseconds (assuming it's in seconds)
        const startTime = parseInt(time as string) * 1000;
        const now = Date.now();

        // Ensure startTime is in the future
        if (startTime <= now) {
            // console.error('End time is in the past:', {
            //   startTime: new Date(startTime).toISOString(),
            //   now: new Date(now).toISOString()
            // });
            // console.error('End time is in the past:', {
            //   startTime: new Date(startTime).toISOString(),
            //   now: new Date(now).toISOString()
            // });
            return { days: 0, hours: 0, minutes: 0, seconds: 0 };
        }

        // Calculate differences using date-fns
        const days = differenceInDays(startTime, now);
        const hours = differenceInHours(startTime, now) % 24;
        const minutes = differenceInMinutes(startTime, now) % 60;
        const seconds = Math.floor((startTime - now) / 1000) % 60;

        return { days, hours, minutes, seconds };
    };

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearInterval(timer);
    }, [time]);


    return (
        <p className='text-white font-space flex gap-x-1 text-3xl'>
            <span className='text-white border-b pb-0.5'>{timeLeft.days}</span> :<span className='text-white border-b pb-0.5'>{timeLeft.hours}</span> :
            <span className='text-white border-b pb-0.5'>{timeLeft.minutes}</span> :
            <span className='text-white border-b pb-0.5'>{timeLeft.seconds}</span>
        </p>
    );
}