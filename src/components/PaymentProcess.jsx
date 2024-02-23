import Container from "./Container";
import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import { useSearchParams } from "next/navigation";
import { styled } from "@mui/material/styles";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import CreditScoreOutlinedIcon from "@mui/icons-material/CreditScoreOutlined";
import StepConnector, {
  stepConnectorClasses,
} from "@mui/material/StepConnector";

const steps = ["รายการ", "กรอกข้อมูลบริการ", "ชำระเงิน"];

const ColorlibStepIconRoot = styled("div")(({ theme, ownerState }) => ({
  //   backgroundColor:
  //     theme.palette.mode === "dark" ? theme.palette.grey[700] : "#ccc",
  //   zIndex: 1,
  color: "#D8D8D8",
  width: 50,
  height: 50,
  display: "flex",
  borderRadius: "50%",
  marginLeft: "7px",
  border: "2px solid #D8D8D8",
  justifyContent: "center",
  alignItems: "center",
  ...(ownerState.active && {
    backgroundColor: "#FFFFFF",
    border: "2px solid #4C7FF4",
    color: "#4C7FF4",
  }),
  ...(ownerState.completed && {
    backgroundColor: "#4C7FF4",
    border: "2px solid #4C7FF4",
    color: "#FFFFFF",
  }),
}));

const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 22,
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundColor: "#4C7FF4",
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundColor: "#4C7FF4",
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 3,
    border: 0,
    backgroundColor:
      theme.palette.mode === "dark" ? theme.palette.grey[300] : "#eaeaf0",
    borderRadius: 1,
  },
}));

function ColorlibStepIcon(props) {
  const { active, completed, className } = props;

  const icons = {
    1: <ArticleOutlinedIcon />,
    2: <CreateOutlinedIcon />,
    3: <CreditScoreOutlinedIcon />,
  };

  return (
    <ColorlibStepIconRoot
      ownerState={{ completed, active }}
      className={className}
    >
      {icons[String(props.icon)]}
    </ColorlibStepIconRoot>
  );
}

const PaymentProcess = () => {
  const search = useSearchParams();
  const step = search.get("step") ? parseInt(search.get("step")) : 0;

  return (
    <div className="sticky">
      <Container>
        <div className="w-full bg-white pt-8 pb-5 rounded-lg border-gray-300 border">
          <Box sx={{ width: "100%" }}>
            <Stepper
              activeStep={step}
              alternativeLabel
              connector={<ColorlibConnector />}
              className=" gap-[8px]"
            >
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel StepIconComponent={ColorlibStepIcon}>
                    {label}
                  </StepLabel>
                </Step>
              ))}
            </Stepper>
          </Box>
        </div>
      </Container>
    </div>
  );
};

export default PaymentProcess;
