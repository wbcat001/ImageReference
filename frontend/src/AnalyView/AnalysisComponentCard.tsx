import React from 'react';
import './AnalysisCard.css'; // デザイン用スタイルシート

type AnalysisCardProps = {
  title: string;
  children: React.ReactNode;
};

export const AnalysisCard: React.FC<AnalysisCardProps> = ({ title, children }) => {
  return (
    <div className="analysis-card">
      <h3>{title}</h3>
      <div className="analysis-card-content">{children}</div>
    </div>
  );
};
