import React, {createContext, useContext, useState, ReactNode} from "react";
import {Dayjs} from "dayjs";

interface UserInputContextType {
  city: string;
  startDate?: Dayjs | null;
  endDate?: Dayjs | null;
  yesOrNoValue?: boolean;
  setCity: (city: string) => void;
  setStartDate: (date: Dayjs | null) => void;
  setEndDate: (date: Dayjs | null) => void;
  setYesOrNoValue: (value: boolean) => void;
}

const UserInputContext = createContext<UserInputContextType | undefined>(undefined);

function UserInputProvider({children}: { children: ReactNode }){
  const [city, setCity] = useState<string>("");
  const [startDate, setStartDate] = useState<Dayjs | null>(null);
  const [endDate, setEndDate] = useState<Dayjs | null>(null);
  const [yesOrNoValue, setYesOrNoValue] = React.useState(true);

  return (
    <UserInputContext.Provider value={{city, startDate, endDate, yesOrNoValue, setCity, setStartDate, setEndDate, setYesOrNoValue}}>
      {children}
    </UserInputContext.Provider>
  );
};

function useUserInput(){
  const context = useContext(UserInputContext);
  if (!context) {
    throw new Error("useUserInput must be used within a useUserInputProvider");
  }
  return context;
};

export { UserInputProvider, useUserInput };