"use client";
import React, { useEffect, useState } from "react";

const CountDown = () => {
  const [hours, setHours] = useState<number>(0);
  const [minutes, setMinutes] = useState<number>(0);
  const [seconds, setSeconds] = useState<number>(0);

  useEffect(() => {
    const calculateTimeRemaining = () => {
      const now = new Date();
      const target = new Date();
      target.setHours(22, 0, 0, 0); // Set to 10:00 PM of the same day

      if (now > target) {
        // If current time is past 10 PM, set target to next day's 10 PM
        target.setDate(target.getDate() + 1);
      }

      const difference = target.getTime() - now.getTime();

      const calculatedHours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const calculatedMinutes = Math.floor((difference / (1000 * 60)) % 60);
      const calculatedSeconds = Math.floor((difference / 1000) % 60);

      setHours(calculatedHours);
      setMinutes(calculatedMinutes);
      setSeconds(calculatedSeconds);
    };

    const interval = setInterval(() => {
      calculateTimeRemaining();
    }, 1000);

    // Clear interval on component unmount
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col font-hagrid">
      {/* count down timer */}
      <div className="uppercase flex flex-col md:flex-row w-full bg-black py-1 px-[15px] justify-center items-center gap-3 text-white">
        <p className="text-base font-bold">Offer ends tonight</p>

        <div className="text-xs font-bold flex gap-2 items-center">
          <div className={time_cont}>
            <h1>{hours.toString().padStart(2, "0")}</h1>
            <span className="font-normal">HRS</span>
          </div>
          <p className="text-white">:</p>
          <div className={time_cont}>
            <h1>{minutes.toString().padStart(2, "0")}</h1>
            <span className="font-normal">MIN</span>
          </div>
          <p className="text-white">:</p>
          <div className={time_cont}>
            <h1>{seconds.toString().padStart(2, "0")}</h1>
            <span className="font-normal">SEC</span>
          </div>
        </div>
      </div>

      {/*  */}
    </div>
  );
};

export default CountDown;

const time_cont =
  "flex items-center flex-col p-[5px] bg-white rounded text-black";
