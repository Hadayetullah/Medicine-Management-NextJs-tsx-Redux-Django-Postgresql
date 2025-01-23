"use client";

import Image from "next/image";
import Link from "next/link";

export default function MedicineDetail() {
  return (
    <div className="max-w-[1400px] mx-auto mt-[70px]">
      <div className="flex justify-between px-2">
        <div className="w-full flex flex-col justify-start font-semibold">
          <div className="flex flex-row">
            <Image
              alt={`tablet icon`}
              title="tablet icon"
              src={`/assets/image/tablet.png`}
              width={21}
              height={21}
              style={{ objectFit: "contain" }}
            />

            <h1 className="text-[27px] text-[#435b66] ml-1.5">
              Monocast
              <small className="text-[15px] text-[#777] ml-1.5">Tablet</small>
            </h1>
          </div>

          <div className="flex flex-col my-2.5 text-[1.075rem]">
            <Link href="#" className="text-[#306976]">
              Montelukast Sodium
            </Link>

            <div className="text-[#828282]">10 mg</div>

            <Link href="#" className="text-[#828282]">
              Beximco Pharmaceuticals Ltd.
            </Link>
          </div>

          <div className="flex flex-col my-2.5 text-[1.075rem] text-[#34495e] text-[14px]">
            <div>
              <span className="text-[#3a5571]">Unit Price:</span>
              <span> ৳ 17.50 </span>
              <span className="text-[#828282] ml-[5px]">
                (2 x 10: ৳ 350.00)
              </span>
            </div>

            <div>
              <span className="text-[#3a5571]">Strip Price:</span>
              <span> ৳ 175.00 </span>
            </div>
          </div>

          <div className="flex flex-col my-2.5">
            <div className="text-[14px] text-[#3a5571] mb-[4px]">
              Also available as:
            </div>

            <div className="flex flex-wrap text-[13px]">
              <Link
                href="#"
                className="py-[2px] px-[6px] select-none bg-[inherit] text-[#0a8181] mr-[8px] mb-[8px] border border-[#0a8181] rounded-sm hover:bg-[#0a8181] hover:text-white transition-colors duration-300 touch-manipulation whitespace-nowrap"
                title="Monocast 4 mg/3.5 gm (Oral Granules)"
                style={{ boxShadow: "0 2px 5px 0 rgba(0,0,0,.2)" }}
              >
                4 mg/3.5 gm
                <span> (Granules)</span>
              </Link>

              <Link
                href="#"
                className="py-[2px] px-[6px] select-none bg-[inherit] text-[#0a8181] mr-[8px] mb-[8px] border border-[#0a8181] rounded-sm hover:bg-[#0a8181] hover:text-white transition-colors duration-300 touch-manipulation whitespace-nowrap"
                title="Monocast 5 mg (Chewable Tablet)"
                style={{ boxShadow: "0 2px 5px 0 rgba(0,0,0,.2)" }}
              >
                4 mg
                <span> (Chew. Tablet)</span>
              </Link>

              <Link
                href="#"
                className="py-[2px] px-[6px] select-none bg-[inherit] text-[#0a8181] mr-[8px] mb-[8px] border border-[#0a8181] rounded-sm hover:bg-[#0a8181] hover:text-white transition-colors duration-300 touch-manipulation whitespace-nowrap"
                title="Monocast 5 mg (Chewable Tablet)"
                style={{ boxShadow: "0 2px 5px 0 rgba(0,0,0,.2)" }}
              >
                5 mg
                <span> (Chew. Tablet)</span>
              </Link>
            </div>
          </div>

          <div className="flex flex-wrap my-2.5 text-[17px]">
            <Link
              href="#"
              className="mr-[10px] mb-[10px] py-[7px] px-[14px] text-[#0a8181] border border-[#0a8181] rounded-sm hover:bg-[#0a8181] hover:text-white transition-colors duration-300 touch-manipulation whitespace-nowrap"
              title="View all Brands of Montelukast Sodium"
              style={{
                boxShadow: "0 2px 5px 0 rgba(0,0,0,.26)",
              }}
            >
              Alternate Brands
            </Link>
          </div>
        </div>
        <div className="w-full flex justify-center">
          <Image
            alt={`Medicine Image`}
            title="Medicine Image"
            src={`/assets/image/monocast-10.jpg`}
            width={400}
            height={400}
            style={{ objectFit: "contain" }}
          />
        </div>
      </div>
    </div>
  );
}
