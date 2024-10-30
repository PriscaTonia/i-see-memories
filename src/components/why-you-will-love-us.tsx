import { CircleCheck, PanelRight, Shield, Sparkles } from "lucide-react";
import React from "react";

const WhyYouWillLoveUs = () => {
  return (
    <section className="w-full font-hagrid">
      <div className="flex container p-6 flex-col items-center md:grid md:grid-cols-2 lg:grid-cols-4">
        {data?.map((item) => (
          <div key={item.id} className={cont_style}>
            {item.icon}

            <p className="text-black text-xl font-semibold text-center">
              {item.text}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhyYouWillLoveUs;

const cont_style =
  "flex flex-col justify-center items-center p-3 gap-2 col-span-1 max-w-[355px]";

const data = [
  {
    id: 1,
    icon: <CircleCheck />,
    text: "Effortless Design Tools for Pro-Quality Books",
  },
  {
    id: 2,
    icon: <Sparkles />,
    text: "Vibrant Prints That Bring Memories to Life",
  },
  {
    id: 4,
    icon: <PanelRight />,
    text: "Customizable Layouts for Every Adventure",
  },
  {
    id: 5,
    icon: <Shield />,
    text: "Durable Materials to Preserve Your Journeys",
  },
];
