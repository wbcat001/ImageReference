import { Card } from '@mui/material';
import React from 'react';
// import './AnalysisCard.css'; // 

type AnalysisCardProps = {

  children: React.ReactNode;
};

export const AnalysisCard: React.FC<AnalysisCardProps> = ({ children }) => {
  return (
    <Card className="analysis-card"
      sx={{
        width: {
          xs: "90%", // モバイル画面では幅90%
          sm: "70%", // タブレットでは幅70%
          md: "100%", // デスクトップでは幅50%
        },
        height: {
          xs: "10vh", // モバイル画面では高さ30% (ビューポートの高さ)
          sm: "20vh", // タブレットでは高さ40%
          md: "20vh", // デスクトップでは高さ50%
        },
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 2,
        position: "relative",
        boxShadow: 3,
        margin: "auto", // 中央寄せ
      }}>
 
      <div className="analysis-card-content">{children}</div>
    </Card>
  );
};

export default AnalysisCard;