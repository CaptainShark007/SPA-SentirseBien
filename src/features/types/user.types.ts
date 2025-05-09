export interface Reservation {
  userId: number;
  reserveId: number;
  reserveDate: string;
  userFullName: string;
  serviceName: string;
  servicePrice: number;
  serviceStartDate: string;
  serviceStartTime: string;
  serviceEndTime: string;
  reserveStatusName: string;
}

export interface ReservationHistory {
  title: string;
  countReservation: number;
  totalPrice: number;
  reservations: Reservation[];
}
