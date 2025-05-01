
import React from 'react';
import { Link } from 'react-router-dom';

const Logo: React.FC = () => {
  return (
    <Link to="/" className="flex items-center space-x-2">
      <img 
        src="/lovable-uploads/806d53db-5eca-4dde-8bc0-159233621293.png"
        alt="Muwakkil Logo" 
        className="h-8 w-auto"
      />
      <span className="font-bold text-xl">Muwakkil</span>
    </Link>
  );
};

export default Logo;
