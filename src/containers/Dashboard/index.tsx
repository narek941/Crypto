import React, { useState } from 'react';

import Modal from 'components/views/Modal';

const Dashboard: React.FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <Modal open={open} setOpen={setOpen} />
    </div>
  );
};

export default Dashboard;
