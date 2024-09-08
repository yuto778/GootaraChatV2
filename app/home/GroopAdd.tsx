"use client";

import { PlusIcon } from "lucide-react";
import React, { useState } from "react";

interface GroopAddProps {}

const GroopAdd: React.FC<GroopAddProps> = ({}) => {
  const [isGroopAddModal, setIsGroopAddModal] = useState<boolean>(false);

  return (
    <>
      <PlusIcon className="absolute top-3 right-5 cursor-pointer hover:scale-110" />
    </>
  );
};

export default GroopAdd;
