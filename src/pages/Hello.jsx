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

  return <div>Hello {name}!</div>;
}
