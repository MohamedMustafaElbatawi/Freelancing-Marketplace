import { Clock3 } from "lucide-react";
import React from "react";

function AvailabilityCard() {
  return (
    <section className="bg-white rounded-2xl border border-gray-200 p-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center">
          <Clock3 size={19} className="text-green-600" />
        </div>

        <div>
          <h2 className="font-bold text-gray-900">Availability</h2>

          <p className="text-sm text-green-600">Available for work</p>
        </div>
      </div>

      <p className="text-sm text-gray-500 leading-6">
        Available to work up to 30 hours per week.
      </p>
    </section>
  );
}

export default AvailabilityCard;
