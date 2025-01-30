import moment from "moment";

export const MomentAdapter = {
  isValid: (date: any) => {
    if (!date) return false;

    const fecha = moment(date);
    if (fecha.isValid()) {
      return true;
    } else {
      return false;
    }
  },
};
