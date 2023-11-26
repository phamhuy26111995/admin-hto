import React, { createContext, useState } from 'react';
import { Form } from 'antd';


export const FormContext = createContext();


const FormProvider = ({ children } : any) => {
  const [form] = Form.useForm();

  return (
    <FormContext.Provider value={form}>
      {children}
    </FormContext.Provider>
  );
};

export default FormProvider;