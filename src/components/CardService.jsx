"use client";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";

const CardService = () => {
  return (
    <div className="w-[349px] h-[369px] relative bg-white rounded-lg border border-gray-300">
      <img
        className="w-[349px] h-[200px] left-0 top-0 absolute rounded-t-lg"
        src="\assets\images\part-male-construction-worker.png"
      />
      <div className="left-[24px] top-[216px] absolute flex-col justify-start items-start gap-2 inline-flex">
        <div className="px-2.5 py-1 bg-indigo-50 rounded-lg justify-start items-start gap-2.5 inline-flex">
          <div className="text-blue-800 text-xs font-normal  leading-[18px]">
            บริการทั่วไป
          </div>
        </div>
        <div className="flex-col justify-start items-start gap-1 flex">
          <div className="text-zinc-800 text-xl font-bold leading-[30px]">
            ทำความสะอาดทั่วไป
          </div>
          <div className="justify-start items-center gap-2 inline-flex">
            <div className="w-4 h-4 relative">
              <img src="/assets/icons/sell_black.svg" alt="" />
            </div>
            <div className="text-gray-500 text-sm font-normal  leading-[21px]">
              ค่าบริการประมาณ 500.00 - 1,000.00 ฿
            </div>
          </div>
        </div>
      </div>
      <div className="py-0.5 left-[25px] top-[325px] absolute rounded-lg justify-start items-start gap-2.5 inline-flex">
        <button className="text-blue-600 text-base font-semibold  underline leading-normal">
          เลือกบริการ
        </button>
      </div>
    </div>
  );
};

export default CardService;
