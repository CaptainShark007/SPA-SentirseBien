export interface SpaInfoData {
  id: number;
  price: number;
  type: string;
  name: string;
  description: string;
  category: string;
  durationMinutes: number;
  isActive: boolean;
  isGroupService: boolean;
}

export interface AvailableSlot {
  startTime: string;
  endTime: string;
  availableSpots: number;
}

export interface Available {
  date: string;
  serviceName: string;
  availableSlots: AvailableSlot[];
}

export interface Reserve {
  userId: number | null;
  serviceId: number | undefined;
  selectedTime: string;
}

export interface ReserveStatus extends Reserve {
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

export interface SpaData {
  name: string;
  description: string;
  category: string;
  durationMinutes: number;
  isActive: boolean;
  isGroupService: boolean;
}

export interface MethodPaymentData {
  method: string;
  reserveId: number;
}
