"use client";

import { useRouter, useSearchParams } from "next/navigation";
import Container from "./Container";
import { useSelector } from "react-redux";
import KeyboardArrowLeftRoundedIcon from "@mui/icons-material/KeyboardArrowLeftRounded";
import KeyboardArrowRightRoundedIcon from "@mui/icons-material/KeyboardArrowRightRounded";

const BottomTab = () => {
  const search = useSearchParams();
  const router = useRouter();
  const services = useSelector((state) => state.services);

  const onClickNext = () => {
    const step = search.get("step") ? parseInt(search.get("step")) + 1 : 1;
    if (step <= 2) {
      router.push(`/servicedetails?step=${step}`);
    }
  };

  const onClickBack = () => {
    const step = search.get("step") ? parseInt(search.get("step")) - 1 : 1;
    if (step >= 0) {
      router.push(`/servicedetails?step=${step}`);
    }
  };

  const canProcess = () => {
    const hasQuantityGreaterThanZero = services.some(
      (service) => service.quantity > 0
    );
    return hasQuantityGreaterThanZero;
  };

  return (
    <div className="w-full flex justify-center h-24 bg-white border-t border-gray-300 bottom-0 sticky">
      <Container>
        <div className="w-full flex justify-between items-center">
          <button
            className=" rounded-lg bg-white w-40 h-11 border-blue-600 text-blue-500 border flex justify-center items-center gap-2"
            onClick={onClickBack}
          >
            <KeyboardArrowLeftRoundedIcon className=" text-blue-500" />
            ย้อนกลับ
          </button>
          <button
            className=" rounded-lg bg-blue-600 text-white w-40 h-11 flex justify-center items-center gap-2 disabled:bg-gray-300"
            onClick={onClickNext}
            disabled={!canProcess()}
          >
            ดำเนินการต่อ
            <KeyboardArrowRightRoundedIcon className=" text-white" />
          </button>
        </div>
      </Container>
    </div>
  );
};

export default BottomTab;
