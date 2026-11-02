'use client';
import { useEffect, useState } from 'react';

const WEDDING_DATE = new Date(2027, 0, 23);

function daysUntilWedding(){
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return Math.round((WEDDING_DATE.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
}

export default function Countdown(){
    const [days, setDays] = useState<number | null>(null);

    useEffect(() => {
        setDays(daysUntilWedding());
        const timer = setInterval(() => setDays(daysUntilWedding()), 60 * 1000);
        return () => clearInterval(timer);
    }, []);

    let message = '';
    if (days !== null) {
        if (days > 1) message = `${days} days until the wedding!`;
        else if (days === 1) message = '1 day until the wedding!';
        else if (days === 0) message = 'Today is the wedding day!';
        else message = 'Just married!';
    }

    return(
        <p className='text-center font-[family-name:var(--font-EB-garamond)] italic text-[#0f1b39] text-[20px] sm:text-[48px] mt-2 min-h-[1.5em]'>
            {message}
        </p>
    );
}
