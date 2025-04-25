export interface SpaData {
  name: string;
  description: string;
  category: string;
  durationMinutes: number;
  isActive: boolean;
  isGroupService: boolean;
}

export interface SpaInfoData extends Omit<SpaData, 'isGroupService'> {
  id?: number;
  type: string;
}
