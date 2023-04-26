import { useCallback, useReducer } from 'react';
import { formReducer } from '../../reducers/formReducer';

export const useForm = (initialInputs, initialFormValidiy) => {
  const [formState, dispatch] = useReducer(formReducer,{
    inputs: initialInputs,
    isValid: initialFormValidiy
  });

  const inputHandler = useCallback((id, value, isValid) => {
    dispatch({ 
       type: "INPUT_CHANGE",
       inputId: id,
       value: value,
       isValid: isValid,
    });
  }, []);

  const setFormData = useCallback((inputData, formValidity) => {
    dispatch({
      type:"SET_DATA",
      inputs: inputData,
      formInValid: formValidity
    })
  },[])
  return [formState, inputHandler, setFormData];
};
