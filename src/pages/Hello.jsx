import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { useAlert } from 'react-alert';

export default function Hello() {
  const { name } = useParams();

  const alert = useAlert();
  const navigate = useNavigate();

  useEffect(() => {
    if (!name.trim()) {
      alert.info('No name specified');
      navigate('/');
    }
  }, [alert, name, navigate]);

  return (
    <div className={`w-full bg-main-900 p-8 lg:px-56 ease-in-out duration-400`}>
      <div className="text-main-300 w-full text-3xl sm:text-4xl font-semibold font-gilroy">
        Hello <span className="text-main-200">{name}</span>
      </div>
    </div>
  );
}
