import React from 'react';
import { Card } from 'antd';

interface BillCardProps {
  amount: number;
  currency?: string;
  description?: string;
  date?: string;
  status?: 'paid' | 'pending' | 'overdue';
}

const BillCard: React.FC<BillCardProps> = ({
  amount,
  currency = '₹',
  description = 'Bill Payment',
  date = new Date().toLocaleDateString(),
  status = 'pending'
}) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'text-green-600';
      case 'overdue': return 'text-red-600';
      default: return 'text-yellow-600';
    }
  };

  return (
    <Card className="w-full max-w-md">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold">{description}</h3>
          <p className="text-sm text-gray-500">{date}</p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold">
            {currency}{amount.toLocaleString()}
          </p>
          <p className={`text-sm ${getStatusColor(status)}`}>
            {status.toUpperCase()}
          </p>
        </div>
      </div>
    </Card>
  );
};

export default BillCard;