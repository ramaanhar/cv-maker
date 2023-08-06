import moment from "moment";

const convertDate = (date: Date) => {
  return moment(date).format("MMMM YYYY").toString();
};

export default convertDate;
