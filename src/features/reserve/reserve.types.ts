export interface ReserveStatus {
  userId: number;
  scheduleId: number;
  status: string;
}

export interface ReserveData {
  id?: number;
  dateReserve: string;
  userFullName: string;
  serviceName: string;
  startDate: string;
  startTime: {
    hour: number;
    minute: number;
    second: number;
    nano: number;
  };
  endTime: {
    hour: number;
    minute: number;
    second: number;
    nano: number;
  };
  status: string;
}
